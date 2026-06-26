import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import type {ContextualBackLinkConfig} from '@site/src/data/contextualBackLinks';
import ContextualBackLink from '@site/src/components/ContextualBackLink';
import styles from './styles.module.css';

export type SectionNavItem = {
  label: string;
  href: string;
};

type SectionPageLayoutProps = {
  title: string;
  subtitle: string;
  sectionLabel: string;
  navItems?: SectionNavItem[];
  activeHref?: string;
  profileImage?: {src: string; alt: string};
  hideNav?: boolean;
  backLink?: ContextualBackLinkConfig;
  children: ReactNode;
};

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
}

export default function SectionPageLayout({
  title,
  subtitle,
  sectionLabel,
  navItems = [],
  activeHref = '',
  profileImage,
  hideNav = false,
  backLink,
  children,
}: SectionPageLayoutProps): ReactNode {
  const header = (
    <div className={clsx('gain-doc-header', hideNav && 'gain-insights-header')}>
      {backLink ? <ContextualBackLink {...backLink} /> : null}
      <h1 className="gain-doc-title">{title}</h1>
      <div className={clsx('gain-doc-intro', profileImage && styles.docIntroWithPhoto)}>
        {profileImage ? (
          <img
            className="gain-doc-photo"
            src={profileImage.src}
            alt={profileImage.alt}
            width={80}
            height={80}
            loading="eager"
          />
        ) : null}
        <p className="gain-doc-subtitle">{subtitle}</p>
      </div>
    </div>
  );

  const body = <div className={styles.content}>{children}</div>;

  if (hideNav) {
    return (
      <Layout title={title}>
        <div className="gain-insights-page">
          <div className="gain-insights-page__inner">
            <main className="gain-insights-page__main">
              {header}
              {body}
            </main>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={title}>
      <div className={styles.page}>
        <aside className="gain-sidebar">
          <div className="gain-sidebar__label">{sectionLabel}</div>
          <nav className="gain-sidebar__nav">
            {navItems.map((item) => {
              if (item.href.startsWith('#')) {
                const sectionId = item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    type="button"
                    className="gain-sidebar__link"
                    onClick={() => scrollToSection(sectionId)}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    'gain-sidebar__link',
                    activeHref === item.href && 'gain-sidebar__link--active',
                  )}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className={styles.main}>
          {header}
          {body}
        </main>
      </div>
    </Layout>
  );
}
