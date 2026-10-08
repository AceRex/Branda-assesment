import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** Keep development files separate so they cannot overwrite a running production build. */
export default function nextConfig(phase) {
  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  };
}
