import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import type {BlogPaginatedMetadata} from '@docusaurus/plugin-content-blog';
import styles from './styles.module.css';

function articleSummary(metadata: BlogPaginatedMetadata): string {
  const {page, postsPerPage, totalCount} = metadata;
  if (totalCount === 0) {
    return '0 articles';
  }
  if (totalCount === 1) {
    return '1 article';
  }
  if (totalCount <= postsPerPage) {
    return `${totalCount} articles`;
  }
  const start = (page - 1) * postsPerPage + 1;
  const end = Math.min(page * postsPerPage, totalCount);
  return `Showing ${start}–${end} of ${totalCount} articles`;
}

export default function InsightsBlogPaginator({
  metadata,
}: {
  metadata: BlogPaginatedMetadata;
}): ReactNode {
  const {previousPage, nextPage, page, totalPages} = metadata;
  const hasMultiplePages = totalPages > 1;

  return (
    <footer className={styles.footer}>
      <p className={styles.summary}>{articleSummary(metadata)}</p>
      {hasMultiplePages && (
        <p className={styles.pageIndicator}>
          Page {page} of {totalPages}
        </p>
      )}
      {(previousPage || nextPage) && (
        <nav
          className={clsx('pagination-nav', styles.nav)}
          aria-label="Insights list pagination">
          {previousPage && (
            <PaginatorNavLink
              permalink={previousPage}
              title={
                <Translate
                  id="theme.blog.paginator.newerEntries"
                  description="The label used to navigate to the newer blog posts page (previous page)">
                  Newer entries
                </Translate>
              }
            />
          )}
          {nextPage && (
            <PaginatorNavLink
              permalink={nextPage}
              title={
                <Translate
                  id="theme.blog.paginator.olderEntries"
                  description="The label used to navigate to the older blog posts page (next page)">
                  Older entries
                </Translate>
              }
              isNext
            />
          )}
        </nav>
      )}
    </footer>
  );
}
