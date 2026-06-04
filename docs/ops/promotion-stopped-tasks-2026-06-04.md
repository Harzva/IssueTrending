# Promotion Workflow Stopped Tasks - 2026-06-04

This log records promotion workflow items that are intentionally stopped as of
2026-06-04. They should not be treated as active IssueTrending follow-up work.

## Stopped Items

- Native Xiaohongshu draft-box API integration.
  - Current evidence: the available Xiaohongshu MCP tools expose publishing and
    scheduled publishing, but no true draft-box API.
  - Final handling: keep local/private/scheduled fallback records only.

- Xiaohongshu URL/PostID backfill for already published records.
  - Current evidence: several published ledger records still have empty
    `url_or_post_id`.
  - Final handling: do not invent URLs or PostIDs; stop pursuing this as an
    active task.

- `daily-draft-2026-06-04` scheduled-post URL/PostID backfill.
  - Current evidence: `schedule_at` is `2026-06-05T09:30:00+08:00`, so it
    cannot be verified or backfilled on 2026-06-04.
  - Final handling: stop treating this as required current work.

- Xiaohongshu feed search retry loop.
  - Current evidence: prior feed lookup attempts timed out and only timeout
    evidence was recorded.
  - Final handling: do not keep retrying feed lookup as an active task.

- Zhihu and WeChat publication closure.
  - Current evidence: repo-promotion-manager can count coverage gaps and create
    `needs_asset` tasks, but it does not prove published Zhihu or WeChat assets.
  - Final handling: keep gap statistics only; stop pursuing full published
    asset closure in the current scope.

## Automation Action

The related local Codex automations should be paused:

- `issuetrending-daily-xhs-draft-selection`
- `issuetrending-xhs-scheduled-backfill-monitor`

## Push Scope

This log is stored in the IssueTrending Git repository so the stop decision can
be committed and pushed to `origin/main`.
