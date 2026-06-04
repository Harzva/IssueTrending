const state = {
  activeCategory: "all",
  search: "",
  sortKey: "score",
  sortDirection: "desc",
  selectedId: null,
  trackedIds: new Set(["agent-memory", "mcp-debugging"]),
  rankingOpen: false,
  timeframe: "7d",
  liveMode: "seed",
};

const timeframeConfig = {
  "7d": {
    label: "7D",
    compare: "Prior 7D",
    issueScale: 1,
    deltaScale: 1,
    sparkOffset: 0,
    metricDelta: "+18%",
  },
  "30d": {
    label: "30D",
    compare: "Prior 30D",
    issueScale: 4,
    deltaScale: 2.4,
    sparkOffset: 2,
    metricDelta: "+46%",
  },
};

const data = {
  painPoints: [
    {
      id: "agent-memory",
      title: "Agent 长期记忆不稳定，跨任务上下文容易丢失",
      category: "agent_memory",
      summary: "多个 Agent 项目里，用户都在追问如何让记忆可检查、可回放、可纠错。",
      realNeed: "开发者需要把 Agent 的记忆状态变成可观测对象，而不是只能相信模型会记住。",
      opportunity: "做一个 Agent memory debugger：展示写入、召回、遗忘、冲突和最终决策路径。",
      contentAngle: "《为什么 Agent 记忆难做：从 GitHub issues 看真实痛点》",
      score: 94,
      comments: 418,
      reactions: 126,
      openDays: 73,
      repos: ["langchain-ai/langchain", "crewAIInc/crewAI", "microsoft/autogen"],
      language: "TypeScript",
      evidence: [
        {
          repo: "langchain-ai/langchain",
          title: "Memory state is hard to inspect across agent runs",
          comments: 134,
          reactions: 46,
          created: "2h ago",
          url: "https://github.com/langchain-ai/langchain/issues",
        },
        {
          repo: "crewAIInc/crewAI",
          title: "Persistent memory produces inconsistent results",
          comments: 98,
          reactions: 31,
          created: "4h ago",
          url: "https://github.com/crewAIInc/crewAI/issues",
        },
      ],
    },
    {
      id: "mcp-debugging",
      title: "MCP 工具调用不透明，失败后很难定位问题",
      category: "mcp_debugging",
      summary: "开发者希望看到 tool call 参数、权限、上下文和错误传播，而不是只拿到失败文本。",
      realNeed: "构建 MCP 工作流时，需要一个可重放的调用时间线和权限检查视图。",
      opportunity: "做一个本地 MCP Inspector：记录工具调用、参数 diff、权限状态和错误栈。",
      contentAngle: "《MCP 真正缺的不是更多 server，而是调试体验》",
      score: 91,
      comments: 362,
      reactions: 118,
      openDays: 41,
      repos: ["modelcontextprotocol/servers", "modelcontextprotocol/inspector", "browser-use/browser-use"],
      language: "TypeScript",
      evidence: [
        {
          repo: "modelcontextprotocol/servers",
          title: "Better debugging output for failed tool calls",
          comments: 121,
          reactions: 39,
          created: "1h ago",
          url: "https://github.com/modelcontextprotocol/servers/issues",
        },
        {
          repo: "modelcontextprotocol/inspector",
          title: "Replay tool calls with original arguments",
          comments: 84,
          reactions: 27,
          created: "3h ago",
          url: "https://github.com/modelcontextprotocol/inspector/issues",
        },
      ],
    },
    {
      id: "rag-eval",
      title: "RAG 评测缺少稳定标准，团队不知道改动是否真的变好",
      category: "rag_evaluation",
      summary: "RAG 项目里反复出现 eval dataset、ground truth、chunking 对比和 hallucination 检测问题。",
      realNeed: "团队需要低成本、可复现、能对比版本的 RAG 质量评估流程。",
      opportunity: "做一个面向团队的 RAG eval cockpit：版本对比、样本回放、失败原因聚类。",
      contentAngle: "《RAG 项目 issue 里反复出现的评测焦虑》",
      score: 88,
      comments: 304,
      reactions: 102,
      openDays: 96,
      repos: ["run-llama/llama_index", "langchain-ai/langchain", "explodinggradients/ragas"],
      language: "Python",
      evidence: [
        {
          repo: "run-llama/llama_index",
          title: "How to evaluate retrieval changes reliably",
          comments: 112,
          reactions: 33,
          created: "3h ago",
          url: "https://github.com/run-llama/llama_index/issues",
        },
        {
          repo: "explodinggradients/ragas",
          title: "Need clearer workflow for production RAG evaluation",
          comments: 76,
          reactions: 28,
          created: "6h ago",
          url: "https://github.com/explodinggradients/ragas/issues",
        },
      ],
    },
    {
      id: "browser-agent",
      title: "Browser Agent 遇到登录、验证码和动态 DOM 时稳定性下降",
      category: "browser_automation",
      summary: "自动浏览器项目中，高频抱怨集中在登录态保持、页面变化、弹窗和任务中断恢复。",
      realNeed: "用户需要更可靠的浏览器任务恢复机制，以及对 DOM 变化的可解释失败报告。",
      opportunity: "做一个 Browser Agent QA runner：录制失败现场、生成 selector 修复建议、复用登录态。",
      contentAngle: "《Browser Agent 的商业化瓶颈：不是会不会点网页，而是失败恢复》",
      score: 84,
      comments: 287,
      reactions: 74,
      openDays: 58,
      repos: ["browser-use/browser-use", "microsoft/playwright", "Skyvern-AI/skyvern"],
      language: "Python",
      evidence: [
        {
          repo: "browser-use/browser-use",
          title: "Agent fails after login redirect and modal changes",
          comments: 92,
          reactions: 21,
          created: "5h ago",
          url: "https://github.com/browser-use/browser-use/issues",
        },
        {
          repo: "Skyvern-AI/skyvern",
          title: "Need better retry and recovery for dynamic forms",
          comments: 67,
          reactions: 19,
          created: "8h ago",
          url: "https://github.com/Skyvern-AI/skyvern/issues",
        },
      ],
    },
    {
      id: "coding-agent-context",
      title: "Coding Agent 处理大型代码库时上下文选择不可靠",
      category: "developer_experience",
      summary: "用户不只要更长上下文，而是要知道 Agent 为什么读这些文件、忽略那些文件。",
      realNeed: "开发者需要 repo map、相关文件解释、上下文预算和检索证据。",
      opportunity: "做一个 coding-agent context auditor：显示文件选择理由和遗漏风险。",
      contentAngle: "《大型代码库里，Coding Agent 最容易错在上下文选择》",
      score: 81,
      comments: 244,
      reactions: 69,
      openDays: 37,
      repos: ["openai/codex", "continuedev/continue", "aider-ai/aider"],
      language: "TypeScript",
      evidence: [
        {
          repo: "aider-ai/aider",
          title: "Hard to know which files should be added to context",
          comments: 88,
          reactions: 24,
          created: "10h ago",
          url: "https://github.com/aider-ai/aider/issues",
        },
        {
          repo: "continuedev/continue",
          title: "Context selection misses related files in monorepos",
          comments: 61,
          reactions: 18,
          created: "12h ago",
          url: "https://github.com/continuedev/continue/issues",
        },
      ],
    },
    {
      id: "llmops-cost",
      title: "LLMOps 成本和质量回归难以同时监控",
      category: "llmops",
      summary: "团队想知道每次 prompt、模型或检索策略改动后，成本、延迟、质量有没有一起变差。",
      realNeed: "产品团队需要把成本、质量、延迟和样本级失败放在同一张运营视图里。",
      opportunity: "做一个 LLM release monitor：评测、成本、日志和回滚建议一体化。",
      contentAngle: "《LLM 应用上线后最缺的不是日志，而是质量回归雷达》",
      score: 77,
      comments: 201,
      reactions: 52,
      openDays: 65,
      repos: ["langfuse/langfuse", "langchain-ai/langsmith-sdk", "openlit/openlit"],
      language: "TypeScript",
      evidence: [
        {
          repo: "langfuse/langfuse",
          title: "Track quality regressions after prompt changes",
          comments: 72,
          reactions: 17,
          created: "14h ago",
          url: "https://github.com/langfuse/langfuse/issues",
        },
        {
          repo: "openlit/openlit",
          title: "Need cost and latency regression dashboards",
          comments: 49,
          reactions: 14,
          created: "18h ago",
          url: "https://github.com/openlit/openlit/issues",
        },
      ],
    },
  ],
  opportunities: [
    {
      title: "MCP 调试器",
      body: "把 tool call、参数、权限、失败栈和上下文变化做成可回放时间线。",
      meta: ["B2D", "devtools", "high intent"],
      score: 91,
      level: "High",
    },
    {
      title: "Agent Memory Inspector",
      body: "展示记忆写入、召回、覆盖和遗忘过程，帮助团队评估 Agent 是否真的记住。",
      meta: ["AI infra", "observability", "workflow"],
      score: 88,
      level: "High",
    },
    {
      title: "RAG Eval Cockpit",
      body: "用版本对比和失败样本聚类，解决团队不知道 RAG 是否变好的问题。",
      meta: ["RAG", "team SaaS", "quality"],
      score: 84,
      level: "Med",
    },
  ],
  contentAngles: [
    {
      title: "本周 GitHub issue 暴露的 5 个 Agent 商业化瓶颈",
      body: "适合公众号、知乎和技术 Newsletter，证据来自多项目 issue 讨论。",
      meta: ["weekly", "founder audience"],
      score: 1023,
      level: "High",
    },
    {
      title: "为什么 MCP 缺一个真正的调试层",
      body: "从工具调用失败、权限不透明、参数不可回放三个角度展开。",
      meta: ["MCP", "developer pain"],
      score: 842,
      level: "High",
    },
    {
      title: "RAG Eval 为什么总是做不起来",
      body: "把 issue 里的碎片问题整理成团队落地流程的缺口。",
      meta: ["RAG", "how-to"],
      score: 676,
      level: "Med",
    },
  ],
  signals: [
    {
      title: "可观测性从 LLMOps 扩散到 AgentOps",
      body: "memory、tool call、browser action 都在要求 replay、trace 和 diff。",
      confidence: 88,
      projects: 8,
      firstSeen: "3d ago",
      strength: "Strong",
    },
    {
      title: "跨项目功能请求集中在调试体验",
      body: "用户愿意尝试新框架，但不愿意接受失败不可解释。",
      confidence: 82,
      projects: 6,
      firstSeen: "5d ago",
      strength: "Strong",
    },
    {
      title: "内容选题正在从项目介绍转向问题解释",
      body: "单纯推荐项目的边际价值下降，issue-backed insight 更稀缺。",
      confidence: 76,
      projects: 4,
      firstSeen: "7d ago",
      strength: "Med",
    },
  ],
};

