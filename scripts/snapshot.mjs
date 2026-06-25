#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DATA_DIR = join(ROOT, "data");
const SNAPSHOT_DIR = join(DATA_DIR, "snapshots");
const CONFIG_PATH = join(ROOT, "hotrepopulse.config.json");
const API_ROOT = "https://api.github.com";

const DEFAULT_CONFIG = {
  watch_repositories: [
    "openai/codex",
    "google-gemini/gemini-cli",
    "aider-ai/aider",
    "cline/cline",
    "RooCodeInc/Roo-Code",
    "opencode-ai/opencode",
  ],
  trend: {
    query: "topic:ai",
    window_days: 14,
    min_stars: 100,
    limit: 12,
  },
  items_per_repo: 12,
  token_env: "GITHUB_TOKEN",
};

export function mergeConfig(fileConfig = {}, cliArgs = {}) {
  const merged = {
    watch_repositories: fileConfig.watch_repositories || DEFAULT_CONFIG.watch_repositories,
    trend: {
      ...DEFAULT_CONFIG.trend,
      ...(fileConfig.trend || {}),
    },
    items_per_repo: fileConfig.items_per_repo ?? DEFAULT_CONFIG.items_per_repo,
    token_env: fileConfig.token_env || DEFAULT_CONFIG.token_env,
  };

  const repos = parseList(cliArgs.repos) || merged.watch_repositories;
  return {
    repos,
    trendQuery: cliArgs["trend-query"] || merged.trend.query,
    trendWindowDays: Number(cliArgs["trend-window-days"] || merged.trend.window_days),
    trendMinStars: Number(cliArgs["trend-min-stars"] || merged.trend.min_stars),
    trendLimit: Number(cliArgs["trend-limit"] || merged.trend.limit),
    itemsPerRepo: Number(cliArgs["items-per-repo"] || merged.items_per_repo),
    tokenEnv: cliArgs["token-env"] || merged.token_env,
  };
}

export async function runSnapshot(argv = process.argv.slice(2), env = process.env) {
  const args = parseArgs(argv);
  const configPath = args.config ? join(ROOT, args.config) : CONFIG_PATH;
  const fileConfig = await readJson(configPath, DEFAULT_CONFIG);
  const config = mergeConfig(fileConfig, args);
  const token = env[config.tokenEnv] || "";
  const previousState = await readJson(join(DATA_DIR, "state.json"), defaultState());
  const generatedAt = new Date().toISOString();
  const headers = githubHeaders({ token });
  const errors = [];

  await mkdir(DATA_DIR, { recursive: true });
  await mkdir(SNAPSHOT_DIR, { recursive: true });

  const repoBundles = [];
  for (const repo of config.repos) {
    try {
      repoBundles.push(await fetchRepoBundle({ repo, config, headers, previousState }));
    } catch (error) {
      errors.push({ repo, error: error.message });
    }
  }

  let trendCandidates = [];
  try {
    trendCandidates = await fetchTrendCandidates({ config, headers, generatedAt });
  } catch (error) {
    errors.push({ repo: "trend-candidate-pool", error: error.message });
  }

  const latest = buildSnapshotFromBundles({
    generatedAt,
    config,
    previousState,
    repoBundles,
    trendCandidates,
    errors,
    tokenPresent: Boolean(token),
  });
  const nextState = buildStateFromSnapshot(latest);
  const snapshotName = snapshotFileName(generatedAt);
  const snapshotPath = `snapshots/${snapshotName}.json`;
  const existingIndex = await readJson(join(SNAPSHOT_DIR, "index.json"), { snapshots: [] });
  const snapshotSummaries = (existingIndex.snapshots || []).map((entry) => ({
    ...entry,
    file: entry.file || `snapshots/${snapshotFileName(entry.generated_at)}.json`,
  }));
  const index = buildSnapshotIndex(snapshotSummaries, latest, snapshotPath);

  await writeJson(join(DATA_DIR, "latest.json"), latest);
  await writeFile(join(DATA_DIR, "latest.md"), renderMarkdown(latest), "utf8");
  await writeFile(join(DATA_DIR, "daily-brief.md"), buildDailyBrief(latest), "utf8");
  await writeJson(join(DATA_DIR, "state.json"), nextState);
  await writeJson(join(SNAPSHOT_DIR, `${snapshotName}.json`), latest);
  await writeJson(join(SNAPSHOT_DIR, "index.json"), index);

  return { latest, index, errors };
}

