import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const GOATCOUNTER_CODE = 'jitendersharma';

type ViewCounterProps = {
  /** Optional path override. Defaults to the current browser pathname. */
  pageSlug?: string;
  className?: string;
  /** Prefix with " · " for inline meta lines (date · read time · views). */
  withSpacer?: boolean;
};

function formatViewsLabel(count: string): string {
  const numeric = Number(String(count).replace(/,/g, ''));
  if (!Number.isFinite(numeric)) {
    return `${count} views`;
  }
  return numeric === 1 ? '1 view' : `${count} views`;
}

function parseCount(count: string): number | null {
  const numeric = Number(String(count).replace(/,/g, ''));
  return Number.isFinite(numeric) ? numeric : null;
}

/** Prefer the canonical permalink/pathname — not SPA get_data() which can include search/hash. */
function resolvePath(pageSlug?: string): string {
  const rawPath =
    pageSlug || (typeof window !== 'undefined' ? window.location.pathname : '/');
  return rawPath.replace(/\/$/, '') || '/';
}

async function fetchCount(path: string): Promise<string | null> {
  // Use start=year (not a fixed date): GoatCounter's default JSON URL is often
  // stuck on a stale CDN value, and some fixed start= dates have returned the
  // same count for different paths. Relatives like year/month are correct per path.
  const params = new URLSearchParams({
    start: 'year',
    rnd: String(Date.now()),
  });
  const url = `https://${GOATCOUNTER_CODE}.goatcounter.com/counter/${encodeURIComponent(path)}.json?${params}`;
  const res = await fetch(url, {cache: 'no-store'});
  const data = (await res.json().catch(() => null)) as {count?: string} | null;
  if (data && typeof data.count === 'string') {
    return data.count;
  }
  if (!res.ok) {
    return null;
  }
  return '0';
}

/**
 * Public GoatCounter pageview count for the current (or given) path.
 * Tracking script is loaded from docusaurus.config.ts on production builds.
 *
 * Hidden until the count is at least 1. GoatCounter may cache public counter
 * JSON for up to ~4 hours, so the dashboard can briefly lead the on-page number.
 */
export default function ViewCounter({
  pageSlug,
  className,
  withSpacer = false,
}: ViewCounterProps): ReactNode {
  const [views, setViews] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const path = resolvePath(pageSlug);

    const load = async () => {
      const count = await fetchCount(path);
      if (!cancelled && count !== null) {
        setViews(count);
      }
    };

    void load();

    const retry = window.setTimeout(() => {
      void load();
    }, 4000);

    const onFocus = () => {
      void load();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);

    return () => {
      cancelled = true;
      window.clearTimeout(retry);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [pageSlug]);

  if (views === null) {
    return null;
  }

  const numeric = parseCount(views);
  if (numeric === null || numeric < 1) {
    return null;
  }

  const label = formatViewsLabel(views);

  return (
    <span className={clsx(styles.counter, className)} aria-label={label}>
      {withSpacer ? ` · ${label}` : label}
    </span>
  );
}
