import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {SitemapLink, SitemapLinkGroup, SitemapSection} from '@site/src/data/sitemap';
import styles from './sitemapSection.module.css';

function SitemapLinkCard({
  link,
  featured = false,
}: {
  link: SitemapLink;
  featured?: boolean;
}): ReactNode {
  const text = (
    <div className={styles.linkText}>
      <span className={styles.linkLabel}>{link.label}</span>
      {link.description && <span className={styles.linkDescription}>{link.description}</span>}
    </div>
  );

  const content = (
    <>
      {text}
      {link.draft && <span className={styles.draftBadge}>Draft</span>}
    </>
  );

  const className = clsx(styles.linkCard, featured && styles.featuredLinkCard, !link.href && styles.draftLink);

  if (link.href) {
    return (
      <Link to={link.href} className={className}>
        {content}
      </Link>
    );
  }

  return <span className={className}>{content}</span>;
}

function SitemapLinkGrid({links}: {links: SitemapLink[]}): ReactNode {
  return (
    <ul className={styles.linkGrid}>
      {links.map((link) => (
        <li key={link.label}>
          <SitemapLinkCard link={link} />
        </li>
      ))}
    </ul>
  );
}

function SitemapLinkGroupBlock({group}: {group: SitemapLinkGroup}): ReactNode {
  return (
    <div className={styles.linkGroup}>
      <h3 className={styles.linkGroupHeading}>{group.heading}</h3>
      {group.description && <p className={styles.linkGroupDescription}>{group.description}</p>}
      <SitemapLinkGrid links={group.links} />
    </div>
  );
}

export default function SitemapSectionBlock({
  section,
}: {
  section: SitemapSection;
}): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 id={section.id} className={styles.sectionTitle}>
          {section.title}
        </h2>
        <Link to={section.href} className={styles.sectionLink}>
          Go to section →
        </Link>
      </div>
      <p className={styles.sectionQuestion}>{section.question}</p>
      <p className={styles.sectionDescription}>{section.description}</p>
      {section.featuredLink && (
        <div className={styles.featuredLinkWrap}>
          <SitemapLinkCard link={section.featuredLink} featured />
        </div>
      )}
      {section.links.length > 0 && <SitemapLinkGrid links={section.links} />}
      {section.linkGroups?.map((group) => (
        <SitemapLinkGroupBlock key={group.heading} group={group} />
      ))}
    </section>
  );
}
