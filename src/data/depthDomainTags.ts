import type {TagGroup} from '@site/src/data/insightTags';

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

function depthTagTo(basePath: DepthAssetBasePath, id: string): string {
  return `${basePath}/tags/${id}`;
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

export function findDomainTag(tagIds: string[]): DomainTagId | undefined {
  return DOMAIN_TAG_IDS.find((id) => tagIds.includes(id));
}
