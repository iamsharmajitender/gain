import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const ENHANCED_ATTR = 'data-gain-zoom-enhanced';
const MERMAID_SELECTOR = [
  '.theme-doc-markdown .docusaurus-mermaid-container',
  '.markdown .docusaurus-mermaid-container',
  '.gain-mermaid .docusaurus-mermaid-container',
  '.gain-diagram-wrap .docusaurus-mermaid-container',
  '.theme-doc-markdown .mermaid',
  '.markdown .mermaid',
  '.gain-mermaid .mermaid',
  '.gain-diagram-wrap .mermaid',
].join(', ');

type ZoomPayload = {kind: 'svg'; node: SVGSVGElement};
type Point = {x: number; y: number};

let overlay: HTMLElement | null = null;
let stageEl: HTMLElement | null = null;
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
let pinchCenterX = 0;
let pinchCenterY = 0;
let bodyScrollY = 0;
let enhanceScheduled = false;
let fitRetryTimer: ReturnType<typeof setTimeout> | null = null;

const activePointers = new Map<number, Point>();
const activeTouches = new Map<number, Point>();

function isCoarsePointer(): boolean {
  return window.matchMedia('(pointer: coarse)').matches;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function minScale(): number {
  return baseScale * 0.5;
}

function maxScale(): number {
  return isCoarsePointer() || window.innerWidth <= 996 ? baseScale * 4 : baseScale * 3;
}

function applyTransform(): void {
  if (!canvas) {
    return;
  }
  canvas.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
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

function adjustScale(delta: number, centerX?: number, centerY?: number): void {
  const next = clamp(Number((scale + delta).toFixed(3)), minScale(), maxScale());
  if (centerX != null && centerY != null && stageEl) {
    scaleAtPoint(next, centerX, centerY);
    return;
  }
  scale = next;
  applyTransform();
}

function scaleAtPoint(nextScale: number, centerX: number, centerY: number): void {
  if (!stageEl) {
    scale = nextScale;
    applyTransform();
    return;
  }

  const rect = stageEl.getBoundingClientRect();
  const cx = centerX - rect.left - rect.width / 2;
  const cy = centerY - rect.top - rect.height / 2;
  const ratio = nextScale / scale;

  translateX = cx - ratio * (cx - translateX);
  translateY = cy - ratio * (cy - translateY);
  scale = nextScale;
  applyTransform();
}

function getDistance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getPinchCenter(a: Point, b: Point): Point {
  return {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};
}

function stagePadding(): number {
  if (window.innerWidth <= 576) {
    return 8;
  }
  if (window.innerWidth <= 996) {
    return 12;
  }
  return 28;
}

function computeBaseScale(
  maxW: number,
  maxH: number,
  svgW: number,
  svgH: number,
): number {
  const widthFit = maxW / svgW;
  const heightFit = maxH / svgH;

  if (isCoarsePointer() || window.innerWidth <= 996) {
    // Fill screen width first; pan for overflow.
    let fit = widthFit * 0.98;

    // Tall diagrams: cap height so some content is visible without extreme zoom-out.
    if (svgH * fit > maxH * 1.2) {
      fit = (maxH * 1.1) / svgH;
    }

    // Wide diagrams: if full-width fit is tiny, start zoomed in for readability.
    if (widthFit < 0.65) {
      fit = Math.max(fit, Math.min(widthFit * 2.2, heightFit * 1.05));
    }

    return Number(Math.min(fit, 2.5).toFixed(3));
  }

  return Number(Math.min(widthFit, heightFit, 1).toFixed(3));
}

function getSvgDimensions(svg: SVGSVGElement): {width: number; height: number} {
  const bbox = svg.getBBox();
  const viewBox = svg.viewBox.baseVal;
  const width = bbox.width || viewBox.width || svg.clientWidth;
  const height = bbox.height || viewBox.height || svg.clientHeight;
  return {width, height};
}

function fitToStage(svg: SVGSVGElement): void {
  if (!stageEl) {
    return;
  }

  scale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();

  const maxW = Math.max(stageEl.clientWidth - stagePadding() * 2, 1);
  const maxH = Math.max(stageEl.clientHeight - stagePadding() * 2, 1);
  const {width: svgW, height: svgH} = getSvgDimensions(svg);

  if (svgW <= 0 || svgH <= 0) {
    baseScale = 1;
    scale = 1;
    applyTransform();
    return;
  }

  svg.style.width = `${svgW}px`;
  svg.style.height = `${svgH}px`;
  svg.style.maxWidth = 'none';
  svg.style.maxHeight = 'none';

  baseScale = computeBaseScale(maxW, maxH, svgW, svgH);
  scale = baseScale;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

function scheduleFitToStage(svg: SVGSVGElement): void {
  fitToStage(svg);
  requestAnimationFrame(() => fitToStage(svg));
  if (fitRetryTimer) {
    clearTimeout(fitRetryTimer);
  }
  fitRetryTimer = setTimeout(() => fitToStage(svg), 120);
}

function updateHintText(): void {
  if (!hintEl) {
    return;
  }
  hintEl.textContent = isCoarsePointer()
    ? 'Pinch or use +/− · drag to pan · tap × to close'
    : 'Scroll or pinch to zoom · drag to pan · Esc to close';
}

function lockBodyScroll(): void {
  bodyScrollY = window.scrollY;
  document.documentElement.classList.add('gain-zoom-open');
  document.body.classList.add('gain-zoom-open');
  document.body.style.top = `-${bodyScrollY}px`;
}

function unlockBodyScroll(): void {
  document.documentElement.classList.remove('gain-zoom-open');
  document.body.classList.remove('gain-zoom-open');
  document.body.style.top = '';
  window.scrollTo(0, bodyScrollY);
}

function beginPan(x: number, y: number): void {
  dragging = true;
  dragStartX = x;
  dragStartY = y;
  translateStartX = translateX;
  translateStartY = translateY;
}

function movePan(x: number, y: number): void {
  if (!dragging) {
    return;
  }
  translateX = translateStartX + (x - dragStartX);
  translateY = translateStartY + (y - dragStartY);
  applyTransform();
}

function beginPinch(distance: number, centerX: number, centerY: number): void {
  dragging = false;
  pinchStartDistance = distance;
  pinchStartScale = scale;
  pinchCenterX = centerX;
  pinchCenterY = centerY;
}

function movePinch(distance: number, centerX: number, centerY: number): void {
  if (pinchStartDistance <= 0) {
    return;
  }
  const next = clamp(
    Number((pinchStartScale * (distance / pinchStartDistance)).toFixed(3)),
    minScale(),
    maxScale(),
  );
  scaleAtPoint(next, centerX || pinchCenterX, centerY || pinchCenterY);
}

function endGestures(): void {
  dragging = false;
  pinchStartDistance = 0;
  activePointers.clear();
  activeTouches.clear();
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
  stageEl = overlay.querySelector('.gain-zoom-overlay__stage');
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
      adjustScale(baseScale * 0.25);
    } else if (action === 'out') {
      adjustScale(-baseScale * 0.25);
    } else if (action === 'reset') {
      resetTransform();
    }
  });

  stageEl?.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      adjustScale(event.deltaY < 0 ? baseScale * 0.12 : -baseScale * 0.12);
    },
    {passive: false},
  );

  stageEl?.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    activePointers.set(event.pointerId, {x: event.clientX, y: event.clientY});

    if (activePointers.size === 2) {
      const pts = [...activePointers.values()];
      const center = getPinchCenter(pts[0], pts[1]);
      beginPinch(getDistance(pts[0], pts[1]), center.x, center.y);
    } else if (activePointers.size === 1) {
      beginPan(event.clientX, event.clientY);
    }

    stageEl?.setPointerCapture(event.pointerId);
  });

  stageEl?.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || !activePointers.has(event.pointerId)) {
      return;
    }

    activePointers.set(event.pointerId, {x: event.clientX, y: event.clientY});

    if (activePointers.size >= 2) {
      const pts = [...activePointers.values()];
      const center = getPinchCenter(pts[0], pts[1]);
      if (pinchStartDistance <= 0) {
        beginPinch(getDistance(pts[0], pts[1]), center.x, center.y);
        return;
      }
      movePinch(getDistance(pts[0], pts[1]), center.x, center.y);
      return;
    }

    movePan(event.clientX, event.clientY);
  });

  const endPointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch') {
      return;
    }

    activePointers.delete(event.pointerId);
    if (activePointers.size < 2) {
      pinchStartDistance = 0;
    }
    if (activePointers.size === 0) {
      dragging = false;
    } else if (activePointers.size === 1) {
      const remaining = [...activePointers.values()][0];
      beginPan(remaining.x, remaining.y);
    }
  };

  stageEl?.addEventListener('pointerup', endPointer);
  stageEl?.addEventListener('pointercancel', endPointer);

  stageEl?.addEventListener(
    'touchstart',
    (event) => {
      for (const touch of event.changedTouches) {
        activeTouches.set(touch.identifier, {x: touch.clientX, y: touch.clientY});
      }

      if (activeTouches.size === 2) {
        event.preventDefault();
        const pts = [...activeTouches.values()];
        const center = getPinchCenter(pts[0], pts[1]);
        beginPinch(getDistance(pts[0], pts[1]), center.x, center.y);
      } else if (activeTouches.size === 1) {
        const pt = [...activeTouches.values()][0];
        beginPan(pt.x, pt.y);
      }
    },
    {passive: false},
  );

  stageEl?.addEventListener(
    'touchmove',
    (event) => {
      for (const touch of event.changedTouches) {
        if (activeTouches.has(touch.identifier)) {
          activeTouches.set(touch.identifier, {x: touch.clientX, y: touch.clientY});
        }
      }

      if (activeTouches.size >= 2) {
        event.preventDefault();
        const pts = [...activeTouches.values()];
        const center = getPinchCenter(pts[0], pts[1]);
        if (pinchStartDistance <= 0) {
          beginPinch(getDistance(pts[0], pts[1]), center.x, center.y);
          return;
        }
        movePinch(getDistance(pts[0], pts[1]), center.x, center.y);
        return;
      }

      if (activeTouches.size === 1 && dragging) {
        event.preventDefault();
        const pt = [...activeTouches.values()][0];
        movePan(pt.x, pt.y);
      }
    },
    {passive: false},
  );

  const endTouch = (event: TouchEvent) => {
    for (const touch of event.changedTouches) {
      activeTouches.delete(touch.identifier);
    }

    if (activeTouches.size < 2) {
      pinchStartDistance = 0;
    }

    if (activeTouches.size === 0) {
      dragging = false;
    } else if (activeTouches.size === 1) {
      const pt = [...activeTouches.values()][0];
      beginPan(pt.x, pt.y);
    }
  };

  stageEl?.addEventListener('touchend', endTouch);
  stageEl?.addEventListener('touchcancel', endTouch);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay && !overlay.hidden) {
      closeZoom();
    }
  });

  const onViewportChange = () => {
    if (!overlay || overlay.hidden) {
      return;
    }
    const svg = canvas?.querySelector('svg');
    if (svg) {
      scheduleFitToStage(svg);
    }
    updateHintText();
  };

  window.addEventListener('resize', onViewportChange);
  window.visualViewport?.addEventListener('resize', onViewportChange);

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
  endGestures();

  const clone = payload.node.cloneNode(true) as SVGSVGElement;
  clone.removeAttribute('width');
  clone.removeAttribute('height');
  clone.style.display = 'block';
  stageCanvas.appendChild(clone);

  updateHintText();
  root.hidden = false;
  lockBodyScroll();
  scheduleFitToStage(clone);
}

function closeZoom(): void {
  if (!overlay) {
    return;
  }
  overlay.hidden = true;
  unlockBodyScroll();
  endGestures();
  if (fitRetryTimer) {
    clearTimeout(fitRetryTimer);
    fitRetryTimer = null;
  }
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

  let tapStartX = 0;
  let tapStartY = 0;
  let tapMoved = false;

  mermaidEl.addEventListener('click', open);
  mermaidEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });

  mermaidEl.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length !== 1) {
        tapMoved = true;
        return;
      }
      tapStartX = event.touches[0].clientX;
      tapStartY = event.touches[0].clientY;
      tapMoved = false;
    },
    {passive: true},
  );

  mermaidEl.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length !== 1) {
        return;
      }
      const dx = event.touches[0].clientX - tapStartX;
      const dy = event.touches[0].clientY - tapStartY;
      if (Math.hypot(dx, dy) > 12) {
        tapMoved = true;
      }
    },
    {passive: true},
  );

  mermaidEl.addEventListener(
    'touchend',
    (event) => {
      if (tapMoved || event.changedTouches.length !== 1) {
        return;
      }
      event.preventDefault();
      open();
    },
    {passive: false},
  );
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
