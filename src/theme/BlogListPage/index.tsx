import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import InsightsTagsNav from '@site/src/components/InsightsTagsNav';
import DepthDomainTagsNav from '@site/src/components/DepthDomainTagsNav';
import {getDepthAssetBasePath} from '@site/src/utils/depthAssetBlog';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import InsightsBlogPaginator from '@site/src/components/InsightsBlogPaginator';

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const {metadata, items} = props;
  const depthBasePath = getDepthAssetBasePath(metadata.permalink);
  return (
    <BlogLayout>
      <div className="gain-doc-header gain-insights-header">
        <h1 className="gain-doc-title">{metadata.blogTitle}</h1>
        <div className="gain-doc-subtitle">{metadata.blogDescription}</div>
      </div>
      {depthBasePath ? (
        <DepthDomainTagsNav basePath={depthBasePath} />
      ) : (
        <InsightsTagsNav />
      )}
      <div className="gain-insights-list">
        <BlogPostItems items={items} />
      </div>
      <InsightsBlogPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
