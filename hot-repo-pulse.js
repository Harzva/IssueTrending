const STORAGE_KEY = "issuetrending.hotrepopulse.watchlist.v1";
const DEFAULT_REPOS = [
  "openai/codex",
  "google-gemini/gemini-cli",
  "aider-ai/aider",
  "cline/cline",
  "RooCodeInc/Roo-Code",
  "opencode-ai/opencode",
];

const seedRepos = {
  "openai/codex": {
    description: "Lightweight coding agent that runs in your terminal",
    stars: 93358,
    forks: 13804,
    openIssues: 7725,
    language: "Rust",
    pushedAt: "2026-06-24T15:22:04Z",
  },
  "google-gemini/gemini-cli": {
    description: "Command line AI workflow for Gemini-assisted coding",
    stars: 24300,
    forks: 2100,
    openIssues: 1840,
    language: "TypeScript",
    pushedAt: "2026-06-23T22:40:00Z",
  },
  "aider-ai/aider": {
    description: "AI pair programming in your terminal",
    stars: 35300,
    forks: 3600,
    openIssues: 915,
    language: "Python",
    pushedAt: "2026-06-23T16:35:00Z",
  },
  "cline/cline": {
    description: "Autonomous coding agent inside VS Code",
    stars: 49800,
    forks: 6100,
    openIssues: 2410,
    language: "TypeScript",
    pushedAt: "2026-06-24T05:17:00Z",
  },
  "RooCodeInc/Roo-Code": {
    description: "Agentic coding workflow for editors",
    stars: 28600,
    forks: 4100,
    openIssues: 1760,
    language: "TypeScript",
    pushedAt: "2026-06-23T19:45:00Z",
  },
  "opencode-ai/opencode": {
    description: "Terminal-native coding agent toolkit",
    stars: 18700,
    forks: 1400,
    openIssues: 690,
    language: "TypeScript",
    pushedAt: "2026-06-22T11:30:00Z",
  },
};

const seedPullRequests = [
  {
    id: "openai/codex#1874",
    repo: "openai/codex",
    number: 1874,
    title: "Improve repo map selection for large Rust workspaces",
    url: "https://github.com/openai/codex/pulls",
    author: "contributor",
    comments: 74,
    reactions: 31,
    createdAt: daysAgo(2),
    updatedAt: hoursAgo(3),
    labels: ["context", "review-needed"],
    draft: false,
  },
  {
    id: "openai/codex#1819",
    repo: "openai/codex",
    number: 1819,
    title: "Add resumable tool-call transcript export",
    url: "https://github.com/openai/codex/pulls",
    author: "maintainer",
    comments: 58,
    reactions: 22,
    createdAt: daysAgo(9),
    updatedAt: hoursAgo(9),
    labels: ["telemetry", "blocked"],
    draft: false,
  },
  {
    id: "google-gemini/gemini-cli#992",
    repo: "google-gemini/gemini-cli",
    number: 992,
    title: "Stabilize auth refresh during long-running shell sessions",
    url: "https://github.com/google-gemini/gemini-cli/pulls",
    author: "contributor",
    comments: 45,
    reactions: 17,
    createdAt: daysAgo(6),
    updatedAt: hoursAgo(14),
    labels: ["auth", "needs-tests"],
    draft: false,
  },
  {
    id: "cline/cline#8842",
    repo: "cline/cline",
    number: 8842,
    title: "Refactor browser handoff recovery after selector drift",
    url: "https://github.com/cline/cline/pulls",
    author: "contributor",
    comments: 39,
    reactions: 12,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(3),
    labels: ["browser", "stale-review"],
    draft: false,
  },
  {
    id: "aider-ai/aider#5291",
    repo: "aider-ai/aider",
    number: 5291,
    title: "Reduce token churn when editing generated test files",
    url: "https://github.com/aider-ai/aider/pulls",
    author: "contributor",
    comments: 28,
    reactions: 19,
    createdAt: daysAgo(4),
    updatedAt: hoursAgo(5),
    labels: ["performance", "tests"],
    draft: false,
  },
  {
    id: "RooCodeInc/Roo-Code#4330",
    repo: "RooCodeInc/Roo-Code",
    number: 4330,
    title: "Surface MCP permission failures in the activity panel",
    url: "https://github.com/RooCodeInc/Roo-Code/pulls",
    author: "maintainer",
    comments: 33,
    reactions: 14,
    createdAt: daysAgo(8),
    updatedAt: hoursAgo(18),
    labels: ["mcp", "ux"],
    draft: false,
  },
];