const categoryLabels = {
  all: "全部",
  agent_memory: "Agent Memory",
  mcp_debugging: "MCP Debug",
  rag_evaluation: "RAG Eval",
  browser_automation: "Browser Agent",
  developer_experience: "DX",
  llmops: "LLMOps",
};

const repoMetrics = {
  "langchain-ai/langchain": { stars: 108000, forks: 18100, contributors: 2200 },
  "crewAIInc/crewAI": { stars: 35700, forks: 4300, contributors: 310 },
  "microsoft/autogen": { stars: 47600, forks: 7100, contributors: 430 },
  "modelcontextprotocol/servers": { stars: 58900, forks: 6400, contributors: 520 },
  "modelcontextprotocol/inspector": { stars: 9200, forks: 1100, contributors: 84 },
  "browser-use/browser-use": { stars: 64800, forks: 7100, contributors: 240 },
  "run-llama/llama_index": { stars: 43100, forks: 6200, contributors: 910 },
  "explodinggradients/ragas": { stars: 8900, forks: 1200, contributors: 150 },
  "microsoft/playwright": { stars: 74400, forks: 4300, contributors: 620 },
  "Skyvern-AI/skyvern": { stars: 12600, forks: 1500, contributors: 92 },
  "openai/codex": { stars: 12500, forks: 980, contributors: 68 },
  "continuedev/continue": { stars: 28300, forks: 3000, contributors: 210 },
  "aider-ai/aider": { stars: 37200, forks: 3900, contributors: 260 },
  "langfuse/langfuse": { stars: 13500, forks: 1200, contributors: 170 },
  "langchain-ai/langsmith-sdk": { stars: 2100, forks: 420, contributors: 54 },
  "openlit/openlit": { stars: 2900, forks: 260, contributors: 48 },
};

