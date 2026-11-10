// Bundled by Astro from BaseLayout: the one entry every page shares.
import { boot } from './engine';
import { transitions } from './transitions';
import { settle } from './live';

// The router hooks only make sense around a running engine (not after the failsafe gave up on it, or a failed boot).
if (boot()) transitions();

// Living drawings hold still unless motion is on, in every mode that runs JS (the failsafe and reduced motion included). The direct call
// serves a browser without the View Transitions API, where astro:page-load never fires; settle() is idempotent.
settle();
document.addEventListener('astro:page-load', () => settle());
