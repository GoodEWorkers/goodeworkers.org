/**
 * Living drawings: an illustration whose svg has the class illo-live carries its own SMIL loop (the mosaic set). The loop plays only
 * while the drawing is on screen and motion is on; otherwise it holds its first frame, which is the composed, still picture (reduced
 * motion, the failsafe, a picker thumbnail). Call settle() on whatever just received drawings: the page, a slot, the picker panel.
 */
import { motionOn } from './engine';

const io = new IntersectionObserver((entries) => {
  for (const { target, isIntersecting } of entries) {
    const svg = target as SVGSVGElement;
    if (isIntersecting && motionOn()) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }
});

export function settle(root: ParentNode = document, { still = false } = {}) {
  for (const svg of root.querySelectorAll<SVGSVGElement>('svg.illo-live')) {
    svg.pauseAnimations();
    svg.setCurrentTime(0);
    if (!still) io.observe(svg); // reports at once, so an on-screen drawing starts on the next frame
  }
}
