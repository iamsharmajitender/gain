import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {SitemapSection} from '@site/src/data/sitemap';
import styles from './sitemapSection.module.css';

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
      <ul className={styles.linkGrid}>
        {section.links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <Link to={link.href} className={styles.linkCard}>
                {link.label}
              </Link>
            ) : (
              <span className={clsx(styles.linkCard, styles.draftLink)}>
                {link.label}
                {link.draft && <span className={styles.draftBadge}>Draft</span>}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
