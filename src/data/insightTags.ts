export type TagGroupId = 'domain' | 'type' | 'framework' | 'topic';

export interface TagNavItem {
  id: string;
  label: string;
  to: string;
}

export interface TagGroup {
  id: TagGroupId;
  heading: string;
  tags: TagNavItem[];
}

/** Content-type tags shown as badges on insight cards. */
export const TYPE_TAG_IDS = ['pov', 'arch', 'lrn', 'exp'] as const;
export type TypeTagId = (typeof TYPE_TAG_IDS)[number];

export const TYPE_TAG_LABELS: Record<TypeTagId, string> = {
  pov: 'POV',
  arch: 'ARC',
  lrn: 'LRN',
  exp: 'EXP',
};

export const TYPE_TAG_COLORS: Record<TypeTagId, string> = {
  pov: 'purple',
  arch: 'blue',
  lrn: 'green',
  exp: 'orange',
};

function tagTo(id: string): string {
  return `/insights/tags/${id}`;
}

export const INSIGHT_TAG_GROUPS: TagGroup[] = [
  {
    id: 'domain',
    heading: 'Domain',
    tags: [
      {id: 'system-architecture', label: 'Strategy & Architecture', to: tagTo('system-architecture')},
      {id: 'platforms-engineering', label: 'Platforms & Engineering', to: tagTo('platforms-engineering')},
      {id: 'ai-intelligence', label: 'AI & Intelligence', to: tagTo('ai-intelligence')},
      {id: 'governance-trust', label: 'Governance & Trust', to: tagTo('governance-trust')},
    ],
  },
  {
    id: 'type',
    heading: 'Type',
    tags: [
      {id: 'all', label: 'All', to: '/insights'},
      {id: 'pov', label: 'POV', to: tagTo('pov')},
      {id: 'arch', label: 'ARC', to: tagTo('arch')},
      {id: 'lrn', label: 'LRN', to: tagTo('lrn')},
      {id: 'exp', label: 'EXP', to: tagTo('exp')},
    ],
  },
  {
    id: 'framework',
    heading: 'Framework',
    tags: [{id: 'gain', label: 'G.A.I.N', to: tagTo('gain')}],
  },
  {
    id: 'topic',
    heading: 'Topic',
    tags: [
      {id: 'agents', label: 'Agents', to: tagTo('agents')},
      {id: 'observability', label: 'Observability', to: tagTo('observability')},
      {id: 'policy', label: 'Policy', to: tagTo('policy')},
      {id: 'llm', label: 'LLM', to: tagTo('llm')},
      {id: 'rag', label: 'RAG', to: tagTo('rag')},
      {id: 'hallucinations', label: 'Hallucinations', to: tagTo('hallucinations')},
      {id: 'compliance', label: 'Compliance', to: tagTo('compliance')},
    ],
  },
];

export function findTypeTag(tagIds: string[]): TypeTagId | undefined {
  return TYPE_TAG_IDS.find((id) => tagIds.includes(id));
}
