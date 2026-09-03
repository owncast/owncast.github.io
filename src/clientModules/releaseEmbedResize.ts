import type { ClientModule } from '@docusaurus/types';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const MIN_HEIGHT = 400;
// Step changes report before the next form section finishes rendering.
const CONTENT_GROWTH_BUFFER = 96;
const FRAME_TITLE = 'Support Owncast';
const OPENCOLLECTIVE_ORIGIN = 'https://opencollective.com';
let attached = false;


function attach(): void {
  if (attached) return;
  attached = true;
  window.addEventListener('message', event => {
    if (event.origin !== OPENCOLLECTIVE_ORIGIN) return;

    const frame = document.querySelector<HTMLIFrameElement>(`iframe[title="${FRAME_TITLE}"]`);
    const height = event.data?.size?.height;
    if (
      event.data?.event !== 'stepChange' ||
      !frame ||
      event.source !== frame.contentWindow ||
      typeof height !== 'number'
    ) {
      return;
    }

    frame.style.height = `${Math.max(MIN_HEIGHT, height + CONTENT_GROWTH_BUFFER)}px`;
  });
}

if (ExecutionEnvironment.canUseDOM) attach();

const module: ClientModule = {
  onRouteDidUpdate() {
    if (ExecutionEnvironment.canUseDOM) attach();
  },
};

export default module;
