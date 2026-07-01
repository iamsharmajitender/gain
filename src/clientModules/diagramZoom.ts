import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const ENHANCED_ATTR = 'data-gain-zoom-enhanced';
const MERMAID_SELECTOR =
  '.theme-doc-markdown .mermaid, .markdown .mermaid, .gain-mermaid .mermaid';

type ZoomPayload = {kind: 'svg'; node: SVGSVGElement};

let overlay: HTMLElement | null = null;
let canvas: HTMLElement | null = null;
let scale = 1;
let translateX = 0;
let translateY = 0;
let dragging = false;
let dragStartX = 0;
let dragStartY = 0;
let translateStartX = 0;
let translateStartY = 0;
let enhanceScheduled = false;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function applyTransform(): void {
  if (!canvas) {
    return;
  }
  canvas.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetTransform(): void {
  scale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

function adjustScale(delta: number): void {
  scale = clamp(Number((scale + delta).toFixed(2)), 0.5, 4);
  applyTransform();
}

function ensureOverlay(): HTMLElement {
  if (overlay) {
    return overlay;
  }

  overlay = document.createElement('div');
  overlay.className = 'gain-zoom-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="gain-zoom-overlay__backdrop" data-gain-zoom-close></div>
    <div class="gain-zoom-overlay__panel" role="dialog" aria-modal="true" aria-label="Enlarged diagram">
      <div class="gain-zoom-overlay__toolbar">
        <button type="button" class="gain-zoom-overlay__btn" data-gain-zoom-action="out" aria-label="Zoom out">−</button>
        <button type="button" class="gain-zoom-overlay__btn" data-gain-zoom-action="reset" aria-label="Reset zoom">100%</button>
        <button type="button" class="gain-zoom-overlay__btn" data-gain-zoom-action="in" aria-label="Zoom in">+</button>
        <button type="button" class="gain-zoom-overlay__close" data-gain-zoom-close aria-label="Close">×</button>
      </div>
      <div class="gain-zoom-overlay__stage">
        <div class="gain-zoom-overlay__canvas"></div>
      </div>
      <p class="gain-zoom-overlay__hint">Scroll or pinch to zoom · drag to pan · Esc to close</p>
    </div>
  `;

  document.body.appendChild(overlay);
  canvas = overlay.querySelector('.gain-zoom-overlay__canvas');

  overlay.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-gain-zoom-close]')) {
      closeZoom();
      return;
    }
    const action = target.closest('[data-gain-zoom-action]')?.getAttribute(
      'data-gain-zoom-action',
    );
    if (action === 'in') {
      adjustScale(0.25);
    } else if (action === 'out') {
      adjustScale(-0.25);
    } else if (action === 'reset') {
      resetTransform();
    }
  });

  overlay.querySelector('.gain-zoom-overlay__stage')?.addEventListener('wheel', (event) => {
    event.preventDefault();
    adjustScale(event.deltaY < 0 ? 0.15 : -0.15);
  }, {passive: false});

  overlay.querySelector('.gain-zoom-overlay__stage')?.addEventListener('pointerdown', (event) => {
    if (!(event.target as HTMLElement).closest('.gain-zoom-overlay__canvas')) {
      return;
    }
    dragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    translateStartX = translateX;
    translateStartY = translateY;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  });

  overlay.querySelector('.gain-zoom-overlay__stage')?.addEventListener('pointermove', (event) => {
    if (!dragging) {
      return;
    }
    translateX = translateStartX + (event.clientX - dragStartX);
    translateY = translateStartY + (event.clientY - dragStartY);
    applyTransform();
  });

  overlay.querySelector('.gain-zoom-overlay__stage')?.addEventListener('pointerup', () => {
    dragging = false;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay && !overlay.hidden) {
      closeZoom();
    }
  });

  return overlay;
}

function openZoom(payload: ZoomPayload): void {
  const root = ensureOverlay();
  const stageCanvas = root.querySelector('.gain-zoom-overlay__canvas') as HTMLElement;
  canvas = stageCanvas;
  stageCanvas.innerHTML = '';
  resetTransform();

  const clone = payload.node.cloneNode(true) as SVGSVGElement;
  clone.removeAttribute('width');
  clone.removeAttribute('height');
  clone.style.maxWidth = 'none';
  clone.style.height = 'auto';
  stageCanvas.appendChild(clone);

  root.hidden = false;
  document.body.classList.add('gain-zoom-open');
}

function closeZoom(): void {
  if (!overlay) {
    return;
  }
  overlay.hidden = true;
  document.body.classList.remove('gain-zoom-open');
  resetTransform();
}

function isExcluded(node: Element): boolean {
  return Boolean(
    node.closest(
      '.gain-insight-card, .navbar, .footer, .gain-zoom-overlay, .pagination-nav, [data-no-zoom]',
    ),
  );
}

function enhanceMermaid(mermaidEl: HTMLElement): void {
  if (mermaidEl.getAttribute(ENHANCED_ATTR) === 'true') {
    return;
  }
  if (isExcluded(mermaidEl)) {
    return;
  }
  const svg = mermaidEl.querySelector('svg');
  if (!svg) {
    return;
  }

  mermaidEl.setAttribute(ENHANCED_ATTR, 'true');
  mermaidEl.classList.add('gain-zoomable', 'gain-zoomable--mermaid');
  mermaidEl.setAttribute('role', 'button');
  mermaidEl.setAttribute('tabindex', '0');
  mermaidEl.setAttribute('aria-label', 'Enlarge diagram');

  const open = () => openZoom({kind: 'svg', node: svg});
  mermaidEl.addEventListener('click', open);
  mermaidEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
}

function enhanceZoomables(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(MERMAID_SELECTOR).forEach(enhanceMermaid);
}

function scheduleEnhance(): void {
  if (enhanceScheduled) {
    return;
  }
  enhanceScheduled = true;
  requestAnimationFrame(() => {
    enhanceScheduled = false;
    enhanceZoomables();
  });
}

function init(): void {
  scheduleEnhance();

  const observer = new MutationObserver(() => {
    scheduleEnhance();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

const clientModule = {
  onRouteDidUpdate() {
    scheduleEnhance();
  },
};

if (ExecutionEnvironment.canUseDOM) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

export default clientModule;
