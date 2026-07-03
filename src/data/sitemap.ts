import {
  FRAMEWORK_SITEMAP_ITEMS,
  frameworkHref,
  insightTagHref,
  insightTypeTagHref,
} from '@site/src/data/publishedRoutes';
import type {DomainTagId} from '@site/src/data/depthDomainTags';
import {DOMAIN_TAG_LABELS} from '@site/src/data/depthDomainTags';
import {
  TYPE_TAG_DESCRIPTIONS,
  TYPE_TAG_FULL_LABELS,
  TYPE_TAG_IDS,
  type TypeTagId,
} from '@site/src/data/insightTags';

export type SitemapLink = {
  label: string;
  href?: string;
  draft?: boolean;
  description?: string;
};

export type SitemapLinkGroup = {
  heading: string;
  description?: string;
  links: SitemapLink[];
};

export type SitemapSection = {
  id: string;
  title: string;
  question: string;
  description: string;
  href: string;
  links: SitemapLink[];
  featuredLink?: SitemapLink;
  linkGroups?: SitemapLinkGroup[];
};

function frameworkSitemapLinks(): SitemapLink[] {
  return [
    {label: 'Overview', href: '/frameworks'},
    ...FRAMEWORK_SITEMAP_ITEMS.map((item) => {
      const href = frameworkHref(item.slug);
      return href ? {label: item.label, href} : {label: item.label, draft: true};
    }),
  ];
}

const INSIGHT_DOMAIN_TAGS: DomainTagId[] = [
  'system-architecture',
  'ai-intelligence',
  'platforms-engineering',
  'governance-trust',
];

function insightDomainSitemapLinks(): SitemapLink[] {
  return INSIGHT_DOMAIN_TAGS.map((tagId) => ({
    label: DOMAIN_TAG_LABELS[tagId],
    href: insightTagHref(tagId),
  }));
}

function insightToneSitemapLinks(): SitemapLink[] {
  return TYPE_TAG_IDS.map((tagId: TypeTagId) => {
    const href = insightTypeTagHref(tagId);
    return {
      label: TYPE_TAG_FULL_LABELS[tagId],
      description: TYPE_TAG_DESCRIPTIONS[tagId],
      ...(href ? {href} : {draft: true}),
    };
  });
}

export const handbookSections: SitemapSection[] = [
  {
    id: 'frameworks',
    title: 'G.A.I.N Framework',
    question: 'Why governed AI works this way: principles, patterns, team boundaries',
    description:
      'Governed AI-Native Systems: principles, capability patterns, and team boundaries. The operating model for enterprise AI: grounded context, adaptive learning, intelligent reasoning, and native scalable design.',
    href: '/frameworks',
    links: frameworkSitemapLinks(),
  },
  {
    id: 'blueprints',
    title: 'Blueprints',
    question: 'Reference designs: full operating models for a capability',
    description:
      'End-to-end reference architectures — how a capability fits together before you open the playbooks.',
    href: '/blueprints',
    links: [
      {label: 'Overview', href: '/blueprints'},
      {label: 'Router Blueprint', href: '/blueprints/router-blueprint', draft: true},
      {label: 'Eval Blueprint', href: '/blueprints/eval-blueprint', draft: true},
      {label: 'PGAR Blueprint', href: '/blueprints/pgar-blueprint', draft: true},
    ],
  },
  {
    id: 'playbooks',
    title: 'Playbooks',
    question: 'Operational guides: gates, schemas, and plane recipes',
    description:
      'Implementation playbooks paired with blueprints — eval engineering, golden datasets, plane evals, and more.',
    href: '/playbooks',
    links: [
      {label: 'Overview', href: '/playbooks'},
      {label: 'Intent Router (Plane ①)', href: '/playbooks/intent-router', draft: true},
      {label: 'Eval Engineering', href: '/playbooks/eval-engineering/golden-datasets', draft: true},
      {label: 'PGAR Runtime', href: '/playbooks/pgar-runtime', draft: true},
    ],
  },
  {
    id: 'insights',
    title: 'Insights',
    question: 'Narrative thinking: essays and field lessons',
    description:
      'Essays, architecture breakdowns, and leadership perspectives on enterprise AI, platforms, and transformation. Published thinking rather than reference documentation.',
    href: '/insights',
    links: [],
    featuredLink: {
      label: 'All insights',
      href: '/insights',
      description: 'Every published essay, architecture breakdown, and field lesson.',
    },
    linkGroups: [
      {
        heading: 'Domain',
        description: 'Core domain pillars — shared across blueprints, architecture, and playbooks.',
        links: insightDomainSitemapLinks(),
      },
      {
        heading: 'Tone & Voice',
        description: 'Content-type tags — one per insight article.',
        links: insightToneSitemapLinks(),
      },
    ],
  },
];

export const siteSections: SitemapSection[] = [
  {
    id: 'site',
    title: 'About & Advisory',
    question: 'Who builds this and how to engage',
    description:
      'Background on philosophy, leadership approach, and industries, plus advisory services for enterprise architecture, platform modernization, and governed AI.',
    href: '/about',
    links: [
      {label: 'About', href: '/about'},
      {label: 'How I Lead', href: '/about?tab=how-i-lead'},
      {label: 'What I Build', href: '/about?tab=what-i-build'},
      {label: 'Industries', href: '/about?tab=industries'},
      {label: 'Background', href: '/about?tab=background'},
      {label: 'Credentials', href: '/about?tab=credentials'},
      {label: 'Why This Exists', href: '/about?tab=why-this-exists'},
      {label: 'Advisory', href: '/advisory'},
      {label: 'Approach', href: '/advisory?tab=approach'},
      {label: 'Contact', href: '/advisory?tab=contact'},
    ],
  },
];

export function getHandbookSection(id: string): SitemapSection {
  const section = handbookSections.find((item) => item.id === id);
  if (!section) {
    throw new Error(`Unknown handbook section: ${id}`);
  }
  return section;
}

export function getSiteSection(id: string): SitemapSection {
  const section = siteSections.find((item) => item.id === id);
  if (!section) {
    throw new Error(`Unknown site section: ${id}`);
  }
  return section;
}

export function sitemapPageHref(sectionId: string): string {
  if (sectionId === 'site') {
    return '/sitemap?tab=site';
  }
  return `/sitemap?tab=${sectionId}`;
}
