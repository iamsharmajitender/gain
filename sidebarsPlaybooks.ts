import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  playbooksSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Eval Engineering',
      collapsed: true,
      items: [
        'eval-engineering/golden-datasets',
        'eval-engineering/synthetic-generation',
        'eval-engineering/online-dynamic',
        'eval-engineering/human-review',
        'eval-engineering/llm-as-judge',
        {
          type: 'category',
          label: 'Plane playbooks',
          collapsed: true,
          items: [
            'eval-engineering/plane-input',
            'eval-engineering/plane-data',
            'eval-engineering/plane-context',
            'eval-engineering/plane-reasoning',
            'eval-engineering/plane-tool',
            'eval-engineering/plane-memory',
            'eval-engineering/plane-action',
            'eval-engineering/plane-outcome',
          ],
        },
        'eval-engineering/further-reading',
      ],
    },
    {
      type: 'category',
      label: 'Intent Router (Plane ①)',
      collapsed: true,
      items: [
        'intent-router/overview',
        'intent-router/route-table-lifecycle',
        'intent-router/layered-classifier',
        'intent-router/wire-agentic-app',
        'intent-router/routing-eval-ci',
      ],
    },
    {
      type: 'category',
      label: 'PGAR Runtime',
      collapsed: true,
      items: [
        'pgar-runtime/overview',
        {
          type: 'category',
          label: 'Foundation playbooks',
          collapsed: true,
          items: [
            'pgar-runtime/foundation/overview',
            'pgar-runtime/foundation/policy-contracts',
            'pgar-runtime/foundation/token-and-session-boundary',
            'pgar-runtime/foundation/pep-enforcement',
            'pgar-runtime/foundation/pdp-policy-surfaces',
            'pgar-runtime/foundation/step-up-and-attestation',
            'pgar-runtime/foundation/audit-and-replay',
          ],
        },
        {
          type: 'category',
          label: 'Assurance playbooks',
          collapsed: true,
          items: [
            'pgar-runtime/assurance/policy-test-scenarios',
            'pgar-runtime/assurance/adversarial-testing',
          ],
        },
        {
          type: 'category',
          label: 'Boundary playbooks',
          collapsed: true,
          items: [
            'pgar-runtime/boundary/overview',
            'pgar-runtime/boundary/ingress',
            'pgar-runtime/boundary/agentic-app',
            'pgar-runtime/boundary/llm-proposal',
            'pgar-runtime/boundary/pep-pdp',
            'pgar-runtime/boundary/downstream',
          ],
        },
        {
          type: 'category',
          label: 'Domain playbooks',
          collapsed: true,
          items: [
            'pgar-runtime/domain/tool-registry',
            'pgar-runtime/domain/manifest-lifecycle',
            'pgar-runtime/domain/rag-retrieval',
          ],
        },
        'pgar-runtime/further-reading',
      ],
    },
  ],
};

export default sidebars;
