import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {INSIGHT_TAG_GROUPS, type TagGroupId} from '@site/src/data/insightTags';
import {
  publishedInsightTypeTags,
  publishedInsightSeriesTags,
} from '@site/src/data/publishedRoutes.generated';

const publishedTypeTagSet = new Set(publishedInsightTypeTags);
const publishedSeriesTagSet = new Set(publishedInsightSeriesTags);

function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname === `${to}/`;
}

function TagGroupRow({
  heading,
  groupId,
  tags,
}: {
  heading: string;
  groupId: TagGroupId;
  tags: (typeof INSIGHT_TAG_GROUPS)[number]['tags'];
}): ReactNode {
  const {pathname} = useLocation();

  return (
    <div className={clsx('gain-insights-tags-row', `gain-insights-tags-row--${groupId}`)}>
      <span className="gain-insights-tags-row__label">{heading}</span>
      <nav className="gain-insights-tags" aria-label={`Filter insights by ${heading.toLowerCase()}`}>
        {tags.map((tag) => (
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
  );
}

const typeTagGroup = INSIGHT_TAG_GROUPS.find((group) => group.id === 'type');
const seriesTagGroup = INSIGHT_TAG_GROUPS.find((group) => group.id === 'series');

export default function InsightsTagsNav(): ReactNode {
  if (!typeTagGroup) {
    return null;
  }

  const visibleTypeTags = typeTagGroup.tags.filter(
    (tag) => tag.id === 'all' || publishedTypeTagSet.has(tag.id),
  );

  const visibleSeriesTags = seriesTagGroup
    ? seriesTagGroup.tags.filter((tag) => publishedSeriesTagSet.has(tag.id))
    : [];

  return (
    <div className="gain-insights-tags-nav">
      <TagGroupRow
        heading={typeTagGroup.heading}
        groupId={typeTagGroup.id}
        tags={visibleTypeTags}
      />
      {seriesTagGroup && visibleSeriesTags.length > 0 && (
        <TagGroupRow
          heading={seriesTagGroup.heading}
          groupId={seriesTagGroup.id}
          tags={visibleSeriesTags}
        />
      )}
    </div>
  );
}