export function buildSnapshotFromFixtures({ generatedAt, config, previousState, fixture }) {
  const repoBundles = config.repos.map((repo) => {
    const payload = fixture.repoPayloads[repo];
    if (!payload) throw new Error(`fixture missing repo ${repo}`);
    const meta = normalizeRepoMeta(repo, payload.meta);
    const issueEvents = (payload.issues || []).filter((item) => !item.pull_request).slice(0, config.itemsPerRepo).map((item) => normalizeIssueItem(repo, item));
    const pullIssueEvents = (payload.issues || [])
      .filter((item) => item.pull_request)
      .slice(0, config.itemsPerRepo)
      .map((item) => normalizeIssueItem(repo, item, "pull_request"));
    const pullEvents = (payload.pulls || []).slice(0, config.itemsPerRepo).map((item) => normalizePullItem(repo, item));
    return {
      repo,
      meta: withRepoDelta(meta, previousState),
      events: dedupeEvents([...pullIssueEvents, ...pullEvents, ...issueEvents])
        .map((event) => withDeltas(event, previousState))
        .sort((a, b) => b.score - a.score),
    };
  });

  const trendCandidates = (fixture.trendCandidates || []).slice(0, config.trendLimit).map((item) => normalizeTrendCandidate(item, config, generatedAt));
  return buildSnapshotFromBundles({
    generatedAt,
    config,
    previousState,
    repoBundles,
    trendCandidates,
    errors: [],
    tokenPresent: false,
  });
}

export function buildSnapshotIndex(previousSnapshots = [], latest, file = "latest.json") {
  const summaries = [
    snapshotSummary(latest, file),
    ...previousSnapshots
      .filter((entry) => entry.generated_at !== latest.generated_at)
      .map((entry) => normalizeSnapshotIndexEntry(entry)),
  ]
    .sort((a, b) => new Date(b.generated_at) - new Date(a.generated_at))
    .slice(0, 90);
  return {
    schema_version: 1,
    latest_generated_at: latest.generated_at,
    snapshots: summaries,
  };
}

export function buildDailyBrief(snapshot) {
  const hotPrs = (snapshot.pull_requests || []).slice(0, 5);
  const hotIssues = (snapshot.issues || []).slice(0, 5);
  const candidates = (snapshot.trend_candidates || []).slice(0, 5);
  const contentItems = (snapshot.events || [])
    .filter((event) => event.triage_lane === "content_opportunity")
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  const productItems = (snapshot.events || [])
    .filter((event) => (event.risk_flags || []).includes("product-signal"))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const riskItems = [
    ...(snapshot.events || []).filter((event) => event.triage_lane === "needs_validation").sort((a, b) => b.score - a.score).slice(0, 5),
    ...(snapshot.errors || []).map((error) => ({
      title: `${error.repo}: ${error.error}`,
      url: "",
      score: 0,
      triage_lane: "snapshot_warning",
    })),
  ].slice(0, 8);

  return [
    "# IssueTrending Hot Repo Pulse Daily Brief",
    "",
    `Generated: ${snapshot.generated_at}`,
    `Source: ${snapshot.source.watch_repositories.length} watch repos, ${snapshot.trend_candidates.length} trend candidates`,
    "",
    "## 今日高热 PR",
    "",
    ...renderBriefList(hotPrs),
    "",
    "## 今日高热 issue",
    "",
    ...renderBriefList(hotIssues),
    "",
    "## 新增候选仓库",
    "",
    ...candidates.map((repo) => `- [${repo.repo}](${repo.url}) - ${repo.stars} stars, ${repo.language}. ${repo.description || ""}`),
    "",
    "## 可写内容选题",
    "",
    ...renderBriefList(contentItems),
    "",
    "## 产品机会",
    "",
    ...renderBriefList(productItems.length ? productItems : contentItems.slice(0, 3)),
    "",
    "## 需要继续观察的风险",
    "",
    ...renderBriefList(riskItems),
    "",
  ].join("\n");
}

