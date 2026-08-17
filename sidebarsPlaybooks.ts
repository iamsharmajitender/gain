import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  playbooksSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Evaluation',
      collapsed: true,
      items: [
        'evaluation/overview',
        'evaluation/golden-datasets',
        'evaluation/synthetic-generation',
        'evaluation/online-dynamic',
        'evaluation/human-review',
        'evaluation/llm-as-judge',
        {
          type: 'category',
          label: 'Eval planes',
          collapsed: true,
          items: [
            'evaluation/planes/plane-input',
            'evaluation/planes/plane-data',
            'evaluation/planes/plane-context',
            'evaluation/planes/plane-reasoning',
            'evaluation/planes/plane-tool',
            'evaluation/planes/plane-memory',
            'evaluation/planes/plane-action',
            'evaluation/planes/plane-outcome',
          ],
        },
        'evaluation/further-reading',
      ],
    },
    {
      type: 'category',
      label: 'Agents',
      collapsed: true,
      items: [
        'agents/overview',
        {
          type: 'category',
          label: 'Intent router',
          collapsed: true,
          items: [
            'agents/intent-router/overview',
            'agents/intent-router/route-contract-reference',
            'agents/intent-router/route-table-lifecycle',
            'agents/intent-router/layered-classifier',
            'agents/intent-router/wire-agentic-app',
            'agents/intent-router/routing-eval-ci',
          ],
        },
        {
          type: 'category',
          label: 'Orchestration',
          collapsed: true,
          items: [
            'agents/orchestration/overview',
            'agents/orchestration/session-custody',
            'agents/orchestration/memory',
            'agents/orchestration/autonomy-shape',
            'agents/orchestration/inference-handoff',
          ],
        },
        {
          type: 'category',
          label: 'Manifests',
          collapsed: true,
          items: [
            'agents/manifests/manifest-registry',
            'agents/manifests/manifest-lifecycle',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'LLM',
      collapsed: true,
      items: [
        'llm/overview',
        'llm/capability-matrix',
        'llm/gateway-task-routing',
        'llm/canary-promotion',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      collapsed: true,
      items: [
        'governance/overview',
        {
          type: 'category',
          label: 'Operating',
          collapsed: true,
          items: [
            'governance/operating/overview',
            'governance/operating/inventory',
            'governance/operating/obligation-to-control',
            'governance/operating/go-live-evidence',
          ],
        },
        {
          type: 'category',
          label: 'Runtime',
          collapsed: true,
          items: [
            'governance/runtime/overview',
            {
              type: 'category',
              label: '① Foundation',
              collapsed: true,
              items: [
                'governance/runtime/foundation/overview',
                'governance/runtime/foundation/policy-contracts',
                'governance/runtime/foundation/token-and-session-boundary',
                'governance/runtime/foundation/pep-enforcement',
                'governance/runtime/foundation/pdp-policy-surfaces',
                'governance/runtime/foundation/step-up-and-attestation',
                'governance/runtime/foundation/audit-and-replay',
              ],
            },
            {
              type: 'category',
              label: '② Assurance',
              collapsed: true,
              items: [
                'governance/runtime/assurance/policy-test-scenarios',
                'governance/runtime/assurance/adversarial-testing',
              ],
            },
            {
              type: 'category',
              label: '③ Boundary',
              collapsed: true,
              items: [
                'governance/runtime/boundary/overview',
                'governance/runtime/boundary/ingress',
                'governance/runtime/boundary/agentic-app',
                'governance/runtime/boundary/llm-proposal',
                'governance/runtime/boundary/pep-pdp',
                'governance/runtime/boundary/downstream',
              ],
            },
            'governance/runtime/further-reading',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'RAG',
      collapsed: true,
      items: ['rag/overview', 'rag/retrieval'],
    },
    {
      type: 'category',
      label: 'MCP',
      collapsed: true,
      items: [
        'mcp/overview',
      ],
    },
    {
      type: 'category',
      label: 'Observability',
      collapsed: true,
      items: [
        'observability/overview',
        'observability/governance-rules',
        'observability/business-journey-mapping',
        'observability/service-golden-signals',
        'observability/infrastructure-telemetry',
        'observability/correlation-graph',
        'observability/maturity-assessment',
        'observability/operating-model',
      ],
    },
  ],
};

export default sidebars;
