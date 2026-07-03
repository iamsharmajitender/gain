import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  blueprintsSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Router (three planes)',
      collapsed: false,
      items: [
        'router-blueprint',
        'intent-router-blueprint',
        'orchestration-plane-blueprint',
        'model-routing-plane-blueprint',
      ],
    },
    'eval-blueprint',
    'pgar-blueprint',
  ],
};

export default sidebars;
