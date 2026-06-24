import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  frameworksSidebar: [
    {
      type: 'category',
      label: 'Frameworks',
      collapsed: false,
      items: [

        'overview',
        'gain-aiom',
        'gain-llm',
        'gain-rag',
        'gain-agents',
        'gain-mcp',
        'gain-observability',
        'gain-evaluation',
        'gain-identity',
        'gain-prompt',
      ],
    },
  ],
};

export default sidebars;
