import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  architectureSidebar: [
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      collapsible: false,
      items: [
        'overview',
        {
          type: 'category',
          label: 'Platform Foundations',
          collapsed: false,
          collapsible: true,
          items: [
            'distributed-systems',
            'event-driven-systems',
            'api-design',
          ],
        },
        {
          type: 'category',
          label: 'AI Systems',
          collapsed: false,
          collapsible: true,
          items: [
            'llm-production-patterns',
            'hallucination-guardrails',
            'architect-ai-observability',
            'governed-agent-systems',
            'enterprise-rag-systems',
            'policy-identity-boundaries',
            'banking-ai-assistant',
            'full-stack-ai-foundations',
            'next-maturity-level',
            'governed-mcp-integration',
            'llm-cost-routing',
            'rag-evaluation',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
