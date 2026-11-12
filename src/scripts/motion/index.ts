// Bundled by Astro from BaseLayout: the one entry every page shares.
import { boot } from './engine';
import { transitions } from './transitions';

// The router hooks only make sense around a running engine (not after the failsafe gave up on it, or a failed boot).
if (boot()) transitions();
