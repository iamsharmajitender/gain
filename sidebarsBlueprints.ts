import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  blueprintsSidebar: [
    'overview',
    'evaluation-blueprint',
    'agents-blueprint',
    'llm-blueprint',
    {
      type: 'category',
      label: 'Governance',
      collapsed: true,
      link: {type: 'doc', id: 'governance/overview'},
      items: ['governance/operating', 'governance/runtime'],
    },
    'observability-blueprint',
    'rag-blueprint',
    'mcp-blueprint',
  ],
};

export default sidebars;
