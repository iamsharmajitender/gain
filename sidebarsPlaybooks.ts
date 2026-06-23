import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  playbooksSidebar: [
    {
      type: 'category',
      label: 'Playbooks',
      collapsed: false,
      items: [
        'overview',
        'build-enterprise-rag',
        'agentic-systems-design',
        'ai-observability',
        'data-pipelines-for-ai',
        'llm-integration-guide',
      ],
    },
  ],
};

export default sidebars;
