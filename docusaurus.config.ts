import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import clearCacheBeforeStartPlugin from './plugins/clearCacheBeforeStart';

const config: Config = {
  title: 'Jitender Sharma',
  tagline:
    'Advisor & technical leader · Enterprise architecture, platforms & governed AI',
  favicon: 'img/favicon.ico',

  url: 'https://jitendersharma.dev',
  baseUrl: '/',

  organizationName: 'iamsharmajitender',
  projectName: 'architects-handbook',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          path: 'docs/insights',
          showReadingTime: true,
          blogTitle: 'Insights',
          blogDescription:
            'Architecture breakdowns and leadership perspectives on enterprise AI, platforms, and transformation from 18+ years in banking and regulated industries.',
          blogSidebarCount: 0,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          routeBasePath: 'insights',
          postsPerPage: 10,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    clearCacheBeforeStartPlugin,
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.startsWith('/insights')) {
            return [existingPath.replace(/^\/insights/, '/blogs')];
          }
          return undefined;
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'frameworks',
        path: 'docs/frameworks',
        routeBasePath: 'frameworks',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'architecture',
        path: 'docs/architecture',
        routeBasePath: 'architecture',
        blogTitle: 'Architecture',
        blogDescription:
          'Durable systems notes for platform engineering patterns beneath and around G.A.I.N AI systems: resilience, coupling, contracts, and operational trust.',
        blogSidebarCount: 0,
        postsPerPage: 20,
        onInlineTags: 'ignore',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
        feedOptions: {
          type: null,
        },
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'playbooks',
        path: 'docs/playbooks',
        routeBasePath: 'playbooks',
        blogTitle: 'Playbooks',
        blogDescription:
          'Step-by-step guides for building production AI systems in enterprise environments.',
        blogSidebarCount: 0,
        postsPerPage: 20,
        onInlineTags: 'ignore',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
        feedOptions: {
          type: null,
        },
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blueprints',
        path: 'docs/blueprints',
        routeBasePath: 'blueprints',
        blogTitle: 'Blueprints',
        blogDescription:
          'Visual reference models that map G.A.I.N principles to concrete system layers, planes, and capability patterns.',
        blogSidebarCount: 0,
        postsPerPage: 20,
        onInlineTags: 'ignore',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
        feedOptions: {
          type: null,
        },
      },
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: ['frameworks'],
        docsPluginIdForPreferredVersion: 'frameworks',
        blogRouteBasePath: ['insights', 'playbooks', 'architecture', 'blueprints'],
        blogDir: ['docs/insights', 'docs/playbooks', 'docs/architecture', 'docs/blueprints'],
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    image: 'img/jitender-sharma-social.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      style: 'dark',
      hideOnScroll: false,
      logo: {
        alt: 'Jitender Sharma',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'frameworks',
          position: 'left',
          label: 'G.A.I.N',
        },
        {
          to: '/blueprints',
          label: 'Blueprints',
          position: 'left',
        },
        {
          to: '/architecture',
          label: 'Architecture',
          position: 'left',
        },
        {
          to: '/playbooks',
          label: 'Playbooks',
          position: 'left',
        },

        {
          to: '/insights',
          label: 'Insights',
          position: 'left',
        },
        {
          to: '/advisory',
          label: 'Advisory',
          position: 'left',
        },
        {
          to: '/about',
          label: 'About',
          position: 'left',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'G.A.I.N',
          items: [
            {label: 'AIOM', to: '/frameworks'},
            {label: 'LLM', to: '/frameworks/gain-llm'},
            {label: 'RAG', to: '/frameworks/gain-rag'},
            {label: 'Agents', to: '/frameworks/gain-agents'},
            {label: 'MCP', to: '/frameworks/gain-mcp'},
            {label: 'Observability', to: '/frameworks/gain-observability'},
            {label: 'Evaluation', to: '/frameworks/gain-evaluation'},
            {label: 'Identity', to: '/frameworks/gain-identity'},
          ],
        },
        {
          title: 'Explore',
          items: [
            {label: 'Blueprints', to: '/blueprints'},
            {label: 'Architecture', to: '/architecture'},
            {label: 'Playbooks', to: '/playbooks'},
            {label: 'Insights', to: '/insights'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'LinkedIn', href: 'https://linkedin.com/in/iamsharmajitender'},
            {label: 'GitHub', href: 'https://github.com/iamsharmajitender'},
            {label: 'X', href: 'https://x.com/msharmajitender'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'About', to: '/about'},
            {label: 'Advisory', to: '/advisory'},
            {label: 'Sitemap', to: '/sitemap'},
            {label: 'Tags', to: '/insights/tags'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Jitender Sharma.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {light: 'default', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
