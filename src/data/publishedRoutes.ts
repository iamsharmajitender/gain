import type {DomainTagId, DepthAssetBasePath} from '@site/src/data/depthDomainTags';
import {
  publishedDepthTags as publishedDepthTagsRaw,
  publishedFrameworkSlugs,
  publishedInsightTags as publishedInsightTagsRaw,
} from './publishedRoutes.generated';

const publishedDepthTags = publishedDepthTagsRaw as Record<
  DepthAssetBasePath,
  readonly DomainTagId[]
>;
const publishedInsightTags = publishedInsightTagsRaw as readonly DomainTagId[];

export type FrameworkNavItem = {
  label: string;
  slug: string;
};

/** Footer / sitemap labels for G.A.I.N domain framework docs (excluding overview). */
export const FRAMEWORK_NAV_ITEMS: FrameworkNavItem[] = [
  {label: 'LLM', slug: 'gain-llm'},
  {label: 'RAG', slug: 'gain-rag'},
  {label: 'Agents', slug: 'gain-agents'},
  {label: 'MCP', slug: 'gain-mcp'},
  {label: 'Observability', slug: 'gain-observability'},
  {label: 'Evaluation', slug: 'gain-evaluation'},
  {label: 'Identity', slug: 'gain-identity'},
];

/** Sitemap labels include AIOM and Prompt. */
export const FRAMEWORK_SITEMAP_ITEMS: FrameworkNavItem[] = [
  {label: 'G.A.I.N AIOM', slug: 'gain-aiom'},
  ...FRAMEWORK_NAV_ITEMS.map((item) => ({
    label: `G.A.I.N ${item.label}`,
    slug: item.slug,
  })),
  {label: 'G.A.I.N Prompt', slug: 'gain-prompt'},
];

const publishedFrameworkSlugSet = new Set(publishedFrameworkSlugs);

export function isFrameworkSlugPublished(slug: string): boolean {
  return publishedFrameworkSlugSet.has(slug);
}

export function frameworkPath(slug: string): string {
  return `/frameworks/${slug}`;
}

export function frameworkHref(slug: string): string | undefined {
  return isFrameworkSlugPublished(slug) ? frameworkPath(slug) : undefined;
}

export function getPublishedFrameworkFooterItems(): {label: string; to: string}[] {
  return FRAMEWORK_NAV_ITEMS.filter((item) => isFrameworkSlugPublished(item.slug)).map(
    (item) => ({
      label: item.label,
      to: frameworkPath(item.slug),
    }),
  );
}

export function isDepthTagPublished(
  basePath: DepthAssetBasePath,
  tagId: DomainTagId,
): boolean {
  return publishedDepthTags[basePath].includes(tagId);
}

/** Tag page when published posts exist; otherwise the section index. */
export function depthTagHref(basePath: DepthAssetBasePath, tagId: DomainTagId): string {
  return isDepthTagPublished(basePath, tagId) ? `${basePath}/tags/${tagId}` : basePath;
}

export function insightTagHref(tagId: DomainTagId): string {
  return publishedInsightTags.includes(tagId) ? `/insights/tags/${tagId}` : '/insights';
}
