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
  releaseMode: "seed",
  releaseScope: "hot",
  releaseDownloads: [],
};

const timeframeConfig = {
  "7d": {
    label: "7D",
    compare: "Prior 7D",
    issueScale: 1,
    deltaScale: 1,
    metricDelta: "+18%",
  },
  "30d": {
    label: "30D",
    compare: "Prior 30D",
    issueScale: 4,
    deltaScale: 2.4,
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
      repos: [
        "langchain-ai/langchain",
        "crewAIInc/crewAI",
        "microsoft/autogen",
        "mem0ai/mem0",
        "getzep/zep",
        "langchain-ai/langgraph",
        "Significant-Gravitas/AutoGPT",
      ],
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
      repos: [
        "modelcontextprotocol/servers",
        "modelcontextprotocol/inspector",
        "browser-use/browser-use",
        "modelcontextprotocol/typescript-sdk",
        "modelcontextprotocol/python-sdk",
        "punkpeye/awesome-mcp-servers",
      ],
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
      repos: [
        "run-llama/llama_index",
        "langchain-ai/langchain",
        "explodinggradients/ragas",
        "deepset-ai/haystack",
        "chroma-core/chroma",
        "qdrant/qdrant",
        "weaviate/weaviate",
      ],
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
      repos: [
        "browser-use/browser-use",
        "microsoft/playwright",
        "Skyvern-AI/skyvern",
        "microsoft/playwright-mcp",
        "browserbase/stagehand",
        "browserbase/mcp-server-browserbase",
      ],
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
      repos: [
        "openai/codex",
        "continuedev/continue",
        "aider-ai/aider",
        "cline/cline",
        "RooVetGit/Roo-Code",
        "opencode-ai/opencode",
        "google-gemini/gemini-cli",
      ],
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
      repos: [
        "langfuse/langfuse",
        "langchain-ai/langsmith-sdk",
        "openlit/openlit",
        "Arize-ai/phoenix",
        "Helicone/helicone",
        "promptfoo/promptfoo",
        "traceloop/openllmetry",
        "langwatch/langwatch",
      ],
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
  "mem0ai/mem0": { stars: 57600, forks: 6600, contributors: 170 },
  "getzep/zep": { stars: 4600, forks: 630, contributors: 75 },
  "langchain-ai/langgraph": { stars: 33800, forks: 5700, contributors: 260 },
  "Significant-Gravitas/AutoGPT": { stars: 184700, forks: 46200, contributors: 520 },
  "modelcontextprotocol/servers": { stars: 58900, forks: 6400, contributors: 520 },
  "modelcontextprotocol/inspector": { stars: 9200, forks: 1100, contributors: 84 },
  "modelcontextprotocol/typescript-sdk": { stars: 12600, forks: 1900, contributors: 120 },
  "modelcontextprotocol/python-sdk": { stars: 23200, forks: 3500, contributors: 150 },
  "punkpeye/awesome-mcp-servers": { stars: 88500, forks: 11100, contributors: 180 },
  "browser-use/browser-use": { stars: 64800, forks: 7100, contributors: 240 },
  "run-llama/llama_index": { stars: 43100, forks: 6200, contributors: 910 },
  "explodinggradients/ragas": { stars: 8900, forks: 1200, contributors: 150 },
  "deepset-ai/haystack": { stars: 25500, forks: 2800, contributors: 440 },
  "chroma-core/chroma": { stars: 28200, forks: 2300, contributors: 250 },
  "qdrant/qdrant": { stars: 31800, forks: 2300, contributors: 210 },
  "weaviate/weaviate": { stars: 16300, forks: 1300, contributors: 210 },
  "microsoft/playwright": { stars: 74400, forks: 4300, contributors: 620 },
  "Skyvern-AI/skyvern": { stars: 12600, forks: 1500, contributors: 92 },
  "microsoft/playwright-mcp": { stars: 33500, forks: 2800, contributors: 80 },
  "browserbase/stagehand": { stars: 22900, forks: 1500, contributors: 95 },
  "browserbase/mcp-server-browserbase": { stars: 3400, forks: 360, contributors: 35 },
  "openai/codex": { stars: 12500, forks: 980, contributors: 68 },
  "continuedev/continue": { stars: 28300, forks: 3000, contributors: 210 },
  "aider-ai/aider": { stars: 37200, forks: 3900, contributors: 260 },
  "cline/cline": { stars: 62700, forks: 6600, contributors: 300 },
  "RooVetGit/Roo-Code": { stars: 24200, forks: 3300, contributors: 180 },
  "opencode-ai/opencode": { stars: 12800, forks: 1400, contributors: 95 },
  "google-gemini/gemini-cli": { stars: 104900, forks: 14000, contributors: 460 },
  "langfuse/langfuse": { stars: 13500, forks: 1200, contributors: 170 },
  "langchain-ai/langsmith-sdk": { stars: 2100, forks: 420, contributors: 54 },
  "openlit/openlit": { stars: 2900, forks: 260, contributors: 48 },
  "Arize-ai/phoenix": { stars: 10000, forks: 910, contributors: 140 },
  "Helicone/helicone": { stars: 5800, forks: 590, contributors: 100 },
  "promptfoo/promptfoo": { stars: 21900, forks: 1900, contributors: 210 },
  "traceloop/openllmetry": { stars: 7200, forks: 980, contributors: 90 },
  "langwatch/langwatch": { stars: 3300, forks: 320, contributors: 55 },
  "aquasecurity/trivy": { stars: 28800, forks: 2800, contributors: 620 },
  "Open-LLM-VTuber/Open-LLM-VTuber": { stars: 7700, forks: 650, contributors: 80 },
  "NousResearch/hermes-agent": { stars: 179800, forks: 30800, contributors: 120 },
  "chopratejas/headroom": { stars: 1600, forks: 110, contributors: 22 },
  "microsoft/markitdown": { stars: 74000, forks: 3900, contributors: 160 },
  "D4Vinci/Scrapling": { stars: 9800, forks: 520, contributors: 35 },
  "Gloridust/WechatOnCloud": { stars: 1200, forks: 110, contributors: 12 },
};

const releaseWatchRepos = [
  "aquasecurity/trivy",
  "Open-LLM-VTuber/Open-LLM-VTuber",
  "NousResearch/hermes-agent",
  "RooVetGit/Roo-Code",
  "google-gemini/gemini-cli",
  "chopratejas/headroom",
  "microsoft/markitdown",
  "D4Vinci/Scrapling",
  "Gloridust/WechatOnCloud",
  "browser-use/browser-use",
  "microsoft/playwright",
  "cline/cline",
];

const releaseDownloadSeed = [
  {
    repo: "aquasecurity/trivy",
    tagName: "v0.71.0",
    publishedAt: "2026-06-01",
    totalDownloads: 185842,
    assetCount: 47,
    topAssetName: "trivy_0.71.0_Linux-64bit.tar.gz",
    topAssetDownloads: 97116,
    topAssetUrl: "https://github.com/aquasecurity/trivy/releases/download/v0.71.0/trivy_0.71.0_Linux-64bit.tar.gz",
  },
  {
    repo: "Open-LLM-VTuber/Open-LLM-VTuber",
    tagName: "v1.2.1",
    publishedAt: "2025-08-26",
    totalDownloads: 15889,
    assetCount: 4,
    topAssetName: "open-llm-vtuber-1.2.1-setup.exe",
    topAssetDownloads: 7391,
    topAssetUrl: "https://github.com/Open-LLM-VTuber/Open-LLM-VTuber/releases/download/v1.2.1/open-llm-vtuber-1.2.1-setup.exe",
  },
  {
    repo: "NousResearch/hermes-agent",
    tagName: "v2026.5.29.2",
    publishedAt: "2026-05-29",
    totalDownloads: 8325,
    assetCount: 2,
    topAssetName: "hermes_agent-0.15.2-py3-none-any.whl",
    topAssetDownloads: 4228,
    topAssetUrl: "https://github.com/NousResearch/hermes-agent/releases/download/v2026.5.29.2/hermes_agent-0.15.2-py3-none-any.whl",
  },
  {
    repo: "RooVetGit/Roo-Code",
    tagName: "v3.54.0",
    publishedAt: "2026-05-15",
    totalDownloads: 862,
    assetCount: 1,
    topAssetName: "roo-cline-3.54.0.vsix",
    topAssetDownloads: 862,
    topAssetUrl: "https://github.com/RooCodeInc/Roo-Code/releases/download/v3.54.0/roo-cline-3.54.0.vsix",
  },
  {
    repo: "google-gemini/gemini-cli",
    tagName: "v0.45.0",
    publishedAt: "2026-06-03",
    totalDownloads: 187,
    assetCount: 3,
    topAssetName: "gemini-cli-bundle.zip",
    topAssetDownloads: 112,
    topAssetUrl: "https://github.com/google-gemini/gemini-cli/releases/download/v0.45.0/gemini-cli-bundle.zip",
  },
  {
    repo: "chopratejas/headroom",
    tagName: "v0.22.4",
    publishedAt: "2026-06-01",
    totalDownloads: 253,
    assetCount: 15,
    topAssetName: "headroom-ai-0.22.4.tgz",
    topAssetDownloads: 54,
    topAssetUrl: "https://github.com/chopratejas/headroom/releases/download/v0.22.4/headroom-ai-0.22.4.tgz",
  },
].sort((a, b) => b.totalDownloads - a.totalDownloads);

const releaseScopeLabels = {
  hot: "Hot candidates",
  pain: "Current pain repos",
  watch: "Watchlist",
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
  scanReleases: document.querySelector("#scanReleases"),
  releaseScopeButtons: document.querySelectorAll("[data-release-scope]"),
  releaseStatus: document.querySelector("#releaseStatus"),
  releaseTable: document.querySelector("#releaseTable"),
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

function renderRepoWeight(repos) {
  const totals = aggregateRepoMetrics(repos);
  return `${compactNumber(totals.stars)} S / ${compactNumber(totals.forks)} F / ${compactNumber(totals.contributors)} C`;
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
  return renderRepoWeight(repos);
}

function githubRepoUrl(repo) {
  return `https://github.com/${repo}`;
}

function githubIssueUrl(issue) {
  const directUrl = issue.url || "";
  if (directUrl && !/\/issues\/?$/.test(directUrl)) return directUrl;
  const query = encodeURIComponent(`is:issue ${issue.title}`);
  return `${githubRepoUrl(issue.repo)}/issues?q=${query}`;
}

function githubReleaseUrl(repo, tag) {
  return `${githubRepoUrl(repo)}/releases/tag/${encodeURIComponent(tag)}`;
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
    openDays: item.openDays,
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
      state.releaseDownloads = [];
      state.releaseMode = "seed";
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
            <span class="pain-mobile-meta">
              ${escapeHtml(categoryLabels[item.category] ?? item.category)} · ${item.openDays}d open · ${item.repos.length} repos · ${item.evidence.length} issues
            </span>
            <span class="pain-repo-line">
              ${item.repos
                .slice(0, 4)
                .map(
                  (repo) =>
                    `<a class="pain-repo-mini" href="${escapeHtml(githubRepoUrl(repo))}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()" title="${escapeHtml(renderRepoSignal(repo))}">${escapeHtml(repo)}</a>`,
                )
                .join("")}
              ${
                item.repos.length > 4
                  ? `<a class="pain-repo-mini repo-more" href="${escapeHtml(`https://github.com/search?q=${encodeURIComponent(item.repos.join(" OR "))}&type=repositories`)}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()">+${item.repos.length - 4} repos</a>`
                  : ""
              }
            </span>
          </td>
          <td><span class="tag">${escapeHtml(categoryLabels[item.category] ?? item.category)}</span></td>
          <td><span class="num-cell">${item.openDays}</span><small class="repo-impact">open</small></td>
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
              <span class="rail-meta">${escapeHtml(item.meta.join(" · "))}</span>
            </span>
            <span class="rail-rank ${item.level === "High" ? "high" : "med"}">${escapeHtml(item.level)}<br />${item.score}</span>
          </div>
        `,
      )
      .join("")}
  `;
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
        issueUrl: githubIssueUrl(issue),
      })),
    )
    .sort((a, b) => b.comments + b.reactions - (a.comments + a.reactions))
    .slice(0, 10);
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
    .slice(0, 12);
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
            <a href="${escapeHtml(issue.issueUrl)}" target="_blank" rel="noreferrer">${escapeHtml(issue.title)}</a>
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

