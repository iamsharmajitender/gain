import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const ENHANCED_ATTR = 'data-gain-zoom-enhanced';
const MERMAID_SELECTOR = [
  '.theme-doc-markdown .docusaurus-mermaid-container',
  '.markdown .docusaurus-mermaid-container',
  '.gain-mermaid .docusaurus-mermaid-container',
  '.gain-diagram-wrap .docusaurus-mermaid-container',
  // Legacy class (pre–Docusaurus 3 theme-mermaid)
  '.theme-doc-markdown .mermaid',
  '.markdown .mermaid',
  '.gain-mermaid .mermaid',
  '.gain-diagram-wrap .mermaid',
].join(', ');

type ZoomPayload = {kind: 'svg'; node: SVGSVGElement};
type PointerPoint = {x: number; y: number};

let overlay: HTMLElement | null = null;
let canvas: HTMLElement | null = null;
let resetBtn: HTMLButtonElement | null = null;
let hintEl: HTMLElement | null = null;
let scale = 1;
let baseScale = 1;
let translateX = 0;
let translateY = 0;
let dragging = false;
let dragStartX = 0;
let dragStartY = 0;
let translateStartX = 0;
let translateStartY = 0;
let pinchStartDistance = 0;
let pinchStartScale = 1;
let bodyScrollY = 0;
let enhanceScheduled = false;

const activePointers = new Map<number, PointerPoint>();

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function minScale(): number {
  return baseScale * 0.5;
}

function maxScale(): number {
  return baseScale * 3;
}

function applyTransform(): void {
  if (!canvas) {
    return;
  }
  canvas.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  updateResetLabel();
}

function updateResetLabel(): void {
  if (!resetBtn || baseScale <= 0) {
    return;
  }
  const pct = Math.round((scale / baseScale) * 100);
  resetBtn.textContent = `${pct}%`;
}

