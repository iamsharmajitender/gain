export type SitemapLink = {
  label: string;
  href?: string;
  draft?: boolean;
};

export type SitemapSection = {
  id: string;
  title: string;
  question: string;
  description: string;
  href: string;
  links: SitemapLink[];
};

export const handbookSections: SitemapSection[] = [
  {
    id: 'frameworks',
    title: 'G.A.I.N Framework',
    question: 'Why governed AI works this way: principles, patterns, team boundaries',
    description:
      'Governed AI-Native Systems: principles, capability patterns, and team boundaries. The operating model for enterprise AI: grounded context, adaptive learning, intelligent reasoning, and native scalable design.',
    href: '/frameworks',
    links: [
      {label: 'Overview', href: '/frameworks'},
      {label: 'G.A.I.N AIOM', href: '/frameworks/gain-aiom'},
      {label: 'G.A.I.N LLM', href: '/frameworks/gain-llm'},
      {label: 'G.A.I.N RAG', href: '/frameworks/gain-rag'},
      {label: 'G.A.I.N Agents', href: '/frameworks/gain-agents'},
      {label: 'G.A.I.N MCP', href: '/frameworks/gain-mcp'},
      {label: 'G.A.I.N Observability', href: '/frameworks/gain-observability'},
      {label: 'G.A.I.N Evaluation', href: '/frameworks/gain-evaluation'},
      {label: 'G.A.I.N Identity', href: '/frameworks/gain-identity'},
      {label: 'G.A.I.N Prompt', href: '/frameworks/gain-prompt'},
    ],
  },
  {
    id: 'blueprints',
    title: 'Blueprints',
    question: 'What the system looks like: reference diagrams and components',
    description:
      'Reference models and architecture diagrams: planes, components, and request paths derived from G.A.I.N AIOM. Structural, not procedural: layers, boundaries, and how capability patterns map to the stack.',
    href: '/blueprints',
    links: [
      {label: 'Overview', href: '/blueprints'},
      {label: 'How to Model AI Control Plane', href: '/blueprints/control-plane'},
      {label: 'How to Model Context Engine', href: '/blueprints/context-engine'},
      {label: 'How to Model Data / Knowledge Plane', href: '/blueprints/data-knowledge-plane'},
      {label: 'How to Model AI Runtime Plane', href: '/blueprints/runtime-plane'},
      {label: 'How to Model LLM Gateway', href: '/blueprints/llm-gateway'},
      {label: 'How to Model RAG Architecture', href: '/blueprints/rag-architecture'},
      {label: 'How to Model Agent Flow', href: '/blueprints/agent-flow-model'},
      {label: 'How to Model G.A.I.N Architecture', href: '/blueprints/gain-architecture'},
      {label: 'How to Model Memory', href: '/blueprints/memory-model'},
      {label: 'How to Model Decision-Making', href: '/blueprints/decision-model'},
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    question: 'What platform foundations apply broadly: APIs, events, distributed design',
    description:
      'Durable reference for platform engineering patterns beneath and around G.A.I.N AI systems: resilience, coupling, contracts, and operational trust. Not step-by-step build guides; not G.A.I.N-specific component diagrams.',
    href: '/architecture',
    links: [
      {label: 'Overview', href: '/architecture'},
      {label: 'Distributed Systems', href: '/architecture/distributed-systems'},
      {label: 'Event-Driven Systems', href: '/architecture/event-driven-systems'},
      {label: 'API Design', href: '/architecture/api-design'},
    ],
  },
  {
    id: 'playbooks',
    title: 'Playbooks',
    question: 'How to build and ship: staged guides and checklists',
    description:
      'Step-by-step implementation guides for production AI in enterprise environments. Staged paths from design decisions to production readiness. Read Blueprints for structure, then Playbooks for execution.',
    href: '/playbooks',
    links: [
      {label: 'Build Enterprise RAG', href: '/playbooks/build-enterprise-rag'},
      {label: 'Agentic Systems Design', href: '/playbooks/agentic-systems-design'},
      {label: 'AI Observability', href: '/playbooks/ai-observability'},
      {label: 'Data Pipelines for AI', href: '/playbooks/data-pipelines-for-ai'},
      {label: 'LLM Integration Guide', href: '/playbooks/llm-integration-guide'},
      {label: 'Access-Controlled RAG', href: '/playbooks/access-controlled-rag'},
      {label: 'RAG Eval Harness', href: '/playbooks/build-rag-eval-harness'},
      {label: 'Banking AI Platform', href: '/playbooks/banking-ai-platform'},
      {label: 'Governed MCP Setup', href: '/playbooks/governed-mcp-setup'},
      {label: 'Verification Layer', href: '/playbooks/verification-layer'},
    ],
  },
  {
    id: 'insights',
    title: 'Insights',
    question: 'Narrative thinking: essays and field lessons',
    description:
      'Essays, architecture breakdowns, and leadership perspectives on enterprise AI, platforms, and transformation. Published thinking rather than reference documentation.',
    href: '/insights',
    links: [
      {label: 'All posts', href: '/insights'},
      {label: 'Strategy & Architecture', href: '/insights/tags/system-architecture'},
      {label: 'AI & Intelligence', href: '/insights/tags/ai-intelligence'},
      {label: 'Platforms & Engineering', href: '/insights/tags/platforms-engineering'},
      {label: 'Governance & Trust', href: '/insights/tags/governance-trust'},
    ],
  },
];

export const siteSections: SitemapSection[] = [
  {
    id: 'site',
    title: 'About & Advisory',
    question: 'Who builds this and how to engage',
    description:
      'Background on philosophy, leadership approach, and industries, plus advisory services for enterprise architecture, platform modernization, and governed AI.',
    href: '/about',
    links: [
      {label: 'About', href: '/about'},
      {label: 'How I Lead', href: '/about/how-i-lead'},
      {label: 'What I Build', href: '/about/what-i-build'},
      {label: 'Industries', href: '/about/industries'},
      {label: 'Background', href: '/about/background'},
      {label: 'Credentials', href: '/about/credentials'},
      {label: 'Why This Exists', href: '/about/why-this-exists'},
      {label: 'Advisory', href: '/advisory'},
      {label: 'Approach', href: '/advisory/approach'},
      {label: 'Contact', href: '/advisory/contact'},
    ],
  },
];

export function getHandbookSection(id: string): SitemapSection {
  const section = handbookSections.find((item) => item.id === id);
  if (!section) {
    throw new Error(`Unknown handbook section: ${id}`);
  }
  return section;
}

export function getSiteSection(id: string): SitemapSection {
  const section = siteSections.find((item) => item.id === id);
  if (!section) {
    throw new Error(`Unknown site section: ${id}`);
  }
  return section;
}

export function sitemapPageHref(sectionId: string): string {
  return sectionId === 'site' ? '/sitemap/site' : `/sitemap/${sectionId}`;
}