function buildSnapshotFromBundles({ generatedAt, config, previousState, repoBundles, trendCandidates, errors, tokenPresent }) {
  const repoMetadata = Object.fromEntries(repoBundles.map((bundle) => [bundle.repo, bundle.meta]));
  const events = repoBundles.flatMap((bundle) => bundle.events);
  const pullRequests = events.filter((event) => event.kind === "pull_request").sort((a, b) => b.score - a.score);
  const issues = events.filter((event) => event.kind === "issue").sort((a, b) => b.score - a.score);
  const memoryBias = updateMemoryBias(previousState.memory_bias || emptyMemoryBias(), events, trendCandidates, generatedAt);
  const deltas = buildTopLevelDeltas(repoMetadata, events, previousState);
  const actionSignals = buildActionSignals({ pullRequests, issues, repoMetadata, memoryBias, errors });
  const sinceDate = isoDateDaysAgo(config.trendWindowDays, generatedAt);

  return {
    schema_version: 1,
    generated_at: generatedAt,
    source: {
      kind: "github_rest_snapshot",
      watch_repositories: config.repos,
      trend_candidate_query: `${config.trendQuery} created:>=${sinceDate} stars:>=${config.trendMinStars} fork:false`,
      trend_sort: "stars",
      trend_order: "desc",
      trend_limit: config.trendLimit,
      items_per_repo: config.itemsPerRepo,
      token_env: config.tokenEnv,
      token_present: tokenPresent,
    },
    repositories: config.repos,
    repo_metadata: repoMetadata,
    trend_candidates: trendCandidates,
    events,
    pull_requests: pullRequests,
    issues,
    action_signals: actionSignals,
    memory_bias: memoryBias,
    deltas,
    errors,
  };
}

async function fetchRepoBundle({ repo, config, headers, previousState }) {
  const [metaPayload, issueRows, pullRows] = await Promise.all([
    fetchJson(`${API_ROOT}/repos/${repo}`, { headers }),
    fetchJson(`${API_ROOT}/repos/${repo}/issues?state=open&sort=comments&direction=desc&per_page=${Math.max(30, config.itemsPerRepo * 4)}`, { headers }),
    fetchJson(`${API_ROOT}/repos/${repo}/pulls?state=open&sort=popularity&direction=desc&per_page=${config.itemsPerRepo}`, { headers }),
  ]);
  const meta = normalizeRepoMeta(repo, metaPayload);
  const issueEvents = issueRows.filter((item) => !item.pull_request).slice(0, config.itemsPerRepo).map((item) => normalizeIssueItem(repo, item));
  const pullIssueEvents = issueRows
    .filter((item) => item.pull_request)
    .slice(0, config.itemsPerRepo)
    .map((item) => normalizeIssueItem(repo, item, "pull_request"));
  const pullEvents = pullRows.slice(0, config.itemsPerRepo).map((item) => normalizePullItem(repo, item));
  return {
    repo,
    meta: withRepoDelta(meta, previousState),
    events: dedupeEvents([...pullIssueEvents, ...pullEvents, ...issueEvents])
      .map((event) => withDeltas(event, previousState))
      .sort((a, b) => b.score - a.score),
  };
}

async function fetchTrendCandidates({ config, headers, generatedAt }) {
  const sinceDate = isoDateDaysAgo(config.trendWindowDays, generatedAt);
  const query = encodeURIComponent(`${config.trendQuery} created:>=${sinceDate} stars:>=${config.trendMinStars} fork:false`);
  const payload = await fetchJson(`${API_ROOT}/search/repositories?q=${query}&sort=stars&order=desc&per_page=${config.trendLimit}`, { headers });
  return (payload.items || []).map((item) => normalizeTrendCandidate(item, config, generatedAt));
}

function normalizeRepoMeta(repo, payload) {
  return {
    repo,
    description: payload.description || "",
    stars: payload.stargazers_count || 0,
    forks: payload.forks_count || 0,
    open_issues_count: payload.open_issues_count || 0,
    language: payload.language || "unknown",
    pushed_at: payload.pushed_at || "",
    topics: payload.topics || [],
    url: payload.html_url || `https://github.com/${repo}`,
    fetched: true,
  };
}

