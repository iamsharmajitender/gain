import {useEffect, useState, type ReactNode} from 'react';
import styles from './styles.module.css';

const GOATCOUNTER_CODE = 'jitendersharma';

type ViewCounterProps = {
  /** Optional path override. Defaults to the current browser pathname. */
  pageSlug?: string;
};

/**
 * Public GoatCounter pageview count for the current (or given) path.
 * Tracking script is loaded from docusaurus.config.ts on production builds.
 */
export default function ViewCounter({pageSlug}: ViewCounterProps): ReactNode {
  const [views, setViews] = useState<string | null>(null);

  useEffect(() => {
    const rawPath = pageSlug || window.location.pathname;
    const cleanPath = rawPath.replace(/\/$/, '') || '/';
    const url = `https://${GOATCOUNTER_CODE}.goatcounter.com/counter/${encodeURIComponent(cleanPath)}.json`;

    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GoatCounter ${res.status}`);
        }
        return res.json() as Promise<{count?: string}>;
      })
      .then((data) => {
        if (!cancelled) {
          setViews(data.count ?? '0');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setViews(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pageSlug]);

  if (views === null) {
    return null;
  }

  return (
    <span className={styles.counter} aria-label={`${views} page views`}>
      {views} views
    </span>
  );
}
