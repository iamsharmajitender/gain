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
        'gain-prompt',
        'gain-agents',
        'gain-evaluation',
        'gain-identity',
        'gain-mcp',
        'gain-observability',
      ],
    },
  ],
};

export default sidebars;
