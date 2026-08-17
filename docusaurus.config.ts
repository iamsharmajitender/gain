import 'dotenv/config';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import clearCacheBeforeStartPlugin from './plugins/clearCacheBeforeStart';
import rehypeWrapTables from './plugins/rehypeWrapTables.mjs';
import createFeedItems from './plugins/createFeedItems.mjs';
import {getFooterFrameworkLinks} from './docusaurus.footer';

/** Intent docs are local-only: available under `npm start`, omitted from production builds. */
const isDev = process.env.NODE_ENV !== 'production';

const config: Config = {
  title: 'Jitender Sharma',
  tagline:
    'Advisor & technical leader · Platforms, modernization & governed AI',
  favicon: 'img/favicon.ico',

  url: 'https://jitendersharma.dev',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'iamsharmajitender',
  projectName: 'gain',
  deploymentBranch: 'gh-pages',

  clientModules: [
    require.resolve('./src/clientModules/diagramZoom.ts'),
    require.resolve('./src/clientModules/goatcounter.ts'),
  ],

  // GoatCounter: production only so local `npm start` does not inflate page counts
  scripts: isDev
    ? []
    : [
        {
          src: 'https://gc.zgo.at/count.js',
          async: true,
          'data-goatcounter': 'https://jitendersharma.goatcounter.com/count',
        },
      ],

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
            createFeedItems,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          routeBasePath: 'insights',
          postsPerPage: 10,
          sortPosts: 'descending',
          rehypePlugins: [rehypeWrapTables],
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
        redirects: [
          {
            from: '/playbooks/pgar-runtime/domain/memory',
            to: '/playbooks/agents/orchestration/memory',
          },
          {
            from: '/playbooks/pgar-runtime/domain/manifest-registry',
            to: '/playbooks/agents/manifests/manifest-registry',
          },
          {
            from: '/playbooks/pgar-runtime/domain/tool-registry',
            to: '/playbooks/agents/manifests/manifest-registry',
          },
          {
            from: '/playbooks/pgar-runtime/domain/manifest-lifecycle',
            to: '/playbooks/agents/manifests/manifest-lifecycle',
          },
          {
            from: '/playbooks/pgar-runtime/domain/rag-retrieval',
            to: '/playbooks/rag/retrieval',
          },
          {
            from: '/playbooks/mcp/manifest-registry',
            to: '/playbooks/agents/manifests/manifest-registry',
          },
          {
            from: '/playbooks/mcp/manifest-lifecycle',
            to: '/playbooks/agents/manifests/manifest-lifecycle',
          },
          {
            from: '/playbooks/mcp/tool-registry',
            to: '/playbooks/agents/manifests/manifest-registry',
          },
          {
            from: '/blueprints/governance-operating-blueprint',
            to: '/blueprints/governance/operating',
          },
          {
            from: '/blueprints/governance-runtime-blueprint',
            to: '/blueprints/governance/runtime',
          },
        ],
        createRedirects(existingPath) {
          const froms: string[] = [];
          if (existingPath.startsWith('/insights')) {
            froms.push(existingPath.replace(/^\/insights/, '/blogs'));
          }
          if (existingPath.startsWith('/playbooks/evaluation')) {
            froms.push(
              existingPath.replace(
                '/playbooks/evaluation',
                '/playbooks/eval-engineering',
              ),
            );
          }
          if (existingPath === '/playbooks/governance/runtime') {
            froms.push('/playbooks/pgar-runtime');
          } else if (existingPath.startsWith('/playbooks/governance/runtime/')) {
            const rest = existingPath.slice(
              '/playbooks/governance/runtime'.length,
            );
            froms.push(`/playbooks/governance${rest}`);
            froms.push(`/playbooks/pgar-runtime${rest}`);
          }
          if (existingPath.startsWith('/playbooks/agents')) {
            froms.push(
              existingPath.replace('/playbooks/agents', '/playbooks/router'),
            );
            if (existingPath.startsWith('/playbooks/agents/intent-router')) {
              froms.push(
                existingPath.replace(
                  '/playbooks/agents/intent-router',
                  '/playbooks/intent-router',
                ),
              );
            }
          }
          if (existingPath === '/playbooks/llm') {
            froms.push('/playbooks/router/model-routing');
          } else if (existingPath.startsWith('/playbooks/llm/')) {
            froms.push(
              existingPath.replace(
                '/playbooks/llm/',
                '/playbooks/router/model-routing/',
              ),
            );
          }
          if (existingPath === '/blueprints/evaluation-blueprint') {
            froms.push('/blueprints/eval-blueprint');
          }
          if (existingPath === '/blueprints/governance/runtime') {
            froms.push('/blueprints/governance-blueprint');
            froms.push('/blueprints/pgar-blueprint');
          }
          if (existingPath === '/blueprints/agents-blueprint') {
            froms.push('/blueprints/autonomy-blueprint');
            froms.push('/blueprints/router-blueprint');
          }
          return froms.length > 0 ? froms : undefined;
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'frameworks',
        path: 'docs/frameworks',
        routeBasePath: 'frameworks',
        rehypePlugins: [rehypeWrapTables],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'blueprints',
        path: 'docs/blueprints',
        routeBasePath: 'blueprints',
        sidebarPath: './sidebarsBlueprints.ts',
        rehypePlugins: [rehypeWrapTables],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'playbooks',
        path: 'docs/playbooks',
        routeBasePath: 'playbooks',
        sidebarPath: './sidebarsPlaybooks.ts',
        rehypePlugins: [rehypeWrapTables],
      },
    ],
    ...(isDev
      ? [
          [
            '@docusaurus/plugin-content-docs',
            {
              id: 'intent',
              path: 'docs/intent',
              routeBasePath: 'intent',
              rehypePlugins: [rehypeWrapTables],
            },
          ],
        ]
      : []),
    [
      'posthog-docusaurus',
      {
        // Automatically grabs the key from your local .env file when building
        apiKey: process.env.POSTHOG_KEY || '',
        appUrl: 'https://us.i.posthog.com',
        enableInDevelopment: false,
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
        docsRouteBasePath: [
          'frameworks',
          'blueprints',
          'playbooks',
          ...(isDev ? ['intent'] : []),
        ],
        docsPluginIdForPreferredVersion: 'frameworks',
        blogRouteBasePath: ['insights'],
        blogDir: ['docs/insights'],
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
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'blueprints',
          position: 'left',
          label: 'Blueprints',
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'playbooks',
          position: 'left',
          label: 'Playbooks',
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
          items: getFooterFrameworkLinks(),
        },
        {
          title: 'Explore',
          items: [
            {label: 'Blueprints', to: '/blueprints'},
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
