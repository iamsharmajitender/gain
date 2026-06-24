import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import type {BlogPost} from '@docusaurus/plugin-content-blog';
import {
  DOMAIN_TAG_IDS,
  getDepthDomainTagGroup,
  type DepthAssetBasePath,
} from '@site/src/data/depthDomainTags';

function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname === `${to}/`;
}

export function collectDomainTagIds(
  items: {content: BlogPost}[],
  extraTagId?: string,
): Set<string> {
  const ids = new Set<string>();
  for (const item of items) {
    for (const tag of item.content.metadata.tags) {
      const id = typeof tag === 'string' ? tag : tag.label;
      if ((DOMAIN_TAG_IDS as readonly string[]).includes(id)) {
        ids.add(id);
      }
    }
  }
  if (extraTagId && (DOMAIN_TAG_IDS as readonly string[]).includes(extraTagId)) {
    ids.add(extraTagId);
  }
  return ids;
}

export default function DepthDomainTagsNav({
  basePath,
  items = [],
  activeTagId,
}: {
  basePath: DepthAssetBasePath;
  items?: {content: BlogPost}[];
  activeTagId?: string;
}): ReactNode {
  const {pathname} = useLocation();
  const {heading, id: groupId, tags} = getDepthDomainTagGroup(basePath);
  const availableIds = collectDomainTagIds(items, activeTagId);
  const visibleTags = tags.filter((tag) => tag.id === 'all' || availableIds.has(tag.id));

  return (
    <div className="gain-insights-tags-nav">
      <div className={clsx('gain-insights-tags-row', `gain-insights-tags-row--${groupId}`)}>
        <span className="gain-insights-tags-row__label">{heading}</span>
        <nav className="gain-insights-tags" aria-label={`Filter by ${heading.toLowerCase()}`}>
          {visibleTags.map((tag) => (
            <Link
              key={tag.to}
              to={tag.to}
              className={clsx('gain-insights-tags__link', {
                'gain-insights-tags__link--active': isActive(pathname, tag.to),
              })}>
              {tag.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
