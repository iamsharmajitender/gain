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
import {findDomainTag, DOMAIN_TAG_SHORT_LABELS} from '@site/src/data/playbookTags';
import {isPlaybooksBlog} from '@site/src/utils/isPlaybooksBlog';

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
  const {metadata, assets} = useBlogPost();
  const {title, description, permalink, date, tags} = metadata;
  const imageUrl = assets.image;
  const playbooks = isPlaybooksBlog(permalink);
  const typeTag = findTypeTag(tags);
  const domainTag = findDomainTag(tags);
  const badgeLabel = playbooks
    ? domainTag
      ? DOMAIN_TAG_SHORT_LABELS[domainTag]
      : null
    : typeTag
      ? TYPE_TAG_LABELS[typeTag]
      : null;
  const badgeClass = playbooks ? domainTag : typeTag;

  return (
    <BlogPostItemContainer className={clsx('gain-insight-card', className)}>
      <Link to={permalink} className="gain-insight-card__link">
        <div className="gain-insight-card__thumb">
          {badgeLabel && badgeClass && (
            <span
              className={clsx(
                'gain-insight-card__type',
                playbooks
                  ? `gain-insight-card__domain--${badgeClass}`
                  : `gain-insight-card__type--${badgeClass}`,
              )}>
              {badgeLabel}
            </span>
          )}
          {imageUrl ? (
            <img src={imageUrl} alt="" loading="lazy" />
          ) : (
            <div className="gain-insight-card__thumb-placeholder" aria-hidden />
          )}
        </div>
        <div className="gain-insight-card__body">
          <h2 className="gain-insight-card__title">{title}</h2>
          {description && (
            <p className="gain-insight-card__desc">{description}</p>
          )}
          {!playbooks && (
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
  const playbooks = isPlaybooksBlog(metadata.permalink);

  if (!isBlogPostPage) {
    return <BlogPostItemListView className={className} />;
  }

  if (playbooks) {
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
