import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {advisoryNav, advisorySubtitle} from '@site/src/data/sectionNav';
import styles from './advisory.module.css';

export default function AdvisoryContact(): ReactNode {
  return (
    <SectionPageLayout
      title="Advisory"
      subtitle={advisorySubtitle}
      sectionLabel="Advisory"
      navItems={advisoryNav}
      activeHref="/advisory/contact"
    >
      <h2>Contact</h2>
      <p>
        Interested in advisory work or discussing Principal / Enterprise Architect opportunities?
        Reach out to share your context.
      </p>
      <p>
        Email:{' '}
        <a href="mailto:jitender.sharma@outlook.com" className={styles.emailLink}>
          jitender.sharma@outlook.com
        </a>
      </p>
      <a
        href="https://linkedin.com/in/iamsharmajitender"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ctaButton}
      >
        Connect on LinkedIn
      </a>
    </SectionPageLayout>
  );
}