function resetTransform(): void {
  scale = baseScale;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

function adjustScale(delta: number): void {
  scale = clamp(Number((scale + delta).toFixed(2)), minScale(), maxScale());
  applyTransform();
}

function getPinchDistance(): number {
  const pts = [...activePointers.values()];
  return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
}

function stagePadding(): number {
  if (window.innerWidth <= 576) {
    return 12;
  }
  if (window.innerWidth <= 996) {
    return 20;
  }
  return 28;
}

function fitToStage(svg: SVGSVGElement): void {
  const stage = overlay?.querySelector('.gain-zoom-overlay__stage') as HTMLElement | null;
  if (!stage) {
    return;
  }

  scale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();

  const stageRect = stage.getBoundingClientRect();
  const pad = stagePadding();
  const maxW = Math.max(stageRect.width - pad * 2, 1);
  const maxH = Math.max(stageRect.height - pad * 2, 1);

  const bbox = svg.getBBox();
  const svgW = bbox.width || svg.clientWidth;
  const svgH = bbox.height || svg.clientHeight;

  if (svgW <= 0 || svgH <= 0) {
    baseScale = 1;
    scale = 1;
    applyTransform();
    return;
  }

  baseScale = Number(Math.min(maxW / svgW, maxH / svgH, 1).toFixed(3));
  scale = baseScale;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

function updateHintText(): void {
  if (!hintEl) {
    return;
  }
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  hintEl.textContent = coarse
    ? 'Pinch to zoom · drag to pan · tap × to close'
    : 'Scroll or pinch to zoom · drag to pan · Esc to close';
}

function lockBodyScroll(): void {
  bodyScrollY = window.scrollY;
  document.body.style.top = `-${bodyScrollY}px`;
  document.body.classList.add('gain-zoom-open');
}

function unlockBodyScroll(): void {
  document.body.classList.remove('gain-zoom-open');
  document.body.style.top = '';
  window.scrollTo(0, bodyScrollY);
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
      <p class="gain-zoom-overlay__hint"></p>
    </div>
  `;

  document.body.appendChild(overlay);
  canvas = overlay.querySelector('.gain-zoom-overlay__canvas');
  resetBtn = overlay.querySelector('[data-gain-zoom-action="reset"]');
  hintEl = overlay.querySelector('.gain-zoom-overlay__hint');

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
      adjustScale(baseScale * 0.2);
    } else if (action === 'out') {
      adjustScale(-baseScale * 0.2);
    } else if (action === 'reset') {
      resetTransform();
    }
  });

  const stage = overlay.querySelector('.gain-zoom-overlay__stage') as HTMLElement;

  stage.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      adjustScale(event.deltaY < 0 ? baseScale * 0.12 : -baseScale * 0.12);
    },
    {passive: false},
  );

  stage.addEventListener('pointerdown', (event) => {
    activePointers.set(event.pointerId, {x: event.clientX, y: event.clientY});

    if (activePointers.size === 2) {
      dragging = false;
      pinchStartDistance = getPinchDistance();
      pinchStartScale = scale;
    } else if (activePointers.size === 1) {
      dragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      translateStartX = translateX;
      translateStartY = translateY;
    }

    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener('pointermove', (event) => {
    if (!activePointers.has(event.pointerId)) {
      return;
    }

    activePointers.set(event.pointerId, {x: event.clientX, y: event.clientY});

    if (activePointers.size >= 2) {
      if (pinchStartDistance <= 0) {
        pinchStartDistance = getPinchDistance();
        pinchStartScale = scale;
        return;
      }
      const distance = getPinchDistance();
      scale = clamp(
        Number((pinchStartScale * (distance / pinchStartDistance)).toFixed(2)),
        minScale(),
        maxScale(),
      );
      applyTransform();
      return;
    }

    if (!dragging) {
      return;
    }

    translateX = translateStartX + (event.clientX - dragStartX);
    translateY = translateStartY + (event.clientY - dragStartY);
    applyTransform();
  });

  const endPointer = (event: PointerEvent) => {
    activePointers.delete(event.pointerId);
    if (activePointers.size < 2) {
      pinchStartDistance = 0;
    }
    if (activePointers.size === 0) {
      dragging = false;
    } else if (activePointers.size === 1) {
      const remaining = [...activePointers.values()][0];
      dragging = true;
      dragStartX = remaining.x;
      dragStartY = remaining.y;
      translateStartX = translateX;
      translateStartY = translateY;
    }
  };

  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay && !overlay.hidden) {
      closeZoom();
    }
  });

  window.addEventListener('resize', () => {
    if (!overlay || overlay.hidden) {
      return;
    }
    const svg = canvas?.querySelector('svg');
    if (svg) {
      fitToStage(svg);
    }
    updateHintText();
  });

  return overlay;
}

function openZoom(payload: ZoomPayload): void {
  const root = ensureOverlay();
  const stageCanvas = root.querySelector('.gain-zoom-overlay__canvas') as HTMLElement;
  canvas = stageCanvas;
  stageCanvas.innerHTML = '';
  baseScale = 1;
  scale = 1;
  translateX = 0;
  translateY = 0;
  activePointers.clear();
  dragging = false;
  pinchStartDistance = 0;

  const clone = payload.node.cloneNode(true) as SVGSVGElement;
  clone.removeAttribute('width');
  clone.removeAttribute('height');
  clone.style.display = 'block';
  clone.style.maxWidth = 'none';
  clone.style.maxHeight = 'none';
  stageCanvas.appendChild(clone);

  updateHintText();
  root.hidden = false;
  lockBodyScroll();

  requestAnimationFrame(() => {
    fitToStage(clone);
  });
}

function closeZoom(): void {
  if (!overlay) {
    return;
  }
  overlay.hidden = true;
  unlockBodyScroll();
  activePointers.clear();
  dragging = false;
  pinchStartDistance = 0;
  baseScale = 1;
  scale = 1;
  translateX = 0;
  translateY = 0;
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
