import type {DepthAssetBasePath} from '@site/src/data/depthDomainTags';

const DEPTH_ASSET_BASE_PATHS: DepthAssetBasePath[] = [
  '/playbooks',
  '/architecture',
  '/blueprints',
];

export function isDepthAssetBlog(permalink: string): boolean {
  return DEPTH_ASSET_BASE_PATHS.some(
    (basePath) => permalink === basePath || permalink.startsWith(`${basePath}/`),
  );
}

export function getDepthAssetBasePath(permalink: string): DepthAssetBasePath | undefined {
  return DEPTH_ASSET_BASE_PATHS.find(
    (basePath) => permalink === basePath || permalink.startsWith(`${basePath}/`),
  );
}

/** @deprecated Use isDepthAssetBlog */
export function isPlaybooksBlog(permalink: string): boolean {
  return permalink === '/playbooks' || permalink.startsWith('/playbooks/');
}
