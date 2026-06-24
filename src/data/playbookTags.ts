import type {TagGroup} from '@site/src/data/insightTags';

export const DOMAIN_TAG_IDS = [
  'system-architecture',
  'platforms-engineering',
  'ai-intelligence',
  'governance-trust',
] as const;

export type DomainTagId = (typeof DOMAIN_TAG_IDS)[number];

export const DOMAIN_TAG_LABELS: Record<DomainTagId, string> = {
  'system-architecture': 'Strategy & Architecture',
  'platforms-engineering': 'Platforms & Engineering',
  'ai-intelligence': 'AI & Intelligence',
  'governance-trust': 'Governance & Trust',
};

/** Short badge labels for playbook cards (parallel to insight voice badges). */
export const DOMAIN_TAG_SHORT_LABELS: Record<DomainTagId, string> = {
  'system-architecture': 'STA',
  'platforms-engineering': 'PLT',
  'ai-intelligence': 'AI',
  'governance-trust': 'GOV',
};

function playbookTagTo(id: string): string {
  return `/playbooks/tags/${id}`;
}

export const PLAYBOOK_TAG_GROUP: TagGroup = {
  id: 'domain',
  heading: 'Domain',
  tags: [
    {id: 'all', label: 'All', to: '/playbooks'},
    {id: 'system-architecture', label: DOMAIN_TAG_LABELS['system-architecture'], to: playbookTagTo('system-architecture')},
    {id: 'platforms-engineering', label: DOMAIN_TAG_LABELS['platforms-engineering'], to: playbookTagTo('platforms-engineering')},
    {id: 'ai-intelligence', label: DOMAIN_TAG_LABELS['ai-intelligence'], to: playbookTagTo('ai-intelligence')},
    {id: 'governance-trust', label: DOMAIN_TAG_LABELS['governance-trust'], to: playbookTagTo('governance-trust')},
  ],
};

export function findDomainTag(tagIds: string[]): DomainTagId | undefined {
  return DOMAIN_TAG_IDS.find((id) => tagIds.includes(id));
}
