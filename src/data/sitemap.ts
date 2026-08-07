import {
  FRAMEWORK_SITEMAP_ITEMS,
  frameworkHref,
  insightTagHref,
  insightTypeTagHref,
} from '@site/src/data/publishedRoutes';
import {draftInsightPages} from '@site/src/data/draftInsights.generated';
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
  href?: string;
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
      {label: 'Router Blueprint', href: '/blueprints/router-blueprint'},
      {label: 'Eval Blueprint', href: '/blueprints/eval-blueprint'},
      {label: 'Observability Blueprint', href: '/blueprints/observability-blueprint'},
      {label: 'PGAR Blueprint', href: '/blueprints/pgar-blueprint'},
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
      {label: 'Router', href: '/playbooks/router'},
      {label: 'Intent router (Plane ①)', href: '/playbooks/router/intent-router'},
      {label: 'Eval Engineering', href: '/playbooks/eval-engineering'},
      {label: 'PGAR Runtime', href: '/playbooks/pgar-runtime'},
      {label: 'Unified Observability', href: '/playbooks/observability'},
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
    id: 'about',
    title: 'About',
    question: 'Who builds this handbook',
    description:
      'Who builds this handbook, what they work on, career background, and credentials.',
    href: '/about',
    links: [
      {label: 'About', href: '/about'},
      {label: 'Work', href: '/about?tab=work'},
      {label: 'Background', href: '/about?tab=background'},
      {label: 'Credentials', href: '/about?tab=credentials'},
    ],
  },
  {
    id: 'advisory',
    title: 'Advisory',
    question: 'How to engage for architecture and governed AI',
    description:
      'Advisory services for enterprise architecture, platform modernization, and governed AI.',
    href: '/advisory',
    links: [
      {label: 'Advisory', href: '/advisory'},
      {label: 'Approach', href: '/advisory?tab=approach'},
      {label: 'Case Studies', href: '/advisory?tab=case-studies'},
      {label: 'Engagement', href: '/advisory?tab=engagement'},
      {label: 'Contact', href: '/advisory?tab=contact'},
    ],
  },
];

function draftLinksFromSection(section: SitemapSection): SitemapLink[] {
  const fromLinks = section.links.filter((link) => link.draft);
  const fromGroups =
    section.linkGroups?.flatMap((group) => group.links.filter((link) => link.draft)) ?? [];
  return [...fromLinks, ...fromGroups];
}

function formatDraftDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00.000Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function insightDraftLinks(): SitemapLink[] {
  return draftInsightPages.map((page) => ({
    label: page.title,
    description: formatDraftDate(page.date),
    draft: true,
    ...(page.href ? {href: page.href} : {}),
  }));
}

/** Aggregated drafts across handbook sections for the Sitemap Drafts tab. */
export function getDraftsSitemapSection(): SitemapSection {
  const linkGroups: SitemapLinkGroup[] = [];

  for (const section of handbookSections) {
    if (section.id === 'insights') {
      continue;
    }

    const links = draftLinksFromSection(section);
    if (links.length === 0) {
      continue;
    }

    linkGroups.push({
      heading: section.title,
      description: section.question,
      links,
    });
  }

  const insights = insightDraftLinks();
  if (insights.length > 0) {
    linkGroups.push({
      heading: 'Insights',
      description:
        'Articles with draft: true in frontmatter. Links work in local preview; production lists titles only until publish.',
      links: insights,
    });
  }

  return {
    id: 'drafts',
    title: 'Drafts',
    question: 'Work in progress across the handbook',
    description:
      'Insight articles with draft: true, plus any handbook entries not yet published. Insight links work under local preview; production lists titles only until publish.',
    links: [],
    linkGroups,
  };
}

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
  return `/sitemap?tab=${sectionId}`;
}