function normalizeTrendCandidate(item, config, generatedAt) {
  return {
    repo: item.full_name,
    url: item.html_url,
    description: item.description || "",
    stars: item.stargazers_count || 0,
    forks: item.forks_count || 0,
    open_issues_count: item.open_issues_count || 0,
    language: item.language || "unknown",
    created_at: item.created_at || "",
    pushed_at: item.pushed_at || "",
    topics: item.topics || [],
    reason: `Matched ${config.trendQuery}, created since ${isoDateDaysAgo(config.trendWindowDays, generatedAt)}, stars >= ${config.trendMinStars}`,
  };
}

function normalizeIssueItem(repo, item, forcedKind = "issue") {
  const labels = (item.labels || []).map((label) => label.name || String(label)).filter(Boolean);
  const event = {
    id: `${repo}#${item.number}`,
    repo,
    kind: forcedKind,
    number: item.number,
    title: item.title || "",
    url: item.html_url || `https://github.com/${repo}/issues/${item.number}`,
    actor: item.user?.login || "unknown",
    created_at: item.created_at || "",
    updated_at: item.updated_at || "",
    labels,
    summary: summarize(item.body || item.title || ""),
    comments: item.comments || 0,
    reactions: reactionCount(item.reactions),
    state: item.state || "open",
  };
  return finalizeEvent(event);
}

function normalizePullItem(repo, item) {
  const event = {
    id: `${repo}#${item.number}`,
    repo,
    kind: "pull_request",
    number: item.number,
    title: item.title || "",
    url: item.html_url || `https://github.com/${repo}/pull/${item.number}`,
    actor: item.user?.login || "unknown",
    created_at: item.created_at || "",
    updated_at: item.updated_at || "",
    labels: (item.labels || []).map((label) => label.name || String(label)).filter(Boolean),
    summary: summarize(item.body || item.title || ""),
    comments: Number(item.comments || 0) + Number(item.review_comments || 0),
    reactions: reactionCount(item.reactions),
    state: item.state || "open",
    draft: Boolean(item.draft),
  };
  return finalizeEvent(event);
}

function finalizeEvent(event) {
  const riskFlags = riskFlagsFor(event);
  const score = scoreEvent(event, riskFlags);
  const triageLane = triageLaneFor(event, riskFlags, score);
  return {
    ...event,
    relevance_reason: relevanceReasonFor(event, riskFlags, score),
    risk_flags: riskFlags,
    score,
    triage_lane: triageLane,
    evidence_url: event.url,
    age_days: ageInDays(event.created_at),
  };
}

function scoreEvent(event, riskFlags) {
  const age = Math.min(ageInDays(event.created_at), event.kind === "pull_request" ? 45 : 60);
  const labelBoost = event.labels.length ? Math.min(event.labels.length * 5, 24) : 0;
  const riskBoost = riskFlags.length * 16;
  const kindBoost = event.kind === "pull_request" ? 12 : 18;
  return Math.round(event.comments * 2.1 + event.reactions * 2.8 + age * 1.2 + labelBoost + riskBoost + kindBoost);
}

function riskFlagsFor(event) {
  const text = `${event.title} ${(event.labels || []).join(" ")} ${event.summary}`.toLowerCase();
  const flags = [];
  if (/\bbug|regression|crash|broken|fails?\b/.test(text)) flags.push("validation-risk");
  if (/security|secret|credential|token|privacy|leak/.test(text)) flags.push("security-review");
  if (/sandbox|auth|permission|provider|runtime|startup/.test(text)) flags.push("runtime-risk");
  if (/context|repo-map|mcp|browser|tool-call|tool call/.test(text)) flags.push("product-signal");
  if (event.kind === "pull_request" && ageInDays(event.created_at) >= 7) flags.push("review-drag");
  return [...new Set(flags)];
}

