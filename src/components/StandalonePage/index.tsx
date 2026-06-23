import type {ReactNode} from 'react';
import Layout from '@theme/Layout';

type StandalonePageProps = {
  title: string;
  description?: string;
  subtitle?: string;
  children: ReactNode;
};

export default function StandalonePage({
  title,
  description,
  subtitle,
  children,
}: StandalonePageProps): ReactNode {
  return (
    <Layout title={title} description={description}>
      <main className="standalone-page">
        <div className="gain-doc-header">
          <h1 className="gain-doc-title">{title}</h1>
          {subtitle && <div className="gain-doc-subtitle">{subtitle}</div>}
        </div>
        <div className="standalone-page__content">{children}</div>
      </main>
    </Layout>
  );
}
