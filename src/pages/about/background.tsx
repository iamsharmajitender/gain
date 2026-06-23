import type {ReactNode} from 'react';
import AboutPageLayout from '@site/src/components/AboutPageLayout';
import {backgroundEntries} from '@site/src/data/aboutProfile';
import styles from './about.module.css';

export default function AboutBackground(): ReactNode {
  return (
    <AboutPageLayout activeHref="/about/background">
      <h2>Background</h2>
      <p className={styles.lead}>
        A condensed arc: 18+ years from software engineering through enterprise architecture in
        regulated banking, aviation, and critical infrastructure. Outcomes and scope matter more
        than title inflation.
      </p>
      <ul className={styles.timeline}>
        {backgroundEntries.map((entry) => (
          <li key={`${entry.period}-${entry.context}`} className={styles.timelineItem}>
            <span className={styles.period}>{entry.period}</span>
            <h3 className={styles.role}>{entry.role}</h3>
            <p className={styles.context}>{entry.context}</p>
            <ul className={styles.highlights}>
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </AboutPageLayout>
  );
}
