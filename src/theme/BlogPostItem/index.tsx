import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type {Props} from '@theme/BlogPostItem';
import {findTypeTag, TYPE_TAG_LABELS} from '@site/src/data/insightTags';

const DRAFT_THUMBNAIL = '/img/draft.svg';

function formatInsightDate(date: Date | string): string {
  return new Date(date)
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .toUpperCase();
}

function BlogPostItemListView({className}: Pick<Props, 'className'>): ReactNode {
  const {metadata, assets, frontMatter} = useBlogPost();
  const {title, description, permalink, date, tags} = metadata;
  const imageUrl = assets.image;
  const typeTag = findTypeTag(tags);
  const badgeLabel = typeTag ? TYPE_TAG_LABELS[typeTag] : null;
  const badgeClass = typeTag;
  const isDraft = Boolean(frontMatter.draft || frontMatter.wip);
  const thumbSrc = imageUrl ?? (isDraft ? DRAFT_THUMBNAIL : undefined);

  return (
    <BlogPostItemContainer className={clsx('gain-insight-card', className)}>
      <Link to={permalink} className="gain-insight-card__link">
        <div className="gain-insight-card__thumb">
          {badgeLabel && badgeClass && (
            <span
              className={clsx(
                'gain-insight-card__type',
                `gain-insight-card__type--${badgeClass}`,
              )}>
              {badgeLabel}
            </span>
          )}
          {thumbSrc ? (
            <img src={thumbSrc} alt="" loading="lazy" />
          ) : (
            <div className="gain-insight-card__thumb-placeholder" aria-hidden />
          )}
        </div>
        <div className="gain-insight-card__body">
          <h2 className="gain-insight-card__title">{title}</h2>
          {description && (
            <p className="gain-insight-card__desc">{description}</p>
          )}
          <div className="gain-insight-card__meta">
            <time
              className="gain-insight-card__date"
              dateTime={new Date(date).toISOString()}>
              {formatInsightDate(date)}
            </time>
            {isDraft && (
              <span className="gain-insight-card__draft" aria-label="Draft article">
                Draft
              </span>
            )}
          </div>
        </div>
      </Link>
    </BlogPostItemContainer>
  );
}

export default function BlogPostItem({children, className}: Props): ReactNode {
  const {isBlogPostPage} = useBlogPost();

  if (!isBlogPostPage) {
    return <BlogPostItemListView className={className} />;
  }

  return (
    <BlogPostItemContainer className={className}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
