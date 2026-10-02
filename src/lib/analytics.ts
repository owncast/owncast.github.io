interface PlausibleOptions {
  interactive?: boolean;
}

type PlausibleArgs = [eventName: string, options?: PlausibleOptions];
type Plausible = ((...args: PlausibleArgs) => void) & {
  q?: PlausibleArgs[];
};

declare global {
  interface Window {
    plausible?: Plausible;
  }
}

export function trackPlausibleEvent(...args: PlausibleArgs): void {
  let plausible = window.plausible;
  if (!plausible) {
    const q: PlausibleArgs[] = [];
    plausible = Object.assign((...event: PlausibleArgs) => q.push(event), { q });
    window.plausible = plausible;
  }
  plausible(...args);
}
