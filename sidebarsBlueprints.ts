import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  blueprintsSidebar: [
    {
      type: 'category',
      label: 'Blueprints',
      collapsed: false,
      items: [
        'overview',
        {
          type: 'category',
          label: 'Operating Model Planes',
          collapsed: false,
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
          items: [
            'gain-architecture',
            'memory-model',
            'decision-model',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
