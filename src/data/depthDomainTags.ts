import type {TagGroup} from '@site/src/data/insightTags';
import {depthTagHref} from '@site/src/data/publishedRoutes';

export const DOMAIN_TAG_IDS = [
  'system-architecture',
  'platforms-engineering',
  'ai-intelligence',
  'governance-trust',
] as const;

export type DomainTagId = (typeof DOMAIN_TAG_IDS)[number];

export type DepthAssetBasePath = '/playbooks' | '/architecture' | '/blueprints';

export const DOMAIN_TAG_LABELS: Record<DomainTagId, string> = {
  'system-architecture': 'Strategy & Architecture',
  'platforms-engineering': 'Platforms & Engineering',
  'ai-intelligence': 'AI & Intelligence',
  'governance-trust': 'Governance & Trust',
};

export const DOMAIN_TAG_SHORT_LABELS: Record<DomainTagId, string> = {
  'system-architecture': 'STA',
  'platforms-engineering': 'PLT',
  'ai-intelligence': 'AI',
  'governance-trust': 'GOV',
};

function depthTagTo(basePath: DepthAssetBasePath, id: DomainTagId): string {
  return depthTagHref(basePath, id);
}

export function getDepthDomainTagGroup(basePath: DepthAssetBasePath): TagGroup {
  return {
    id: 'domain',
    heading: 'Domain',
    tags: [
      {id: 'all', label: 'All', to: basePath},
      {
        id: 'system-architecture',
        label: DOMAIN_TAG_LABELS['system-architecture'],
        to: depthTagTo(basePath, 'system-architecture'),
      },
      {
        id: 'platforms-engineering',
        label: DOMAIN_TAG_LABELS['platforms-engineering'],
        to: depthTagTo(basePath, 'platforms-engineering'),
      },
      {
        id: 'ai-intelligence',
        label: DOMAIN_TAG_LABELS['ai-intelligence'],
        to: depthTagTo(basePath, 'ai-intelligence'),
      },
      {
        id: 'governance-trust',
        label: DOMAIN_TAG_LABELS['governance-trust'],
        to: depthTagTo(basePath, 'governance-trust'),
      },
    ],
  };
}

export type BlogTagRef = string | {label: string; permalink: string};

function tagSlug(tag: BlogTagRef): string | undefined {
  if (typeof tag === 'string') {
    return tag.split('/').filter(Boolean).pop();
  }
  return tag.permalink.split('/').filter(Boolean).pop();
}

export function extractDomainTagId(tag: BlogTagRef): DomainTagId | undefined {
  const slug = tagSlug(tag);
  if (slug && (DOMAIN_TAG_IDS as readonly string[]).includes(slug)) {
    return slug as DomainTagId;
  }

  if (typeof tag !== 'string' && (DOMAIN_TAG_IDS as readonly string[]).includes(tag.label)) {
    return tag.label as DomainTagId;
  }

  if (typeof tag !== 'string') {
    const byLabel = (Object.entries(DOMAIN_TAG_LABELS) as [DomainTagId, string][]).find(
      ([, label]) => label === tag.label,
    );
    return byLabel?.[0];
  }

  return undefined;
}

export function findDomainTag(tags: readonly BlogTagRef[]): DomainTagId | undefined {
  for (const tag of tags) {
    const id = extractDomainTagId(tag);
    if (id) {
      return id;
    }
  }
  return undefined;
}