const selectors = {
  painTable: document.querySelector("#painTable"),
  categoryFilters: document.querySelector("#categoryFilters"),
  searchInput: document.querySelector("#searchInput"),
  drawer: document.querySelector("#detailDrawer"),
  drawerContent: document.querySelector("#drawerContent"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  closeDrawer: document.querySelector("#closeDrawer"),
  opportunityList: document.querySelector("#opportunityList"),
  contentList: document.querySelector("#contentList"),
  signalGrid: document.querySelector("#signalGrid"),
  liveStatus: document.querySelector("#liveStatus"),
  liveResults: document.querySelector("#liveResults"),
  refreshGithub: document.querySelector("#refreshGithub"),
  evidenceTable: document.querySelector("#evidenceTable"),
  repoTable: document.querySelector("#repoTable"),
  topicCloud: document.querySelector("#topicCloud"),
  sortButtons: document.querySelectorAll(".sort-button"),
  railSignalList: document.querySelector("#railSignalList"),
  liveCount: document.querySelector("[data-live-count]"),
  rankingToggle: document.querySelector("#rankingToggle"),
  rankingPanel: document.querySelector("#rankingPanel"),
  resultMeta: document.querySelector("#resultMeta"),
  timeframeButtons: document.querySelectorAll(".timeframe-button"),
  compareButton: document.querySelector("#compareButton"),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getRepoMetrics(repo) {
  return repoMetrics[repo] ?? { stars: 0, forks: 0, contributors: 0 };
}

function compactNumber(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(".0", "")}m`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 100000 ? 0 : 1).replace(".0", "")}k`;
  return String(value);
}

function renderRepoSignal(repo) {
  const metrics = getRepoMetrics(repo);
  return `${compactNumber(metrics.stars)} stars / ${compactNumber(metrics.forks)} forks / ${compactNumber(metrics.contributors)} contributors`;
}

function aggregateRepoMetrics(repos) {
  return [...new Set(repos)].reduce(
    (totals, repo) => {
      const metrics = getRepoMetrics(repo);
      totals.stars += metrics.stars;
      totals.forks += metrics.forks;
      totals.contributors += metrics.contributors;
      return totals;
    },
    { stars: 0, forks: 0, contributors: 0 },
  );
}

function renderRepoImpact(repos) {
  const totals = aggregateRepoMetrics(repos);
  return `${compactNumber(totals.stars)} stars`;
}

function githubRepoUrl(repo) {
  return `https://github.com/${repo}`;
}

function getFilteredPainPoints() {
  const query = state.search.trim().toLowerCase();

  const filtered = data.painPoints.filter((item) => {
    const categoryMatch = state.activeCategory === "all" || item.category === state.activeCategory;
    const queryMatch =
      !query ||
      [item.title, item.summary, item.realNeed, item.opportunity, item.contentAngle, item.category, ...item.repos]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return categoryMatch && queryMatch;
  });

  return sortPainPoints(filtered);
}

function getSortValue(item, key) {
  const values = {
    title: item.title,
    issues: item.evidence.length,
    repos: item.repos.length,
    comments: item.comments,
    reactions: item.reactions,
    score: item.score,
  };

  return values[key] ?? item.score;
}

function sortPainPoints(items) {
  const direction = state.sortDirection === "asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    const aValue = getSortValue(a, state.sortKey);
    const bValue = getSortValue(b, state.sortKey);

    if (typeof aValue === "string" || typeof bValue === "string") {
      return String(aValue).localeCompare(String(bValue), "zh-CN") * direction;
    }

    return (aValue - bValue) * direction;
  });
}

