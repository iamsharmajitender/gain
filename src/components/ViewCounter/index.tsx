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

function resolvePath(pageSlug?: string): string {
  if (typeof window !== 'undefined') {
    const tracked = window.goatcounter?.get_data?.()?.p;
    if (tracked) {
      return tracked.replace(/\/$/, '') || '/';
    }
  }

  const rawPath =
    pageSlug || (typeof window !== 'undefined' ? window.location.pathname : '/');
  return rawPath.replace(/\/$/, '') || '/';
}

async function fetchCount(path: string): Promise<string | null> {
  const url = `https://${GOATCOUNTER_CODE}.goatcounter.com/counter/${encodeURIComponent(path)}.json`;
  const res = await fetch(url);
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
 * GoatCounter returns HTTP 404 with `{ count: "0" }` for paths that are not
 * in the dashboard yet — still treat that body as a valid count.
 */
export default function ViewCounter({
  pageSlug,
  className,
  withSpacer = false,
}: ViewCounterProps): ReactNode {
  const [views, setViews] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const path = resolvePath(pageSlug);
      const count = await fetchCount(path);
      if (!cancelled && count !== null) {
        setViews(count);
      }
    };

    void load();

    // Counter API can lag briefly after the first hit; refresh once.
    const retry = window.setTimeout(() => {
      void load();
    }, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(retry);
    };
  }, [pageSlug]);

  if (views === null) {
    return null;
  }

  const label = formatViewsLabel(views);

  return (
    <span className={clsx(styles.counter, className)} aria-label={label}>
      {withSpacer ? ` · ${label}` : label}
    </span>
  );
}