const seedIssues = [
  {
    id: "openai/codex#2025",
    repo: "openai/codex",
    number: 2025,
    title: "Codex loses relevant files after switching tasks in a large monorepo",
    url: "https://github.com/openai/codex/issues",
    author: "user",
    comments: 143,
    reactions: 49,
    createdAt: daysAgo(3),
    updatedAt: hoursAgo(2),
    labels: ["context", "bug", "large-repo"],
  },
  {
    id: "openai/codex#1988",
    repo: "openai/codex",
    number: 1988,
    title: "Need clearer explanation when sandbox denies a command",
    url: "https://github.com/openai/codex/issues",
    author: "user",
    comments: 87,
    reactions: 38,
    createdAt: daysAgo(5),
    updatedAt: hoursAgo(6),
    labels: ["sandbox", "dx"],
  },
  {
    id: "google-gemini/gemini-cli#1104",
    repo: "google-gemini/gemini-cli",
    number: 1104,
    title: "Terminal session recovery fails after provider timeout",
    url: "https://github.com/google-gemini/gemini-cli/issues",
    author: "user",
    comments: 62,
    reactions: 25,
    createdAt: daysAgo(2),
    updatedAt: hoursAgo(11),
    labels: ["runtime", "timeout"],
  },
  {
    id: "cline/cline#9015",
    repo: "cline/cline",
    number: 9015,
    title: "Browser tool should capture a better failure report for dynamic DOM",
    url: "https://github.com/cline/cline/issues",
    author: "user",
    comments: 54,
    reactions: 18,
    createdAt: daysAgo(7),
    updatedAt: daysAgo(1),
    labels: ["browser", "observability"],
  },
  {
    id: "aider-ai/aider#5308",
    repo: "aider-ai/aider",
    number: 5308,
    title: "Hard to audit why the model chose one file instead of another",
    url: "https://github.com/aider-ai/aider/issues",
    author: "user",
    comments: 48,
    reactions: 29,
    createdAt: daysAgo(4),
    updatedAt: hoursAgo(5),
    labels: ["repo-map", "explainability"],
  },
  {
    id: "opencode-ai/opencode#712",
    repo: "opencode-ai/opencode",
    number: 712,
    title: "Provide a compact daily digest of merged PRs and breaking issues",
    url: "https://github.com/opencode-ai/opencode/issues",
    author: "user",
    comments: 31,
    reactions: 20,
    createdAt: daysAgo(6),
    updatedAt: hoursAgo(15),
    labels: ["digest", "workflow"],
  },
];

const state = {
  repos: loadRepos(),
  selectedRepo: "openai/codex",
  mode: "seed",
  window: "24h",
  repoMeta: structuredClone(seedRepos),
  pulls: [...seedPullRequests],
  issues: [...seedIssues],
  trendCandidates: [],
  memoryBias: null,
  snapshot: null,
  snapshotIndex: [],
  compareSnapshot: null,
  comparison: null,
  snapshotSignals: [],
  prSort: "score",
  issueSort: "score",
  lastUpdated: null,
  errors: [],
};

const selectors = {
  repoForm: document.querySelector("#repoForm"),
  repoInput: document.querySelector("#repoInput"),
  refreshButton: document.querySelector("#refreshButton"),
  seedButton: document.querySelector("#seedButton"),
  resetReposButton: document.querySelector("#resetReposButton"),
  windowButtons: document.querySelectorAll("[data-window]"),
  repoGrid: document.querySelector("#repoGrid"),
  prTable: document.querySelector("#prTable"),
  issueTable: document.querySelector("#issueTable"),
  prSort: document.querySelector("#prSort"),
  issueSort: document.querySelector("#issueSort"),
  signalList: document.querySelector("#signalList"),
  snapshotFacts: document.querySelector("#snapshotFacts"),
  historySelect: document.querySelector("#historySelect"),
  comparePanel: document.querySelector("#comparePanel"),
  candidateList: document.querySelector("#candidateList"),
  candidateStatus: document.querySelector("#candidateStatus"),
  activityList: document.querySelector("#activityList"),
  activityStatus: document.querySelector("#activityStatus"),
  copyBriefButton: document.querySelector("#copyBriefButton"),
  detailDialog: document.querySelector("#detailDialog"),
  detailContent: document.querySelector("#detailContent"),
  closeDialog: document.querySelector("#closeDialog"),
  modeLabel: document.querySelector("#modeLabel"),
  queryLabel: document.querySelector("#queryLabel"),
  updatedLabel: document.querySelector("#updatedLabel"),
  metricRepos: document.querySelector("#metricRepos"),
  metricPrs: document.querySelector("#metricPrs"),
  metricPrsMeta: document.querySelector("#metricPrsMeta"),
  metricIssues: document.querySelector("#metricIssues"),
  metricIssuesMeta: document.querySelector("#metricIssuesMeta"),
  metricHeat: document.querySelector("#metricHeat"),
  metricStale: document.querySelector("#metricStale"),
  metricSignals: document.querySelector("#metricSignals"),
};

function loadRepos() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(parsed) && parsed.length) {
      return parsed.filter(isValidRepoName).slice(0, 12);
    }
  } catch {
    return [...DEFAULT_REPOS];
  }
  return [...DEFAULT_REPOS];
}

function saveRepos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.repos));
  } catch {
    // Local storage is optional; this cockpit still works for the current session.
  }
}

function isValidRepoName(value) {
  return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(String(value || "").trim());
}