function renderMetrics() {
  const repos = new Set(data.painPoints.flatMap((item) => item.repos));
  const issues = data.painPoints.reduce((sum, item) => sum + item.evidence.length, 0);
  const comments = data.painPoints.reduce((sum, item) => sum + item.comments, 0);
  const reactions = data.painPoints.reduce((sum, item) => sum + item.reactions, 0);
  const topScore = Math.max(...data.painPoints.map((item) => item.score));
  const config = timeframeConfig[state.timeframe];

  document.querySelector("#metricPainPoints").textContent = data.painPoints.length;
  document.querySelector("#metricIssues").textContent = Math.round(issues * config.issueScale);
  document.querySelector("#metricComments").textContent = compactNumber(Math.round(comments * config.issueScale));
  document.querySelector("#metricReactions").textContent = compactNumber(Math.round(reactions * config.issueScale));
  document.querySelector("#metricRepos").textContent = repos.size;
  document.querySelector("#metricOpportunities").textContent = topScore;
  document.querySelector("#metricPainPoints").closest(".metric").querySelector("small span").textContent = config.metricDelta;
  document.querySelector("#metricIssues").closest(".metric").querySelector("small span").textContent = `${config.label.toLowerCase()} indexed`;
  document.querySelector("#metricComments").closest(".metric").querySelector("small span").textContent = `${config.label} volume`;
  document.querySelector("#metricReactions").closest(".metric").querySelector("small span").textContent = `${config.label} signal`;
  selectors.compareButton.textContent = config.compare;
}

