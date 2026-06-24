import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  blueprintsSidebar: [
    {
      type: 'category',
      label: 'Blueprints',
      collapsed: false,
      collapsible: false,
      items: [
        'overview',
        {
          type: 'category',
          label: 'Operating Model Planes',
          collapsed: false,
          collapsible: true,
          items: [
            'control-plane',
            'context-engine',
            'data-knowledge-plane',
            'runtime-plane',
          ],
        },
        {
          type: 'category',
          label: 'Capability Patterns',
          collapsed: false,
          collapsible: true,
          items: [
            'llm-gateway',
            'rag-architecture',
            'agent-flow-model',
          ],
        },
        {
          type: 'category',
          label: 'Reference Models',
          collapsed: false,
          collapsible: true,
          items: [
            'gain-architecture',
            'memory-model',
            'decision-model',
          ],
        },
        {
          type: 'category',
          label: 'Draft',
          collapsed: false,
          collapsible: true,
          items: [
            'llm-inference-path',
            'grounding-verification-pipeline',
            'ai-telemetry-capture',
            'rag-access-control',
            'human-in-the-loop-checkpoints',
            'ai-architecture-maturity',
            'mcp-tool-registry',
            'llm-cost-at-scale',
            'ai-readiness-gate',
            'agent-observability-model',
            'rag-eval-harness',
            'ai-rollout-scorecard',
            'policy-enforcement-layer',
            'legacy-ai-integration',
            'cloud-llm-choice',
            'context-budgeting',
            'agent-audit-trail',
            'compliance-control-map',
            'event-driven-ai',
            'llm-latency-budget',
            'ai-domain-boundaries',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