function triageLaneFor(event, riskFlags, score) {
  const text = `${event.title} ${(event.labels || []).join(" ")}`.toLowerCase();
  if (/duplicate|invalid|wontfix|won't fix|spam/.test(text)) return "ignore_no_action";
  if (riskFlags.includes("validation-risk") || riskFlags.includes("runtime-risk")) return "needs_validation";
  if (/question|needs-info|clarify|discussion/.test(text)) return "needs_follow_up";
  if (score >= 90 || riskFlags.includes("product-signal")) return "content_opportunity";
  return "needs_follow_up";
}

function relevanceReasonFor(event, riskFlags, score) {
  const reasons = [];
  if (event.comments >= 25) reasons.push(`${event.comments} comments`);
  if (event.reactions >= 10) reasons.push(`${event.reactions} reactions`);
  if (riskFlags.length) reasons.push(riskFlags.join(", "));
  if (score >= 120) reasons.push("high composite score");
  return reasons.length ? reasons.join("; ") : "open item from tracked repository";
}

function withDeltas(event, state) {
  const previous = state.items?.[event.id] || {};
  return {
    ...event,
    delta: {
      score: event.score - Number(previous.score || 0),
      comments: event.comments - Number(previous.comments || 0),
      reactions: event.reactions - Number(previous.reactions || 0),
      first_seen: !previous.last_seen_at,
    },
  };
}

function withRepoDelta(meta, state) {
  const previous = state.repositories?.[meta.repo] || {};
  return {
    ...meta,
    delta: {
      stars: meta.stars - Number(previous.stars || 0),
      forks: meta.forks - Number(previous.forks || 0),
      open_workload: meta.open_issues_count - Number(previous.open_workload || 0),
      first_seen: !previous.last_seen_at,
    },
  };
}

function buildTopLevelDeltas(repoMetadata, events, state) {
  const previousRepoCount = Object.keys(state.repositories || {}).length;
  const previousItemCount = Object.keys(state.items || {}).length;
  return {
    repositories: Object.keys(repoMetadata).length - previousRepoCount,
    events: events.length - previousItemCount,
    new_events: events.filter((event) => event.delta.first_seen).length,
    heated_events: events.filter((event) => event.delta.score > 0 && !event.delta.first_seen).length,
    cooled_events: events.filter((event) => event.delta.score < 0 && !event.delta.first_seen).length,
  };
}

function updateMemoryBias(memory, events, trendCandidates, generatedAt) {
  const next = structuredClone(memory || emptyMemoryBias());
  next.schema_version = 1;
  next.repositories ||= {};
  next.topics ||= {};
  next.labels ||= {};
  next.last_updated_at = generatedAt;
  for (const event of events) {
    bump(next.repositories, event.repo, event.score >= 90, generatedAt);
    for (const label of event.labels || []) bump(next.labels, label, event.score >= 90, generatedAt);
    for (const flag of event.risk_flags || []) bump(next.topics, flag, event.score >= 90, generatedAt);
  }
  for (const candidate of trendCandidates) {
    bump(next.repositories, candidate.repo, candidate.stars >= 500, generatedAt);
    for (const topic of candidate.topics || []) bump(next.topics, topic, candidate.stars >= 500, generatedAt);
  }
  next.top_repositories = topBias(next.repositories, 8);
  next.top_topics = topBias(next.topics, 10);
  next.top_labels = topBias(next.labels, 10);
  return next;
}

function bump(bucket, key, useful, generatedAt) {
  if (!key) return;
  bucket[key] ||= { seen: 0, useful: 0, weight: 0, last_seen_at: "" };
  bucket[key].seen += 1;
  if (useful) bucket[key].useful += 1;
  bucket[key].weight = Number((bucket[key].seen * 0.35 + bucket[key].useful * 1.4).toFixed(2));
  bucket[key].last_seen_at = generatedAt;
}

function topBias(bucket, limit) {
  return Object.entries(bucket)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => b.weight - a.weight || b.useful - a.useful || a.key.localeCompare(b.key))
    .slice(0, limit);
}

