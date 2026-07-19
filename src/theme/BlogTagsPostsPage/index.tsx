import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useBlogTagsPostsPageTitle} from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogTagsPostsPage';
import BlogPostItems from '@theme/BlogPostItems';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import ContextualBackLink from '@site/src/components/ContextualBackLink';
import {backToInsights} from '@site/src/data/contextualBackLinks';
import InsightsTagsNav from '@site/src/components/InsightsTagsNav';
import InsightsBlogPaginator from '@site/src/components/InsightsBlogPaginator';

const TAG_SOCIAL_IMAGES: Record<string, string> = {
  '/insights/tags/under-the-hood': 'img/insights/under-the-hood-social.png',
};

function BlogTagsPostsPageMetadata({tag}: Props): ReactNode {
  const title = useBlogTagsPostsPageTitle(tag);
  const image = TAG_SOCIAL_IMAGES[tag.permalink];

  return (
    <>
      <PageMetadata title={title} description={tag.description} image={image} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function BlogTagsPostsPageContent({
  tag,
  items,
  sidebar,
  listMetadata,
}: Props): ReactNode {
  return (
    <BlogLayout sidebar={sidebar}>
      {tag.unlisted && <Unlisted />}
      <ContextualBackLink {...backToInsights} />
      <div className="gain-doc-header gain-insights-header">
        <h1 className="gain-doc-title">{tag.label}</h1>
        {tag.description && (
          <div className="gain-doc-subtitle">{tag.description}</div>
        )}
      </div>
      <InsightsTagsNav />
      <div className="gain-insights-list">
        <BlogPostItems items={items} />
      </div>
      <InsightsBlogPaginator metadata={listMetadata} />
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
