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
import {findDomainTag, DOMAIN_TAG_SHORT_LABELS} from '@site/src/data/depthDomainTags';
import {isDepthAssetBlog} from '@site/src/utils/depthAssetBlog';

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
  const depthAsset = isDepthAssetBlog(permalink);
  const typeTag = findTypeTag(tags);
  const domainTag = findDomainTag(tags);
  const badgeLabel = depthAsset
    ? domainTag
      ? DOMAIN_TAG_SHORT_LABELS[domainTag]
      : null
    : typeTag
      ? TYPE_TAG_LABELS[typeTag]
      : null;
  const badgeClass = depthAsset ? domainTag : typeTag;
  const thumbSrc =
    imageUrl ??
    (depthAsset || frontMatter.draft || frontMatter.wip ? DRAFT_THUMBNAIL : undefined);

  return (
    <BlogPostItemContainer className={clsx('gain-insight-card', className)}>
      <Link to={permalink} className="gain-insight-card__link">
        <div className="gain-insight-card__thumb">
          {badgeLabel && badgeClass && (
            <span
              className={clsx(
                'gain-insight-card__type',
                depthAsset
                  ? `gain-insight-card__domain--${badgeClass}`
                  : `gain-insight-card__type--${badgeClass}`,
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
          {!depthAsset && (
            <time
              className="gain-insight-card__date"
              dateTime={new Date(date).toISOString()}>
              {formatInsightDate(date)}
            </time>
          )}
        </div>
      </Link>
    </BlogPostItemContainer>
  );
}

export default function BlogPostItem({children, className}: Props): ReactNode {
  const {isBlogPostPage, metadata} = useBlogPost();
  const depthAsset = isDepthAssetBlog(metadata.permalink);

  if (!isBlogPostPage) {
    return <BlogPostItemListView className={className} />;
  }

  if (depthAsset) {
    return (
      <BlogPostItemContainer className={className}>
        <BlogPostItemContent>{children}</BlogPostItemContent>
      </BlogPostItemContainer>
    );
  }

  return (
    <BlogPostItemContainer className={className}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