function buildActionSignals({ pullRequests, issues, repoMetadata, memoryBias, errors }) {
  const signals = [];
  const hotIssue = issues[0];
  const hotPr = pullRequests[0];
  const hotRepo = Object.values(repoMetadata).sort((a, b) => b.open_issues_count - a.open_issues_count)[0];
  if (hotRepo) {
    signals.push({
      kind: "repo_pressure",
      title: `${hotRepo.repo} has the largest open workload`,
      body: `${hotRepo.open_issues_count} open PR/issue workload, ${hotRepo.stars} stars, ${hotRepo.forks} forks.`,
      evidence_url: hotRepo.url,
    });
  }
  if (hotPr) {
    signals.push({
      kind: "pr_review",
      title: `Review radar: ${hotPr.repo} #${hotPr.number}`,
      body: `${hotPr.score} score, ${hotPr.comments} comments, lane ${hotPr.triage_lane}.`,
      evidence_url: hotPr.url,
    });
  }
  if (hotIssue) {
    signals.push({
      kind: "content_opportunity",
      title: `Issue angle: ${hotIssue.title}`,
      body: `${hotIssue.repo} #${hotIssue.number} has ${hotIssue.comments} comments and ${hotIssue.risk_flags.join(", ") || "general"} signal.`,
      evidence_url: hotIssue.url,
    });
  }
  if (memoryBias.top_labels?.[0]) {
    signals.push({
      kind: "memory_bias",
      title: `${memoryBias.top_labels[0].key} is the strongest recurring label`,
      body: `Seen ${memoryBias.top_labels[0].seen} times, useful ${memoryBias.top_labels[0].useful} times.`,
      evidence_url: "",
    });
  }
  if (errors.length) {
    signals.push({
      kind: "snapshot_warning",
      title: "Snapshot completed with partial GitHub failures",
      body: errors.slice(0, 2).map((item) => `${item.repo}: ${item.error}`).join("; "),
      evidence_url: "",
    });
  }
  return signals;
}

function buildStateFromSnapshot(snapshot) {
  return {
    schema_version: 1,
    last_snapshot_at: snapshot.generated_at,
    repositories: Object.fromEntries(
      Object.entries(snapshot.repo_metadata).map(([repo, meta]) => [
        repo,
        {
          stars: meta.stars,
          forks: meta.forks,
          open_workload: meta.open_issues_count,
          last_seen_at: snapshot.generated_at,
        },
      ]),
    ),
    items: Object.fromEntries(
      snapshot.events.map((event) => [
        event.id,
        {
          repo: event.repo,
          kind: event.kind,
          number: event.number,
          score: event.score,
          comments: event.comments,
          reactions: event.reactions,
          triage_lane: event.triage_lane,
          last_seen_at: snapshot.generated_at,
        },
      ]),
    ),
    memory_bias: snapshot.memory_bias,
  };
}

function snapshotSummary(snapshot, file) {
  return {
    generated_at: snapshot.generated_at,
    file,
    repositories: snapshot.repositories?.length || 0,
    events: snapshot.events?.length || 0,
    pull_requests: snapshot.pull_requests?.length || 0,
    issues: snapshot.issues?.length || 0,
    trend_candidates: snapshot.trend_candidates?.length || 0,
    new_events: snapshot.deltas?.new_events || 0,
    heated_events: snapshot.deltas?.heated_events || 0,
    cooled_events: snapshot.deltas?.cooled_events || 0,
  };
}

function normalizeSnapshotIndexEntry(entry) {
  if (Array.isArray(entry.events) || Array.isArray(entry.pull_requests) || Array.isArray(entry.issues)) {
    return snapshotSummary(entry, entry.file || `snapshots/${snapshotFileName(entry.generated_at)}.json`);
  }
  return {
    generated_at: entry.generated_at,
    file: entry.file || `snapshots/${snapshotFileName(entry.generated_at)}.json`,
    repositories: Number(entry.repositories || 0),
    events: Number(entry.events || 0),
    pull_requests: Number(entry.pull_requests || 0),
    issues: Number(entry.issues || 0),
    trend_candidates: Number(entry.trend_candidates || 0),
    new_events: Number(entry.new_events || 0),
    heated_events: Number(entry.heated_events || 0),
    cooled_events: Number(entry.cooled_events || 0),
  };
}

