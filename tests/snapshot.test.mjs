import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  buildDailyBrief,
  buildSnapshotFromFixtures,
  buildSnapshotIndex,
  mergeConfig,
} from "../scripts/snapshot.mjs";

const fixture = JSON.parse(await readFile(new URL("./fixtures/github-snapshot-fixture.json", import.meta.url), "utf8"));

test("mergeConfig uses file defaults and lets CLI override narrow values", () => {
  const config = mergeConfig(
    {
      watch_repositories: ["openai/codex"],
      trend: {
        query: "topic:ai",
        window_days: 14,
        min_stars: 100,
        limit: 8
      },
      items_per_repo: 8,
      token_env: "GITHUB_TOKEN"
    },
    {
      "trend-min-stars": "250",
      "items-per-repo": "4"
    }
  );

  assert.deepEqual(config.repos, ["openai/codex"]);
  assert.equal(config.trendQuery, "topic:ai");
  assert.equal(config.trendMinStars, 250);
  assert.equal(config.itemsPerRepo, 4);
});

test("buildSnapshotFromFixtures emits evidence-first envelopes, triage lanes, candidates, and memory bias", () => {
  const snapshot = buildSnapshotFromFixtures({
    generatedAt: "2026-06-25T08:00:00.000Z",
    config: {
      repos: ["openai/codex"],
      trendQuery: "topic:ai",
      trendWindowDays: 14,
      trendMinStars: 100,
      trendLimit: 8,
      itemsPerRepo: 8,
      tokenEnv: "GITHUB_TOKEN"
    },
    previousState: {
      schema_version: 1,
      repositories: {
        "openai/codex": {
          stars: 93990,
          forks: 13990,
          open_workload: 7990,
          last_seen_at: "2026-06-24T08:00:00.000Z"
        }
      },
      items: {
        "openai/codex#101": {
          score: 80,
          comments: 40,
          reactions: 10,
          triage_lane: "needs_validation",
          last_seen_at: "2026-06-24T08:00:00.000Z"
        }
      },
      memory_bias: {
        schema_version: 1,
        repositories: {},
        topics: {},
        labels: {},
        top_repositories: [],
        top_topics: [],
        top_labels: []
      }
    },
    fixture
  });

  assert.equal(snapshot.events.length, 3);
  assert.equal(snapshot.trend_candidates.length, 1);
  assert.equal(snapshot.repo_metadata["openai/codex"].delta.stars, 10);

  const hotIssue = snapshot.events.find((event) => event.id === "openai/codex#101");
  for (const key of [
    "repo",
    "kind",
    "title",
    "url",
    "actor",
    "created_at",
    "labels",
    "summary",
    "relevance_reason",
    "risk_flags",
    "score",
    "triage_lane",
    "evidence_url"
  ]) {
    assert.ok(key in hotIssue, `missing envelope field ${key}`);
  }
  assert.equal(hotIssue.triage_lane, "needs_validation");
  assert.ok(hotIssue.delta.score > 0);
  assert.equal(hotIssue.evidence_url, "https://github.com/openai/codex/issues/101");
  assert.equal(snapshot.memory_bias.top_labels[0].key, "sandbox");
});

test("buildDailyBrief includes the required publishing sections and evidence links", () => {
  const snapshot = buildSnapshotFromFixtures({
    generatedAt: "2026-06-25T08:00:00.000Z",
    config: {
      repos: ["openai/codex"],
      trendQuery: "topic:ai",
      trendWindowDays: 14,
      trendMinStars: 100,
      trendLimit: 8,
      itemsPerRepo: 8,
      tokenEnv: "GITHUB_TOKEN"
    },
    previousState: { schema_version: 1, repositories: {}, items: {}, memory_bias: null },
    fixture
  });
  const brief = buildDailyBrief(snapshot);

  for (const heading of [
    "今日高热 PR",
    "今日高热 issue",
    "新增候选仓库",
    "可写内容选题",
    "产品机会",
    "需要继续观察的风险"
  ]) {
    assert.match(brief, new RegExp(`## ${heading}`));
  }
  assert.match(brief, /https:\/\/github\.com\/openai\/codex\/issues\/101/);
  assert.match(brief, /https:\/\/github\.com\/example\/agent-lab/);
});

test("buildSnapshotIndex keeps latest and previous snapshots for history comparison UI", () => {
  const index = buildSnapshotIndex(
    [
      {
        generated_at: "2026-06-24T08:00:00.000Z",
        events: [{ id: "old", kind: "issue" }],
        pull_requests: [],
        issues: [{ id: "old" }],
        trend_candidates: []
      }
    ],
    {
      generated_at: "2026-06-25T08:00:00.000Z",
      events: [{ id: "new", kind: "pull_request" }],
      pull_requests: [{ id: "new" }],
      issues: [],
      trend_candidates: [{ repo: "example/agent-lab" }]
    }
  );

  assert.equal(index.snapshots.length, 2);
  assert.equal(index.snapshots[0].generated_at, "2026-06-25T08:00:00.000Z");
  assert.equal(index.snapshots[0].pull_requests, 1);
  assert.equal(index.snapshots[1].issues, 1);
});
