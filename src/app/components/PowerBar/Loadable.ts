/**
 *
 * Asynchronously loads the component for PowerBar
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PowerBar = lazyLoad(
  () => import('./index'),
  module => module.PowerBar,
);
