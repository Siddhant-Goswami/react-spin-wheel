/**
 *
 * Asynchronously loads the component for Wheel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Wheel = lazyLoad(
  () => import('./index'),
  module => module.Wheel,
);