function normalizeRepo(value) {
  return String(value || "").trim().replace(/^https:\/\/github\.com\//, "").replace(/\/+$/, "");
}

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function hoursAgo(hours) {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

function ageInDays(dateString) {
  const created = new Date(dateString);
  if (Number.isNaN(created.getTime())) return 0;
  return Math.max(0, Math.round((Date.now() - created.getTime()) / 86400000));
}

function hoursSince(dateString) {
  const updated = new Date(dateString);
  if (Number.isNaN(updated.getTime())) return 0;
  return Math.max(0, Math.round((Date.now() - updated.getTime()) / 3600000));
}

function compactNumber(value) {
  const number = Number(value || 0);
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}m`;
  if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}k`;
  return String(number);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function githubUrl(repo) {
  return `https://github.com/${repo}`;
}

function repoSearchUrl(repo, type) {
  const q = encodeURIComponent(`is:${type} is:open sort:comments-desc`);
  return `${githubUrl(repo)}/${type === "pr" ? "pulls" : "issues"}?q=${q}`;
}

function itemScore(item, type) {
  if (Number.isFinite(Number(item.score))) return Number(item.score);
  const age = ageInDays(item.createdAt);
  const quietHours = hoursSince(item.updatedAt);
  const heat = item.comments * 1.8 + item.reactions * 2.4;
  const ageWeight = Math.min(age, type === "pr" ? 21 : 45) * (type === "pr" ? 2.2 : 1.5);
  const staleWeight = type === "pr" && quietHours > 48 ? 24 : quietHours > 72 ? 12 : 0;
  const labelWeight = (item.labels || []).some((label) => /bug|blocked|stale|regression|context|sandbox|auth/i.test(label)) ? 16 : 7;
  return Math.round(heat + ageWeight + staleWeight + labelWeight);
}

function itemSignals(item, type) {
  if (Array.isArray(item.signals) && item.signals.length) return item.signals.slice(0, 4);
  const labels = item.labels || [];
  const signals = [];
  const age = ageInDays(item.createdAt);
  const quiet = hoursSince(item.updatedAt);
  if (item.comments >= 50) signals.push("hot thread");
  if (item.reactions >= 25) signals.push("high reaction");
  if (type === "pr" && age >= 7) signals.push("review drag");
  if (quiet >= 48) signals.push("quiet");
  if (labels.some((label) => /bug|regression/i.test(label))) signals.push("bug pressure");
  if (labels.some((label) => /context|repo-map|sandbox|auth|browser|mcp/i.test(label))) signals.push("product signal");
  return signals.slice(0, 4);
}

function sortedItems(items, type, sortKey) {
  const rows = items.map((item) => ({ ...item, score: itemScore(item, type), signals: itemSignals(item, type) }));
  return rows.sort((a, b) => {
    if (sortKey === "comments") return b.comments - a.comments;
    if (sortKey === "age") return ageInDays(b.createdAt) - ageInDays(a.createdAt);
    if (sortKey === "repo") return a.repo.localeCompare(b.repo);
    return b.score - a.score;
  });
}

function currentPulls() {
  return sortedItems(state.pulls.filter((item) => state.repos.includes(item.repo)), "pr", state.prSort);
}

function currentIssues() {
  return sortedItems(state.issues.filter((item) => state.repos.includes(item.repo)), "issue", state.issueSort);
}

function allSignals() {
  const prs = currentPulls();
  const issues = currentIssues();
  const stalePrs = prs.filter((item) => item.signals.includes("review drag") || item.signals.includes("quiet"));
  const hotIssues = issues.filter((item) => item.comments >= 50 || item.reactions >= 25);
  const repoPressure = state.repos
    .map((repo) => ({
      repo,
      issues: issues.filter((item) => item.repo === repo).length,
      prs: prs.filter((item) => item.repo === repo).length,
      heat: [...issues, ...prs].filter((item) => item.repo === repo).reduce((sum, item) => sum + item.score, 0),
    }))
    .sort((a, b) => b.heat - a.heat);

  const signals = [];
  if (repoPressure[0]) {
    signals.push({
      kind: "repo pressure",
      title: `${repoPressure[0].repo} 是当前最高热仓库`,
      body: `${repoPressure[0].prs} 个 PR 样本、${repoPressure[0].issues} 个 issue 样本，综合热度 ${repoPressure[0].heat}。`,
    });
  }
  if (stalePrs[0]) {
    signals.push({
      kind: "review risk",
      title: `PR #${stalePrs[0].number} 需要优先复核`,
      body: `${stalePrs[0].repo} 已打开 ${ageInDays(stalePrs[0].createdAt)} 天，最近 ${hoursSince(stalePrs[0].updatedAt)} 小时无更新。`,
    });
  }
  if (hotIssues[0]) {
    signals.push({
      kind: "content angle",
      title: `可写选题：${hotIssues[0].title}`,
      body: `${hotIssues[0].comments} 条评论、${hotIssues[0].reactions} 个反应，可延展成开发者痛点分析。`,
    });
  }
  const contextItems = [...issues, ...prs].filter((item) => (item.labels || []).some((label) => /context|repo-map|sandbox|mcp|browser/i.test(label)));
  if (contextItems.length) {
    signals.push({
      kind: "product opportunity",
      title: "Coding agent 可观测性仍是重复痛点",
      body: `${contextItems.length} 条样本集中在上下文选择、工具权限、浏览器失败恢复和 MCP 调试。`,
    });
  }
  if (state.errors.length) {
    signals.push({
      kind: "fetch status",
      title: "部分 GitHub 请求失败",
      body: state.errors.slice(0, 2).join(" · "),
    });
  }
  return [...state.snapshotSignals, ...signals].slice(0, 6);
}

function render() {
  renderStatus();
  renderMetrics();
  renderRepos();
  renderTable("pr");
  renderTable("issue");
  renderSignals();
  renderSnapshot();
  renderHistoryCompare();
  renderCandidates();
  renderActivity();
}

function renderStatus() {
  selectors.modeLabel.textContent = state.mode === "snapshot" ? "local snapshot" : state.mode === "live" ? "live GitHub API" : "seed snapshot";
  selectors.queryLabel.textContent = `${state.repos.length} repos · open PRs + open issues`;
  selectors.updatedLabel.textContent = state.lastUpdated ? new Date(state.lastUpdated).toLocaleString("zh-CN") : "local seed";
  selectors.seedButton.textContent = state.mode === "seed" ? "Seed on" : "Seed";
  selectors.activityStatus.textContent = state.mode;
}

function renderMetrics() {
  const pulls = currentPulls();
  const issues = currentIssues();
  const heat = [...pulls, ...issues].reduce((sum, item) => sum + item.comments + item.reactions, 0);
  const stale = pulls.filter((item) => ageInDays(item.createdAt) >= 7 || hoursSince(item.updatedAt) >= 48).length;
  const signals = allSignals();
  selectors.metricRepos.textContent = state.repos.length;
  selectors.metricPrs.textContent = pulls.length;
  selectors.metricPrsMeta.textContent = state.mode === "snapshot" ? "snapshot samples" : state.mode === "live" ? "live samples" : "seed samples";
  selectors.metricIssues.textContent = issues.length;
  selectors.metricIssuesMeta.textContent = state.mode === "snapshot" ? "snapshot samples" : state.mode === "live" ? "live samples" : "seed samples";
  selectors.metricHeat.textContent = compactNumber(heat);
  selectors.metricStale.textContent = stale;
  selectors.metricSignals.textContent = signals.length;
}

function renderRepos() {
  selectors.repoGrid.innerHTML = state.repos
    .map((repo) => {
      const meta = state.repoMeta[repo] || {};
      const selected = repo === state.selectedRepo ? " selected" : "";
      const status = meta.error ? "error" : state.mode === "live" && meta.fetched ? "live" : "";
      return `
        <article class="repo-card${selected}">
          <div class="repo-card-top">
            <div>
              <h3>${escapeHtml(repo)}</h3>
              <p>${escapeHtml(meta.description || "Waiting for repository metadata.")}</p>
            </div>
            <span class="repo-status ${status}" title="${status || "seed"}"></span>
          </div>
          <div class="repo-card-metrics">
            <span>${compactNumber(meta.stars)} stars</span>
            <span>${compactNumber(meta.forks)} forks</span>
            <span>${compactNumber(meta.openIssues ?? meta.open_issues_count)} open</span>
          </div>
          ${repoDelta(meta)}
          <div class="repo-card-actions">
            <button type="button" data-select-repo="${escapeHtml(repo)}">Focus</button>
            <a href="${githubUrl(repo)}" target="_blank" rel="noreferrer">GitHub</a>
            <button class="remove-repo" type="button" data-remove-repo="${escapeHtml(repo)}" aria-label="Remove ${escapeHtml(repo)}">×</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTable(type) {
  const rows = type === "pr" ? currentPulls() : currentIssues();
  const target = type === "pr" ? selectors.prTable : selectors.issueTable;
  if (!rows.length) {
    target.innerHTML = `<tr><td colspan="7"><div class="empty-state">No ${type === "pr" ? "pull requests" : "issues"} available.</div></td></tr>`;
    return;
  }

  target.innerHTML = rows
    .slice(0, 24)
    .map((item, index) => {
      const labelsOrSignals = type === "pr" ? item.signals : item.labels || [];
      const pillClass = item.score >= 160 ? "red" : item.score >= 100 ? "amber" : "blue";
      return `
        <tr>
          <td><span class="rank">${index + 1}</span></td>
          <td>
            <button class="item-title" type="button" data-detail-type="${type}" data-detail-id="${escapeHtml(item.id)}">
              ${escapeHtml(item.title)}
            </button>
            <div class="item-meta">
              <span class="pill ${pillClass}">#${escapeHtml(item.number)}</span>
              <span class="pill">${escapeHtml(item.author || "unknown")}</span>
              ${item.triageLane ? `<span class="pill green">${escapeHtml(item.triageLane.replaceAll("_", " "))}</span>` : ""}
              ${item.draft ? `<span class="pill violet">draft</span>` : ""}
            </div>
          </td>
          <td><a class="pill blue" href="${githubUrl(item.repo)}" target="_blank" rel="noreferrer">${escapeHtml(item.repo)}</a></td>
          <td>${ageInDays(item.createdAt)}d</td>
          <td>${item.comments}</td>
          <td>
            <div class="item-meta">
              ${labelsOrSignals.slice(0, 3).map((label) => `<span class="label-pill">${escapeHtml(label)}</span>`).join("")}
            </div>
          </td>
          <td>
            <span class="score">${item.score}</span>
            ${scoreDelta(item)}
            <span class="score-bar" style="--value:${Math.min(100, Math.round(item.score / 2))}%"><i></i></span>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderSnapshot() {
  if (!state.snapshot) {
    selectors.snapshotFacts.innerHTML = `
      <div class="empty-state">Run <code>node scripts/snapshot.mjs</code> to create data/latest.json.</div>
    `;
    return;
  }
  const deltas = state.snapshot.deltas || {};
  const memory = state.memoryBias || {};
  const topLabels = (memory.top_labels || []).slice(0, 4);
  selectors.snapshotFacts.innerHTML = `
    <div class="snapshot-grid">
      <span><strong>${state.snapshot.events?.length || 0}</strong>events</span>
      <span><strong>${deltas.new_events ?? 0}</strong>new</span>
      <span><strong>${deltas.heated_events ?? 0}</strong>heated</span>
      <span><strong>${state.snapshot.errors?.length || 0}</strong>warnings</span>
    </div>
    <div class="memory-strip">
      ${topLabels.length ? topLabels.map((item) => `<span>${escapeHtml(item.key)} · ${item.useful}/${item.seen}</span>`).join("") : "<span>No memory bias yet</span>"}
    </div>
  `;
}

function renderHistoryCompare() {
  if (!state.snapshot) {
    selectors.historySelect.innerHTML = "";
    selectors.comparePanel.innerHTML = `<div class="empty-state">No local snapshot loaded.</div>`;
    return;
  }
  renderHistorySelect();
  if (!state.compareSnapshot || !state.comparison) {
    selectors.comparePanel.innerHTML = `
      <div class="empty-state">Run the snapshot script more than once to compare current and previous runs.</div>
    `;
    return;
  }
  const comparison = state.comparison;
  selectors.comparePanel.innerHTML = `
    <div class="snapshot-grid">
      <span><strong>${comparison.newItems.length}</strong>new</span>
      <span><strong>${comparison.heatedItems.length}</strong>heated</span>
      <span><strong>${comparison.cooledItems.length}</strong>cooled</span>
      <span><strong>${comparison.droppedItems.length}</strong>dropped</span>
    </div>
    <div class="compare-list">
      ${renderCompareGroup("New", comparison.newItems)}
      ${renderCompareGroup("Heating", comparison.heatedItems)}
      ${renderCompareGroup("Cooling", comparison.cooledItems)}
    </div>
  `;
}

function renderHistorySelect() {
  const options = state.snapshotIndex
    .filter((entry) => entry.generated_at !== state.snapshot.generated_at)
    .map(
      (entry) => `
        <option value="${escapeHtml(entry.file)}" ${state.compareSnapshot?.generated_at === entry.generated_at ? "selected" : ""}>
          ${escapeHtml(formatSnapshotLabel(entry))}
        </option>
      `,
    );
  selectors.historySelect.innerHTML = options.length ? options.join("") : `<option value="">No previous run</option>`;
  selectors.historySelect.disabled = !options.length;
}

function renderCompareGroup(label, items) {
  const rows = items
    .slice(0, 3)
    .map(
      (item) => `
      <a href="${escapeHtml(item.url || item.evidence_url || "#")}" target="_blank" rel="noreferrer">
        <strong>${escapeHtml(item.repo || "unknown")} #${escapeHtml(item.number || "")}</strong>
        <span>${escapeHtml(item.title || item.id)}${item.deltaText ? ` · ${escapeHtml(item.deltaText)}` : ""}</span>
      </a>
    `,
    )
    .join("");
  return `
    <section class="compare-group">
      <span class="signal-kicker">${escapeHtml(label)}</span>
      ${rows || "<p>No items.</p>"}
    </section>
  `;
}

function renderCandidates() {
  selectors.candidateStatus.textContent = state.trendCandidates.length ? `${state.trendCandidates.length}` : state.mode;
  selectors.candidateList.innerHTML = state.trendCandidates.length
    ? state.trendCandidates
        .slice(0, 8)
        .map(
          (candidate) => `
          <article class="candidate-item">
            <a href="${escapeHtml(candidate.url)}" target="_blank" rel="noreferrer">${escapeHtml(candidate.repo)}</a>
            <p>${escapeHtml(candidate.description || "No description")}</p>
            <div class="item-meta">
              <span class="pill blue">${compactNumber(candidate.stars)} stars</span>
              <span class="pill">${escapeHtml(candidate.language || "unknown")}</span>
            </div>
          </article>
        `,
        )
        .join("")
    : `<div class="empty-state">No trend candidates loaded.</div>`;
}

function renderSignals() {
  const signals = allSignals();
  selectors.signalList.innerHTML = signals.length
    ? signals
        .map(
          (signal) => `
          <article class="signal-item">
            <span class="signal-kicker">${escapeHtml(signal.kind)}</span>
            <strong>${escapeHtml(signal.title)}</strong>
            <p>${escapeHtml(signal.body)}</p>
          </article>
        `,
        )
        .join("")
    : `<div class="empty-state">No active signals.</div>`;
}

function renderActivity() {
  const items = [...currentPulls().slice(0, 4), ...currentIssues().slice(0, 4)]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 7);
  selectors.activityList.innerHTML = items
    .map(
      (item) => `
      <article class="activity-item">
        <span class="signal-kicker">${escapeHtml(item.repo)} · ${hoursSince(item.updatedAt)}h ago</span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${item.comments} comments · ${item.reactions} reactions · score ${itemScore(item, item.pullRequest ? "pr" : "issue")}</p>
      </article>
    `,
    )
    .join("");
}

function findItem(type, id) {
  const rows = type === "pr" ? currentPulls() : currentIssues();
  return rows.find((item) => item.id === id);
}

function openDetail(type, id) {
  const item = findItem(type, id);
  if (!item) return;
  const score = itemScore(item, type);
  const signals = itemSignals(item, type);
  selectors.detailContent.innerHTML = `
    <div class="detail-body">
      <span class="signal-kicker">${escapeHtml(type === "pr" ? "pull request" : "issue")} · ${escapeHtml(item.repo)} #${escapeHtml(item.number)}</span>
      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(item.body || "No body text loaded in this snapshot.")}</p>
      <div class="detail-grid">
        <span><strong>${score}</strong>score</span>
        <span><strong>${item.comments}</strong>comments</span>
        <span><strong>${item.reactions}</strong>reactions</span>
        <span><strong>${ageInDays(item.createdAt)}d</strong>age</span>
      </div>
      <div class="item-meta">
        ${(item.labels || []).map((label) => `<span class="label-pill">${escapeHtml(label)}</span>`).join("")}
        ${signals.map((signal) => `<span class="pill amber">${escapeHtml(signal)}</span>`).join("")}
      </div>
      <div class="detail-actions">
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open on GitHub</a>
        <a href="${repoSearchUrl(item.repo, type)}" target="_blank" rel="noreferrer">Repo queue</a>
        <button type="button" data-copy-item="${escapeHtml(item.id)}">Copy item brief</button>
      </div>
    </div>
  `;
  selectors.detailDialog.showModal();
}

function resetSeed() {
  state.mode = "seed";
  state.errors = [];
  state.repoMeta = structuredClone(seedRepos);
  state.pulls = [...seedPullRequests];
  state.issues = [...seedIssues];
  state.trendCandidates = [];
  state.memoryBias = null;
  state.snapshot = null;
  state.snapshotSignals = [];
  state.lastUpdated = null;
  render();
}

async function refreshLive() {
  selectors.refreshButton.disabled = true;
  selectors.refreshButton.classList.add("refreshing");
  state.errors = [];
  state.mode = "live";
  selectors.modeLabel.textContent = "fetching";
  selectors.updatedLabel.textContent = "requesting GitHub";

  const repoResults = await Promise.allSettled(state.repos.map((repo) => fetchRepoBundle(repo)));
  const repoMeta = {};
  const pulls = [];
  const issues = [];

  for (const result of repoResults) {
    if (result.status === "fulfilled") {
      const bundle = result.value;
      repoMeta[bundle.repo] = bundle.meta;
      pulls.push(...bundle.pulls);
      issues.push(...bundle.issues);
    } else {
      state.errors.push(result.reason.message || "GitHub request failed");
    }
  }

  if (Object.keys(repoMeta).length) {
    state.repoMeta = { ...state.repoMeta, ...repoMeta };
    state.pulls = pulls.length ? pulls : state.pulls;
    state.issues = issues.length ? issues : state.issues;
    state.lastUpdated = new Date().toISOString();
  } else {
    state.mode = "seed";
  }

  selectors.refreshButton.disabled = false;
  selectors.refreshButton.classList.remove("refreshing");
  render();
}

async function fetchRepoBundle(repo) {
  const [meta, pulls, issues] = await Promise.all([fetchRepoMeta(repo), fetchSearchItems(repo, "pr"), fetchSearchItems(repo, "issue")]);
  return { repo, meta, pulls, issues };
}

async function fetchRepoMeta(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) {
    throw new Error(`${repo} metadata ${response.status}`);
  }
  const payload = await response.json();
  return {
    description: payload.description || "",
    stars: payload.stargazers_count || 0,
    forks: payload.forks_count || 0,
    openIssues: payload.open_issues_count || 0,
    open_issues_count: payload.open_issues_count || 0,
    language: payload.language || "unknown",
    pushedAt: payload.pushed_at || null,
    fetched: true,
  };
}

async function fetchSearchItems(repo, type) {
  const query = encodeURIComponent(`repo:${repo} is:${type} is:open`);
  const response = await fetch(`https://api.github.com/search/issues?q=${query}&sort=comments&order=desc&per_page=12`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) {
    throw new Error(`${repo} ${type} search ${response.status}`);
  }
  const payload = await response.json();
  return (payload.items || []).map((item) => ({
    id: `${repo}#${item.number}`,
    repo,
    number: item.number,
    title: item.title,
    url: item.html_url,
    author: item.user?.login || "unknown",
    comments: item.comments || 0,
    reactions: reactionCount(item.reactions),
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    labels: (item.labels || []).map((label) => label.name || String(label)).slice(0, 5),
    body: item.body ? item.body.slice(0, 500) : "",
    draft: item.draft || false,
    pullRequest: type === "pr",
  }));
}

async function loadLatestSnapshot() {
  try {
    const response = await fetch("./data/latest.json", { cache: "no-store" });
    if (!response.ok) return;
    const snapshot = await response.json();
    applySnapshot(snapshot);
    await loadSnapshotHistory();
  } catch {
    // Snapshot files are optional; seed mode remains the offline fallback.
  }
}

async function loadSnapshotHistory() {
  try {
    const response = await fetch("./data/snapshots/index.json", { cache: "no-store" });
    if (!response.ok) return;
    const index = await response.json();
    state.snapshotIndex = index.snapshots || [];
    const previous = state.snapshotIndex.find((entry) => entry.generated_at !== state.snapshot?.generated_at);
    if (previous) await loadCompareSnapshot(previous.file);
  } catch {
    state.snapshotIndex = [];
  }
}

async function loadCompareSnapshot(file) {
  if (!file || !state.snapshot) return;
  try {
    const response = await fetch(`./data/${file}`, { cache: "no-store" });
    if (!response.ok) return;
    state.compareSnapshot = await response.json();
    state.comparison = compareSnapshots(state.snapshot, state.compareSnapshot);
  } catch {
    state.compareSnapshot = null;
    state.comparison = null;
  }
}

function compareSnapshots(current, previous) {
  const previousById = new Map((previous.events || []).map((item) => [item.id, item]));
  const currentById = new Map((current.events || []).map((item) => [item.id, item]));
  const newItems = [];
  const heatedItems = [];
  const cooledItems = [];
  for (const item of current.events || []) {
    const before = previousById.get(item.id);
    if (!before) {
      newItems.push({ ...item, deltaText: "new" });
      continue;
    }
    const scoreDelta = Number(item.score || 0) - Number(before.score || 0);
    const commentDelta = Number(item.comments || 0) - Number(before.comments || 0);
    const enriched = { ...item, deltaText: `${scoreDelta >= 0 ? "+" : ""}${scoreDelta} score, ${commentDelta >= 0 ? "+" : ""}${commentDelta} comments` };
    if (scoreDelta > 0 || commentDelta > 0) heatedItems.push(enriched);
    if (scoreDelta < 0 || commentDelta < 0) cooledItems.push(enriched);
  }
  const droppedItems = (previous.events || [])
    .filter((item) => !currentById.has(item.id))
    .map((item) => ({ ...item, deltaText: "not in latest" }));
  return {
    newItems: newItems.sort((a, b) => b.score - a.score),
    heatedItems: heatedItems.sort((a, b) => Math.abs(Number(b.score || 0)) - Math.abs(Number(a.score || 0))),
    cooledItems: cooledItems.sort((a, b) => Number(a.score || 0) - Number(b.score || 0)),
    droppedItems,
  };
}

function formatSnapshotLabel(entry) {
  const date = entry.generated_at ? new Date(entry.generated_at).toLocaleString("zh-CN") : "unknown";
  return `${date} · ${entry.events} events`;
}

function applySnapshot(snapshot) {
  const repoMeta = {};
  for (const [repo, meta] of Object.entries(snapshot.repo_metadata || {})) {
    repoMeta[repo] = {
      ...meta,
      openIssues: meta.open_issues_count,
      pushedAt: meta.pushed_at,
      fetched: true,
    };
  }
  state.snapshot = snapshot;
  state.mode = "snapshot";
  state.repos = Array.isArray(snapshot.repositories) && snapshot.repositories.length ? snapshot.repositories : state.repos;
  state.repoMeta = { ...state.repoMeta, ...repoMeta };
  state.pulls = (snapshot.pull_requests || []).map(snapshotEventToItem);
  state.issues = (snapshot.issues || []).map(snapshotEventToItem);
  state.trendCandidates = snapshot.trend_candidates || [];
  state.memoryBias = snapshot.memory_bias || null;
  state.snapshotSignals = (snapshot.action_signals || []).map((signal) => ({
    kind: signal.kind,
    title: signal.title,
    body: signal.body,
  }));
  state.errors = (snapshot.errors || []).map((item) => `${item.repo} ${item.error}`);
  state.lastUpdated = snapshot.generated_at || null;
}

function snapshotEventToItem(event) {
  return {
    id: event.id,
    repo: event.repo,
    number: event.number,
    title: event.title,
    url: event.url || event.evidence_url,
    author: event.actor,
    comments: event.comments || 0,
    reactions: event.reactions || 0,
    createdAt: event.created_at,
    updatedAt: event.updated_at,
    labels: event.labels || [],
    body: event.summary || "",
    draft: event.draft || false,
    pullRequest: event.kind === "pull_request",
    score: event.score,
    signals: event.risk_flags || [],
    triageLane: event.triage_lane,
    delta: event.delta || {},
  };
}

function scoreDelta(item) {
  const value = Number(item.delta?.score || 0);
  if (!value) return "";
  const sign = value > 0 ? "+" : "";
  const color = value > 0 ? "green" : "quiet";
  return `<span class="delta ${color}">${sign}${value}</span>`;
}

function repoDelta(meta) {
  const delta = meta.delta || {};
  const parts = [];
  if (Number(delta.stars)) parts.push(`${delta.stars > 0 ? "+" : ""}${delta.stars} stars`);
  if (Number(delta.open_workload)) parts.push(`${delta.open_workload > 0 ? "+" : ""}${delta.open_workload} open`);
  if (delta.first_seen) parts.push("new");
  return parts.length ? `<div class="repo-delta">${parts.map((part) => `<span>${escapeHtml(part)}</span>`).join("")}</div>` : "";
}

function reactionCount(reactions) {
  if (!reactions) return 0;
  return ["+1", "-1", "laugh", "hooray", "confused", "heart", "rocket", "eyes"].reduce((sum, key) => sum + (reactions[key] || 0), 0);
}

function addRepo(value) {
  const repo = normalizeRepo(value);
  if (!isValidRepoName(repo)) {
    selectors.repoInput.value = "";
    selectors.repoInput.placeholder = "owner/repo";
    return;
  }
  if (!state.repos.includes(repo)) {
    state.repos = [repo, ...state.repos].slice(0, 12);
  }
  state.selectedRepo = repo;
  saveRepos();
  selectors.repoInput.value = "";
  render();
}

function removeRepo(repo) {
  state.repos = state.repos.filter((item) => item !== repo);
  if (!state.repos.length) state.repos = [...DEFAULT_REPOS];
  if (!state.repos.includes(state.selectedRepo)) state.selectedRepo = state.repos[0];
  saveRepos();
  render();
}

function copyBrief() {
  const signals = allSignals();
  const lines = [
    "IssueTrending Hot Repo Pulse brief",
    `Mode: ${state.mode}`,
    `Repos: ${state.repos.join(", ")}`,
    "",
    ...signals.map((signal, index) => `${index + 1}. ${signal.title}\n${signal.body}`),
  ];
  navigator.clipboard?.writeText(lines.join("\n")).then(() => {
    selectors.copyBriefButton.textContent = "Copied";
    window.setTimeout(() => {
      selectors.copyBriefButton.textContent = "Copy brief";
    }, 1200);
  });
}

function copyItemBrief(id) {
  const item = [...currentPulls(), ...currentIssues()].find((row) => row.id === id);
  if (!item) return;
  const brief = [`${item.repo} #${item.number}`, item.title, `${item.comments} comments · ${item.reactions} reactions`, item.url].join("\n");
  navigator.clipboard?.writeText(brief);
}

function bindEvents() {
  selectors.repoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addRepo(selectors.repoInput.value);
  });

  selectors.refreshButton.addEventListener("click", refreshLive);
  selectors.seedButton.addEventListener("click", resetSeed);
  selectors.resetReposButton.addEventListener("click", () => {
    state.repos = [...DEFAULT_REPOS];
    state.selectedRepo = "openai/codex";
    saveRepos();
    render();
  });

  selectors.windowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.window = button.dataset.window;
      selectors.windowButtons.forEach((item) => item.classList.toggle("active", item === button));
      render();
    });
  });

  selectors.prSort.addEventListener("change", () => {
    state.prSort = selectors.prSort.value;
    renderTable("pr");
    renderSignals();
  });

  selectors.issueSort.addEventListener("change", () => {
    state.issueSort = selectors.issueSort.value;
    renderTable("issue");
    renderSignals();
  });

  selectors.historySelect.addEventListener("change", async () => {
    await loadCompareSnapshot(selectors.historySelect.value);
    renderHistoryCompare();
  });

  selectors.repoGrid.addEventListener("click", (event) => {
    const selectButton = event.target.closest("[data-select-repo]");
    const removeButton = event.target.closest("[data-remove-repo]");
    if (selectButton) {
      state.selectedRepo = selectButton.dataset.selectRepo;
      renderRepos();
    }
    if (removeButton) {
      removeRepo(removeButton.dataset.removeRepo);
    }
  });

  document.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-detail-id]");
    const copyButton = event.target.closest("[data-copy-item]");
    if (detailButton) {
      openDetail(detailButton.dataset.detailType, detailButton.dataset.detailId);
    }
    if (copyButton) {
      copyItemBrief(copyButton.dataset.copyItem);
    }
  });

  selectors.copyBriefButton.addEventListener("click", copyBrief);
  selectors.closeDialog.addEventListener("click", () => selectors.detailDialog.close());
}

async function initialize() {
  bindEvents();
  await loadLatestSnapshot();
  render();
}

initialize();
