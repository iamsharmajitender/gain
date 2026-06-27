import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import clearCacheBeforeStartPlugin from './plugins/clearCacheBeforeStart';
import rehypeWrapTables from './plugins/rehypeWrapTables.mjs';
import {getFooterFrameworkLinks} from './docusaurus.footer';

const config: Config = {
  title: 'Jitender Sharma',
  tagline:
    'Advisor & technical leader · Enterprise architecture, platforms & governed AI',
  favicon: 'img/favicon.ico',

  url: 'https://jitendersharma.dev',
  baseUrl: '/',

  organizationName: 'iamsharmajitender',
  projectName: 'gain',
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
        rehypePlugins: [rehypeWrapTables],
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
