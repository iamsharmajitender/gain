/**
 * GoatCounter SPA support for Docusaurus client-side navigations.
 * Initial full page loads are counted by count.js (onload).
 * Subsequent route changes need an explicit count() call.
 * @see https://www.goatcounter.com/help/spa
 */

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: {path?: string; title?: string}) => void;
      get_data?: () => {p?: string; t?: string};
    };
  }
}

type RouteUpdate = {
  location: {pathname: string; search: string; hash: string};
  previousLocation?: {pathname: string; search: string; hash: string} | null;
};

let lastCountedPath: string | null = null;

function countPath(location: RouteUpdate['location']): void {
  const gc = window.goatcounter;
  if (!gc || typeof gc.count !== 'function') {
    return;
  }

  const path = `${location.pathname}${location.search}${location.hash}`;
  if (path === lastCountedPath) {
    return;
  }
  lastCountedPath = path;

  gc.count({
    path,
    title: document.title,
  });
}

export function onRouteDidUpdate({location, previousLocation}: RouteUpdate): void {
  if (typeof window === 'undefined') {
    return;
  }

  // First render is already counted by count.js onload — skip to avoid doubles.
  if (!previousLocation) {
    lastCountedPath = `${location.pathname}${location.search}${location.hash}`;
    return;
  }

  if (previousLocation.pathname === location.pathname &&
      previousLocation.search === location.search &&
      previousLocation.hash === location.hash) {
    return;
  }

  // count.js may still be loading after a fast navigation
  if (window.goatcounter?.count) {
    countPath(location);
    return;
  }

  const started = Date.now();
  const timer = window.setInterval(() => {
    if (window.goatcounter?.count) {
      window.clearInterval(timer);
      countPath(location);
      return;
    }
    if (Date.now() - started > 5000) {
      window.clearInterval(timer);
    }
  }, 100);
}