function currentPainRepos(rows = getFilteredPainPoints()) {
  return rows.flatMap((item) => item.repos);
}

function releaseSourceLabel(repo, rows = getFilteredPainPoints()) {
  const sources = [];
  if (releaseDownloadSeed.some((item) => item.repo === repo)) sources.push("HotGit");
  if (currentPainRepos(rows).includes(repo)) sources.push("Pain");
  if (releaseWatchRepos.includes(repo)) sources.push("Watch");
  return sources.length ? sources.join(" / ") : "Live";
}

function candidateReposForReleaseScan(rows = getFilteredPainPoints()) {
  const painRepos = currentPainRepos(rows);
  const hotRepos = releaseDownloadSeed.map((item) => item.repo);
  const painReposWithReleaseEvidence = hotRepos.filter((repo) => painRepos.includes(repo));
  const pools = {
    hot: [...hotRepos, ...releaseWatchRepos, ...painRepos],
    pain: [...painReposWithReleaseEvidence, ...painRepos],
    watch: releaseWatchRepos,
  };

  return [...new Set(pools[state.releaseScope] ?? pools.hot)].slice(0, 24);
}

function seedReleaseItemsForScope(rows = getFilteredPainPoints()) {
  const candidates = new Set(candidateReposForReleaseScan(rows));
  return releaseDownloadSeed
    .filter((item) => candidates.has(item.repo))
    .map((item) => ({ ...item, source: releaseSourceLabel(item.repo, rows) }));
}

