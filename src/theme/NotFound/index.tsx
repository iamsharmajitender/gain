import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';

export default function NotFound(): ReactNode {
  return (
    <>
      <PageMetadata
        title="404 — Page Not Found"
        description="Our AI agent is still searching the vector store for this page."
      />
      <Layout>
        <NotFoundContent />
      </Layout>
    </>
  );
}
