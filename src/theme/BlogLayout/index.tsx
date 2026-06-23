import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import type {Props} from '@theme/BlogLayout';

export default function BlogLayout(props: Props): ReactNode {
  const {toc, children, ...layoutProps} = props;

  return (
    <Layout {...layoutProps}>
      <div className="gain-insights-page">
        <div
          className={clsx('gain-insights-page__inner', {
            'gain-insights-page__inner--with-toc': Boolean(toc),
          })}>
          <main className="gain-insights-page__main">{children}</main>
          {toc && <aside className="gain-insights-page__toc">{toc}</aside>}
        </div>
      </div>
    </Layout>
  );
}