function updateReleaseScopeControls() {
  selectors.releaseScopeButtons.forEach((button) => {
    const active = button.dataset.releaseScope === state.releaseScope;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function releaseScopeStatus(items, rows = getFilteredPainPoints()) {
  const candidates = candidateReposForReleaseScan(rows);
  const label = releaseScopeLabels[state.releaseScope] ?? releaseScopeLabels.hot;
  return `${label} · candidates ${candidates.length} · cached assets ${items.length}`;
}

function renderReleaseTable(items = state.releaseDownloads.length ? state.releaseDownloads : seedReleaseItemsForScope()) {
  updateReleaseScopeControls();
  selectors.releaseTable.innerHTML = `
    <div class="data-row release-row data-head">
      <span>Repository</span>
      <span>Release</span>
      <span>Downloads</span>
      <span>Top asset</span>
      <span>Proof</span>
    </div>
    ${items
      .map(
        (item) => `
          <div class="data-row release-row">
            <a class="repo-stack repo-link" href="${escapeHtml(githubRepoUrl(item.repo))}" target="_blank" rel="noreferrer">
              <strong>${escapeHtml(item.repo)}</strong>
              <small>${escapeHtml(item.source ?? releaseSourceLabel(item.repo))} · ${escapeHtml(renderRepoSignal(item.repo))}</small>
            </a>
            <a class="repo-inline-link" href="${escapeHtml(githubReleaseUrl(item.repo, item.tagName))}" target="_blank" rel="noreferrer">
              ${escapeHtml(item.tagName)}
            </a>
            <span class="num-cell">${compactNumber(item.totalDownloads)}</span>
            <a class="repo-inline-link" href="${escapeHtml(item.topAssetUrl)}" target="_blank" rel="noreferrer" title="${escapeHtml(item.topAssetName)}">
              ${escapeHtml(item.topAssetName)} · ${compactNumber(item.topAssetDownloads)}
            </a>
            <span class="evidence-meta">${escapeHtml(item.assetCount)} assets · ${escapeHtml(item.publishedAt)}</span>
          </div>
        `,
      )
      .join("")}
    ${
      items.length
        ? ""
        : `<div class="empty-state">
            <strong>No release asset downloads scanned</strong>
            <span>Change scope or scan releases; only uploaded assets have download_count.</span>
          </div>`
    }
  `;
}

async function fetchRepoLatestReleaseDownloads(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`${repo} release ${response.status}`);
  }

  const release = await response.json();
  const assets = release.assets ?? [];
  if (!assets.length) return null;

  const totalDownloads = assets.reduce((sum, asset) => sum + (asset.download_count ?? 0), 0);
  const topAsset = [...assets].sort((a, b) => (b.download_count ?? 0) - (a.download_count ?? 0))[0];

  return {
    repo,
    tagName: release.tag_name,
    releaseName: release.name || release.tag_name,
    publishedAt: release.published_at ? new Date(release.published_at).toLocaleDateString("zh-CN") : "unknown",
    totalDownloads,
    assetCount: assets.length,
    topAssetName: topAsset?.name ?? "asset",
    topAssetDownloads: topAsset?.download_count ?? 0,
    topAssetUrl: topAsset?.browser_download_url ?? githubReleaseUrl(repo, release.tag_name),
  };
}

async function scanReleaseDownloads() {
  const repos = candidateReposForReleaseScan();
  const scopeLabel = releaseScopeLabels[state.releaseScope] ?? releaseScopeLabels.hot;
  selectors.scanReleases.disabled = true;
  selectors.scanReleases.textContent = "Scanning...";
  selectors.releaseStatus.textContent = `Scanning ${scopeLabel} · ${repos.length} repos · no-assets repos filtered`;

  const results = await Promise.allSettled(repos.map((repo) => fetchRepoLatestReleaseDownloads(repo)));
  const failures = results.filter((result) => result.status === "rejected").length;
  const downloads = results
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value)
    .map((item) => ({ ...item, source: releaseSourceLabel(item.repo) }))
    .sort((a, b) => b.totalDownloads - a.totalDownloads)
    .slice(0, 10);
  const skipped = results.length - downloads.length;

  state.releaseMode = "live";
  if (downloads.length) {
    state.releaseDownloads = downloads;
    selectors.releaseStatus.textContent = `${scopeLabel} · latest release assets · ${downloads.length} ranked · ${skipped} skipped`;
    renderReleaseTable(downloads);
  } else {
    state.releaseDownloads = [];
    selectors.releaseStatus.textContent = failures
      ? `GitHub API rate-limited or unavailable · showing cached ${scopeLabel} ranking`
      : `No uploaded release assets found in ${repos.length} scanned repos · showing cached ${scopeLabel} ranking`;
    renderReleaseTable(seedReleaseItemsForScope());
  }
  selectors.scanReleases.disabled = false;
  selectors.scanReleases.textContent = "Scan releases";
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
      <a class="drawer-action" href="${escapeHtml(item.evidence[0] ? githubIssueUrl(item.evidence[0]) : "https://github.com/search")}" target="_blank" rel="noreferrer">View source issues</a>
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
                <span><a class="drawer-issue-link" href="${escapeHtml(githubIssueUrl(issue))}" target="_blank" rel="noreferrer">${escapeHtml(issue.title)}</a></span>
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
    state.releaseDownloads = [];
    state.releaseMode = "seed";
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
      state.releaseDownloads = [];
      state.releaseMode = "seed";
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
  selectors.scanReleases.addEventListener("click", scanReleaseDownloads);
  selectors.releaseScopeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.releaseScope = button.dataset.releaseScope;
      state.releaseDownloads = [];
      state.releaseMode = "seed";
      renderReleaseTable();
      selectors.releaseStatus.textContent = releaseScopeStatus(seedReleaseItemsForScope());
    });
  });

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
  const releaseItems = state.releaseDownloads.length ? state.releaseDownloads : seedReleaseItemsForScope(rows);
  renderReleaseTable(releaseItems);
  if (!state.releaseDownloads.length) {
    selectors.releaseStatus.textContent = releaseScopeStatus(releaseItems, rows);
  }
  if (state.liveMode === "seed") {
    renderDefaultLiveResults(rows);
  }
}

bindEvents();
render();