function renderFilters() {
  const categories = ["all", ...new Set(data.painPoints.map((item) => item.category))];
  const categoryCounts = data.painPoints.reduce(
    (counts, item) => {
      counts.all += 1;
      counts[item.category] = (counts[item.category] ?? 0) + 1;
      return counts;
    },
    { all: 0 },
  );

  selectors.categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button class="chip ${state.activeCategory === category ? "active" : ""}" type="button" data-category="${escapeHtml(category)}">
          <span>${escapeHtml(categoryLabels[category] ?? category)}</span>
          <strong class="chip-count">${categoryCounts[category] ?? 0}</strong>
        </button>
      `,
    )
    .join("");

  selectors.categoryFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category;
      render();
    });
  });
}

function renderPainTable(rows = getFilteredPainPoints()) {
  if (!rows.length) {
    selectors.painTable.innerHTML = `
      <tr class="empty-row">
        <td colspan="10">
          <strong>No matching pain clusters</strong>
          <span>Adjust search, category, or timeframe to restore issue-backed results.</span>
        </td>
      </tr>
    `;
    return;
  }

  selectors.painTable.innerHTML = rows
    .map(
      (item, index) => `
        <tr data-id="${escapeHtml(item.id)}" tabindex="0" class="${state.selectedId === item.id ? "selected" : ""}">
          <td><span class="rank">${index + 1}</span></td>
          <td>
            <span class="pain-title">${escapeHtml(item.title)}</span>
            <span class="pain-summary">${escapeHtml(item.summary)}</span>
            <span class="pain-repo-line">
              ${item.repos
                .slice(0, 2)
                .map(
                  (repo) =>
                    `<a class="pain-repo-mini" href="${escapeHtml(githubRepoUrl(repo))}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()" title="${escapeHtml(renderRepoSignal(repo))}">${escapeHtml(repo)}</a>`,
                )
                .join("")}
            </span>
          </td>
          <td><span class="tag">${escapeHtml(categoryLabels[item.category] ?? item.category)}</span></td>
          <td>
            <span class="sparkline" aria-label="7 day trend">
              ${renderSparkline(index + timeframeConfig[state.timeframe].sparkOffset)}
            </span>
          </td>
          <td><span class="num-cell">${Math.round(item.evidence.length * timeframeConfig[state.timeframe].issueScale)}</span><small class="delta">+${scaledDelta(item.evidence.length * 18)}%</small></td>
          <td><span class="num-cell">${item.repos.length}</span><small class="repo-impact">${escapeHtml(renderRepoImpact(item.repos))}</small></td>
          <td><span class="num-cell">${item.comments}</span><small class="delta">+${scaledDelta(item.comments / 12)}%</small></td>
          <td><span class="num-cell">${item.reactions}</span><small class="delta">+${scaledDelta(item.reactions / 8)}%</small></td>
          <td><span class="score">${item.score}</span></td>
          <td class="track-cell">
            <button class="track-button ${state.trackedIds.has(item.id) ? "active" : ""}" type="button" data-track-id="${escapeHtml(item.id)}" aria-label="Track ${escapeHtml(item.title)}" aria-pressed="${state.trackedIds.has(item.id) ? "true" : "false"}">${state.trackedIds.has(item.id) ? "★" : "☆"}</button>
          </td>
        </tr>
      `,
    )
    .join("");

  selectors.painTable.querySelectorAll(".track-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = button.dataset.trackId;
      if (state.trackedIds.has(id)) {
        state.trackedIds.delete(id);
      } else {
        state.trackedIds.add(id);
      }
      renderWorkspaceData();
    });
  });

  selectors.painTable.querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => openDrawer(row.dataset.id));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDrawer(row.dataset.id);
      }
    });
  });
}

function scaledDelta(value) {
  return Math.round(value * timeframeConfig[state.timeframe].deltaScale);
}

function renderResultMeta(rows = getFilteredPainPoints()) {
  const evidenceCount = rows.reduce((sum, item) => sum + item.evidence.length, 0);
  const reposCount = new Set(rows.flatMap((item) => item.repos)).size;
  const trackedCount = rows.filter((item) => state.trackedIds.has(item.id)).length;
  const query = state.search.trim() || "all";
  const category = categoryLabels[state.activeCategory] ?? state.activeCategory;
  const config = timeframeConfig[state.timeframe];

  selectors.resultMeta.innerHTML = `
    <span><strong>Showing</strong>${rows.length} clusters</span>
    <span><strong>Window</strong>${config.label}</span>
    <span><strong>Evidence</strong>${Math.round(evidenceCount * config.issueScale)} issues</span>
    <span><strong>Repos</strong>${reposCount}</span>
    <span><strong>Tracked</strong>${trackedCount}</span>
    <span><strong>Query</strong>${escapeHtml(query)}</span>
    <span><strong>Category</strong>${escapeHtml(category)}</span>
  `;
}

function renderRankingPanel() {
  selectors.rankingPanel.hidden = !state.rankingOpen;
  selectors.rankingToggle.setAttribute("aria-expanded", state.rankingOpen ? "true" : "false");
}

function renderSortButtons() {
  selectors.sortButtons.forEach((button) => {
    const isActive = button.dataset.sort === state.sortKey;
    button.classList.toggle("active", isActive);
    button.classList.toggle("asc", isActive && state.sortDirection === "asc");
    button.classList.toggle("desc", isActive && state.sortDirection === "desc");
    button.setAttribute(
      "aria-sort",
      isActive ? (state.sortDirection === "asc" ? "ascending" : "descending") : "none",
    );
  });
}

function renderTimeframeButtons() {
  selectors.timeframeButtons.forEach((button) => {
    const active = button.dataset.range === state.timeframe;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  selectors.compareButton.textContent = timeframeConfig[state.timeframe].compare;
}

function renderMiniList(container, items, metricLabel = "Score") {
  container.innerHTML = `
    <div class="rail-row rail-head">
      <span>Signal</span>
      <span>${escapeHtml(metricLabel)}</span>
    </div>
    ${items
      .map(
        (item) => `
          <div class="rail-row">
            <span class="rail-main">
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.body)}</small>
              <span class="rail-meta">
                ${item.meta.map((meta) => `<span>${escapeHtml(meta)}</span>`).join("")}
              </span>
            </span>
            <span class="rail-rank ${item.level === "High" ? "high" : "med"}">${escapeHtml(item.level)}<br />${item.score}</span>
          </div>
        `,
      )
      .join("")}
  `;
}

function renderSparkline(seed) {
  const patterns = [
    [20, 42, 35, 58, 50, 72],
    [24, 38, 55, 47, 66, 80],
    [18, 31, 44, 39, 61, 69],
    [28, 24, 40, 55, 49, 67],
    [15, 30, 28, 43, 51, 62],
    [22, 27, 33, 46, 52, 59],
  ];
  return patterns[seed % patterns.length]
    .map((height) => `<i style="height: ${height}%"></i>`)
    .join("");
}

function collectEvidenceIssues(rows = getFilteredPainPoints()) {
  return rows
    .flatMap((painPoint) =>
      painPoint.evidence.map((issue) => ({
        ...issue,
        cluster: painPoint.title,
        score: painPoint.score,
        clusterId: painPoint.id,
        repoSignal: renderRepoSignal(issue.repo),
      })),
    )
    .sort((a, b) => b.comments + b.reactions - (a.comments + a.reactions))
    .slice(0, 5);
}

function collectRepositories(rows = getFilteredPainPoints()) {
  const repos = new Map();

  rows.forEach((painPoint) => {
    painPoint.repos.forEach((repo) => {
      const current = repos.get(repo) ?? {
        repo,
        clusters: 0,
        score: 0,
        comments: 0,
        language: painPoint.language,
        activity: 0,
        ...getRepoMetrics(repo),
      };

      current.clusters += 1;
      current.score += painPoint.score;
      current.comments += painPoint.comments;
      current.activity += Math.round((painPoint.comments + painPoint.reactions) / 40);
      repos.set(repo, current);
    });
  });

  return Array.from(repos.values())
    .sort((a, b) => b.score - a.score || b.comments - a.comments)
    .slice(0, 5);
}

function collectTopics(rows = getFilteredPainPoints()) {
  const topicCounts = new Map();

  rows.forEach((painPoint) => {
    const words = [
      painPoint.category,
      ...painPoint.repos.map((repo) => repo.split("/")[1]),
      ...painPoint.opportunity
        .toLowerCase()
        .replace(/[^\w\s-]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 3),
    ];

    words.forEach((word) => {
      const normalized = word.replaceAll("_", "-");
      topicCounts.set(normalized, (topicCounts.get(normalized) ?? 0) + 1);
    });
  });

  return Array.from(topicCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);
}

function renderEvidenceTable(rows = getFilteredPainPoints()) {
  const issues = collectEvidenceIssues(rows);

  selectors.evidenceTable.innerHTML = `
    <div class="data-row evidence-row data-head">
      <span>Issue</span>
      <span>Repo</span>
      <span>Repo signal</span>
      <span>Comments</span>
      <span>Reactions</span>
      <span>Cluster</span>
    </div>
    ${issues
      .map(
        (issue) => `
          <div class="data-row evidence-row">
            <a href="${escapeHtml(issue.url)}" target="_blank" rel="noreferrer">${escapeHtml(issue.title)}</a>
            <a class="repo-stack repo-link" href="${escapeHtml(githubRepoUrl(issue.repo))}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()">
              <strong>${escapeHtml(issue.repo)}</strong>
              <small>${escapeHtml(issue.created)}</small>
            </a>
            <span class="repo-signal" title="${escapeHtml(issue.repoSignal)}">${escapeHtml(issue.repoSignal)}</span>
            <span class="evidence-meta">${issue.comments}</span>
            <span class="evidence-meta">${issue.reactions}</span>
            <span class="cluster-badge">${issue.score}</span>
          </div>
        `,
      )
      .join("")}
    ${
      issues.length
        ? ""
        : `<div class="empty-state">
            <strong>No evidence issues</strong>
            <span>Current filters produced no GitHub issue examples.</span>
          </div>`
    }
  `;
}

function renderRepoTable(rows = getFilteredPainPoints()) {
  const repos = collectRepositories(rows);

  selectors.repoTable.innerHTML = `
    <div class="data-row repo-row data-head">
      <span>Repository</span>
      <span>Repo signal</span>
    </div>
    ${repos
      .map(
        (repo) => `
          <div class="data-row repo-row">
            <a class="repo-stack repo-link" href="${escapeHtml(githubRepoUrl(repo.repo))}" target="_blank" rel="noreferrer">
              <strong>${escapeHtml(repo.repo)}</strong>
              <small>${repo.clusters} clusters / score ${repo.score}</small>
            </a>
            <span class="repo-signal" title="${escapeHtml(renderRepoSignal(repo.repo))}">${escapeHtml(renderRepoSignal(repo.repo))}</span>
          </div>
        `,
      )
      .join("")}
    ${
      repos.length
        ? ""
        : `<div class="empty-state">
            <strong>No related repositories</strong>
            <span>Relax the query to rebuild the affected repo set.</span>
          </div>`
    }
  `;
}

function renderTopicCloud(rows = getFilteredPainPoints()) {
  const topics = collectTopics(rows);

  selectors.topicCloud.innerHTML = topics.length
    ? topics
        .map(
          ([topic, count]) => `
            <span class="topic-chip">${escapeHtml(topic)} <strong>${count}</strong></span>
          `,
        )
        .join("")
    : `<span class="empty-topic">No topics in current result set</span>`;
}

function renderSignals() {
  selectors.signalGrid.innerHTML = `
    <div class="data-row signal-row data-head">
      <span>Signal</span>
      <span>Projects</span>
      <span>First Seen</span>
      <span>Strength</span>
      <span>Confidence</span>
    </div>
    ${data.signals
      .map(
        (item) => `
          <div class="data-row signal-row">
            <span class="signal-title">
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.body)}</small>
            </span>
            <span class="repo-meta">${item.projects}</span>
            <span class="repo-meta">${escapeHtml(item.firstSeen)}</span>
            <span class="strength-badge ${item.strength === "Strong" ? "strong" : "medium"}">${escapeHtml(item.strength)}</span>
            <span class="confidence">
              <span>${item.confidence}%</span>
              <span class="bar" aria-hidden="true"><span style="width: ${item.confidence}%"></span></span>
            </span>
          </div>
        `,
      )
      .join("")}
  `;
}

function renderRailSignals() {
  selectors.railSignalList.innerHTML = data.signals
    .map(
      (item) => `
        <div class="rail-signal">
          <span>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${item.projects} projects · ${escapeHtml(item.firstSeen)} · ${escapeHtml(item.strength)}</small>
          </span>
          <span class="rail-score">
            <span>${item.confidence}%</span>
            <span class="bar" aria-hidden="true"><span style="width: ${item.confidence}%"></span></span>
          </span>
        </div>
      `,
    )
    .join("");
}

function openDrawer(id) {
  const item = data.painPoints.find((painPoint) => painPoint.id === id);
  if (!item) return;

  const repoTotals = aggregateRepoMetrics(item.repos);

  state.selectedId = id;
  renderPainTable();

  selectors.drawerContent.innerHTML = `
    <span class="drawer-kicker">Selected pain cluster</span>
    <h2>${escapeHtml(item.title)}</h2>
    <div class="repo-list">
      ${item.repos.map((repo) => `<a class="repo-pill" href="${escapeHtml(githubRepoUrl(repo))}" target="_blank" rel="noreferrer">${escapeHtml(repo)}</a>`).join("")}
    </div>

    <div class="drawer-metrics" aria-label="Cluster metrics">
      <div class="drawer-metric">
        <span>Score</span>
        <strong>${item.score}</strong>
      </div>
      <div class="drawer-metric">
        <span>Comments</span>
        <strong>${item.comments}</strong>
      </div>
      <div class="drawer-metric">
        <span>Reactions</span>
        <strong>${item.reactions}</strong>
      </div>
      <div class="drawer-metric">
        <span>Repos</span>
        <strong>${item.repos.length}</strong>
      </div>
      <div class="drawer-metric">
        <span>Open Days</span>
        <strong>${item.openDays}</strong>
      </div>
    </div>

    <div class="drawer-actions" aria-label="Cluster actions">
      <a class="drawer-action" href="#opportunities">Open opportunity</a>
      <a class="drawer-action" href="#content">Open content angle</a>
      <a class="drawer-action" href="${escapeHtml(item.evidence[0]?.url ?? "https://github.com/search")}" target="_blank" rel="noreferrer">View source issues</a>
    </div>

    <section class="drawer-section">
      <h3>Inspector Summary</h3>
      <div class="inspector-grid">
        <span><strong>Category</strong>${escapeHtml(categoryLabels[item.category] ?? item.category)}</span>
        <span><strong>Language</strong>${escapeHtml(item.language)}</span>
        <span><strong>Evidence</strong>${item.evidence.length} issues</span>
        <span><strong>Tracked</strong>${state.trackedIds.has(item.id) ? "yes" : "no"}</span>
        <span><strong>Repo stars</strong>${compactNumber(repoTotals.stars)}</span>
        <span><strong>Repo forks</strong>${compactNumber(repoTotals.forks)}</span>
        <span><strong>Contributors</strong>${compactNumber(repoTotals.contributors)}</span>
      </div>
    </section>

    <section class="drawer-section">
      <h3>Decision Notes</h3>
      <div class="decision-table">
        <div class="decision-row decision-head">
          <span>Use case</span>
          <span>Issue-backed note</span>
        </div>
        <div class="decision-row">
          <span>Need</span>
          <span>${escapeHtml(item.realNeed)}</span>
        </div>
        <div class="decision-row">
          <span>Product</span>
          <span>${escapeHtml(item.opportunity)}</span>
        </div>
        <div class="decision-row">
          <span>Content</span>
          <span>${escapeHtml(item.contentAngle)}</span>
        </div>
      </div>
    </section>

    <section class="drawer-section">
      <h3>Evidence Issues</h3>
      <div class="drawer-evidence-table">
        <div class="drawer-evidence-row drawer-evidence-head">
          <span>Issue</span>
          <span>Repo</span>
          <span>Repo signal</span>
          <span>Comments</span>
          <span>Reactions</span>
        </div>
        ${item.evidence
          .map(
            (issue) => `
              <div class="drawer-evidence-row">
                <span><a class="drawer-issue-link" href="${escapeHtml(issue.url)}" target="_blank" rel="noreferrer">${escapeHtml(issue.title)}</a></span>
                <span><a class="repo-inline-link" href="${escapeHtml(githubRepoUrl(issue.repo))}" target="_blank" rel="noreferrer">${escapeHtml(issue.repo)}</a></span>
                <span title="${escapeHtml(renderRepoSignal(issue.repo))}">${escapeHtml(renderRepoSignal(issue.repo))}</span>
                <span>${issue.comments}</span>
                <span>${issue.reactions}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    </section>
  `;

  selectors.drawer.hidden = false;
  selectors.drawerBackdrop.hidden = false;
  requestAnimationFrame(() => {
    selectors.drawer.classList.add("open");
    selectors.drawer.setAttribute("aria-hidden", "false");
  });
}

function closeDrawer() {
  selectors.drawer.classList.remove("open");
  selectors.drawer.setAttribute("aria-hidden", "true");
  state.selectedId = null;
  renderPainTable();
  setTimeout(() => {
    selectors.drawerBackdrop.hidden = true;
  }, 180);
}

async function fetchGithubIssues() {
  const query = encodeURIComponent("is:issue is:open comments:>10 agent");
  const url = `https://api.github.com/search/issues?q=${query}&per_page=8`;

  selectors.refreshGithub.disabled = true;
  selectors.refreshGithub.textContent = "抓取中...";
  selectors.liveStatus.textContent = "正在请求 GitHub Search API。未配置 token 时可能受到公开限流影响。";

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API ${response.status}`);
    }

    const payload = await response.json();
    const items = payload.items ?? [];
    const repoSignals = await fetchLiveRepoSignals(items);

    state.liveMode = "live";
    selectors.liveStatus.textContent = `抓取完成：找到 ${payload.total_count.toLocaleString()} 条匹配 open issues，展示前 ${items.length} 条。`;
    selectors.liveCount.textContent = items.length;
    selectors.liveResults.innerHTML = `
      <div class="data-row live-row data-head">
        <span>Issue</span>
        <span>Repo</span>
        <span>Repo signal</span>
        <span>Comments</span>
        <span>Updated</span>
      </div>
      ${items
        .map((issue) => {
          const repo = issue.repository_url.split("/repos/")[1] ?? "unknown/repo";
          return `
            <div class="data-row live-row">
              <a href="${escapeHtml(issue.html_url)}" target="_blank" rel="noreferrer">${escapeHtml(issue.title)}</a>
              <span class="evidence-meta">${escapeHtml(repo)}</span>
              <span class="repo-signal" title="${escapeHtml(repoSignals.get(repo) ?? "repo metadata unavailable")}">${escapeHtml(repoSignals.get(repo) ?? "metadata unavailable")}</span>
              <span class="evidence-meta">${issue.comments}</span>
              <span class="evidence-meta">${new Date(issue.updated_at).toLocaleDateString("zh-CN")}</span>
            </div>
          `;
        })
        .join("")}
    `;
  } catch (error) {
    state.liveMode = "seed";
    selectors.liveStatus.textContent = `GitHub 抓取失败：${error.message}。页面仍可使用内置演示数据。`;
    renderDefaultLiveResults(getFilteredPainPoints());
  } finally {
    selectors.refreshGithub.disabled = false;
    selectors.refreshGithub.textContent = "抓取 GitHub";
  }
}

async function fetchLiveRepoSignals(items) {
  const repos = [...new Set(items.map((issue) => issue.repository_url.split("/repos/")[1]).filter(Boolean))].slice(0, 8);
  const results = await Promise.allSettled(
    repos.map(async (repo) => {
      const response = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!response.ok) {
        throw new Error(`repo ${repo} ${response.status}`);
      }

      const payload = await response.json();
      const signal = `${compactNumber(payload.stargazers_count ?? 0)} stars / ${compactNumber(payload.forks_count ?? 0)} forks / ${compactNumber(payload.open_issues_count ?? 0)} open issues`;
      return [repo, signal];
    }),
  );

  return new Map(results.filter((result) => result.status === "fulfilled").map((result) => result.value));
}

function renderDefaultLiveResults(rows = getFilteredPainPoints()) {
  const issues = collectEvidenceIssues(rows);

  selectors.liveResults.innerHTML = `
    <div class="data-row live-row data-head">
      <span>Issue</span>
      <span>Repo</span>
      <span>Repo signal</span>
      <span>Comments</span>
      <span>Updated</span>
    </div>
    ${issues
      .map(
        (issue) => `
          <div class="data-row live-row">
            <a href="${escapeHtml(issue.url)}" target="_blank" rel="noreferrer">${escapeHtml(issue.title)}</a>
            <a class="repo-inline-link" href="${escapeHtml(githubRepoUrl(issue.repo))}" target="_blank" rel="noreferrer">${escapeHtml(issue.repo)}</a>
            <span class="repo-signal" title="${escapeHtml(issue.repoSignal)}">${escapeHtml(issue.repoSignal)}</span>
            <span class="evidence-meta">${issue.comments}</span>
            <span class="evidence-meta">${escapeHtml(issue.created)}</span>
          </div>
        `,
      )
      .join("")}
    ${
      issues.length
        ? ""
        : `<div class="empty-state">
            <strong>No seed issues</strong>
            <span>Current filters have no evidence rows to preview.</span>
          </div>`
    }
  `;
}

function bindEvents() {
  selectors.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderWorkspaceData();
  });

  selectors.sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextSort = button.dataset.sort;
      if (state.sortKey === nextSort) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = nextSort;
        state.sortDirection = nextSort === "title" ? "asc" : "desc";
      }
      renderSortButtons();
      renderWorkspaceData();
    });
  });

  selectors.timeframeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.timeframe = button.dataset.range;
      renderMetrics();
      renderTimeframeButtons();
      renderWorkspaceData();
    });
  });

  selectors.rankingToggle.addEventListener("click", () => {
    state.rankingOpen = !state.rankingOpen;
    renderRankingPanel();
  });

  selectors.closeDrawer.addEventListener("click", closeDrawer);
  selectors.drawerBackdrop.addEventListener("click", closeDrawer);
  selectors.refreshGithub.addEventListener("click", fetchGithubIssues);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

function render() {
  renderMetrics();
  renderFilters();
  renderSortButtons();
  renderTimeframeButtons();
  renderRankingPanel();
  renderWorkspaceData();
  renderMiniList(selectors.opportunityList, data.opportunities, "Score");
  renderMiniList(selectors.contentList, data.contentAngles, "Potential");
  renderSignals();
  renderRailSignals();
}

function renderWorkspaceData() {
  const rows = getFilteredPainPoints();
  renderResultMeta(rows);
  renderPainTable(rows);
  renderEvidenceTable(rows);
  renderRepoTable(rows);
  renderTopicCloud(rows);
  if (state.liveMode === "seed") {
    renderDefaultLiveResults(rows);
  }
}

bindEvents();
render();
