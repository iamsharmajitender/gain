import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  architectureSidebar: [
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'overview',
        'distributed-systems',
        'event-driven-systems',
        'api-design',
        'governance-security',
      ],
    },
  ],
};

export default sidebars;
