import {publishedFrameworkSlugs} from './src/data/publishedRoutes.generated';

const FRAMEWORK_FOOTER_ITEMS = [
  {label: 'LLM', slug: 'gain-llm'},
  {label: 'RAG', slug: 'gain-rag'},
  {label: 'Agents', slug: 'gain-agents'},
  {label: 'MCP', slug: 'gain-mcp'},
  {label: 'Observability', slug: 'gain-observability'},
  {label: 'Evaluation', slug: 'gain-evaluation'},
  {label: 'Identity', slug: 'gain-identity'},
] as const;

const publishedSlugs = new Set(publishedFrameworkSlugs);

export function getFooterFrameworkLinks(): {label: string; to: string}[] {
  const items: {label: string; to: string}[] = [{label: 'AIOM', to: '/frameworks'}];

  for (const item of FRAMEWORK_FOOTER_ITEMS) {
    if (publishedSlugs.has(item.slug)) {
      items.push({label: item.label, to: `/frameworks/${item.slug}`});
    }
  }

  return items;
}