function renderMarkdown(snapshot) {
  const lines = [
    "# IssueTrending Hot Repo Pulse Snapshot",
    "",
    `Generated: ${snapshot.generated_at}`,
    `Repositories: ${snapshot.repositories.join(", ")}`,
    `Events: ${snapshot.events.length} (${snapshot.pull_requests.length} PRs, ${snapshot.issues.length} issues)`,
    "",
    "## Action Signals",
    "",
    ...snapshot.action_signals.map((signal) => `- **${signal.kind}** ${signal.title}${signal.evidence_url ? ` ([source](${signal.evidence_url}))` : ""}\n  ${signal.body}`),
    "",
    "## Top Pull Requests",
    "",
    ...snapshot.pull_requests.slice(0, 10).map((event) => `- [${event.repo} #${event.number}](${event.url}) ${event.title} - score ${event.score}, lane ${event.triage_lane}`),
    "",
    "## Top Issues",
    "",
    ...snapshot.issues.slice(0, 10).map((event) => `- [${event.repo} #${event.number}](${event.url}) ${event.title} - score ${event.score}, lane ${event.triage_lane}`),
    "",
    "## Trend Candidates",
    "",
    ...snapshot.trend_candidates.slice(0, 10).map((repo) => `- [${repo.repo}](${repo.url}) - ${repo.stars} stars, ${repo.language}`),
    "",
  ];
  if (snapshot.errors.length) {
    lines.push("## Warnings", "", ...snapshot.errors.map((item) => `- ${item.repo}: ${item.error}`), "");
  }
  return `${lines.join("\n")}\n`;
}

function renderBriefList(items) {
  if (!items.length) return ["- No matching items."];
  return items.map((item) => {
    if (item.url) return `- [${item.repo ? `${item.repo} #${item.number}` : item.title}](${item.url}) ${item.title} - score ${item.score}, lane ${item.triage_lane}`;
    return `- ${item.title}`;
  });
}

function dedupeEvents(events) {
  const byId = new Map();
  for (const event of events) {
    if (!byId.has(event.id) || byId.get(event.id).score < event.score) byId.set(event.id, event);
  }
  return [...byId.values()];
}

async function fetchJson(url, { headers }) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const reset = response.headers.get("x-ratelimit-reset");
    const rate = remaining === "0" && reset ? ` rate-limit reset ${new Date(Number(reset) * 1000).toISOString()}` : "";
    throw new Error(`GitHub ${response.status}${rate}`);
  }
  return await response.json();
}

function githubHeaders({ token }) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "IssueTrending Hot Repo Pulse snapshot",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function defaultState() {
  return {
    schema_version: 1,
    last_snapshot_at: "",
    repositories: {},
    items: {},
    memory_bias: emptyMemoryBias(),
  };
}

function emptyMemoryBias() {
  return {
    schema_version: 1,
    last_updated_at: "",
    repositories: {},
    topics: {},
    labels: {},
    top_repositories: [],
    top_topics: [],
    top_labels: [],
  };
}

async function readJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(path, payload) {
  await writeFile(path, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function reactionCount(reactions) {
  if (!reactions) return 0;
  return ["+1", "-1", "laugh", "hooray", "confused", "heart", "rocket", "eyes"].reduce((sum, key) => sum + Number(reactions[key] || 0), 0);
}

function summarize(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 320);
}

function ageInDays(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 0;
  return Math.max(0, Math.round((Date.now() - date.getTime()) / 86400000));
}

function isoDateDaysAgo(days, nowValue = new Date().toISOString()) {
  const date = new Date(nowValue);
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function snapshotFileName(generatedAt) {
  return generatedAt.replaceAll(":", "").replaceAll(".", "-");
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = "true";
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function parseList(value) {
  if (!value) return null;
  const items = String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : null;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { latest, errors } = await runSnapshot();
  console.log(`IssueTrending Hot Repo Pulse snapshot written: ${latest.events.length} events, ${latest.trend_candidates.length} trend candidates`);
  if (errors.length) {
    console.log(`Partial snapshot warnings: ${errors.map((item) => `${item.repo} ${item.error}`).join("; ")}`);
  }
}
