import type { MatrixSession, SyncResponse } from './types';
import { sync as syncApi, MatrixError } from './api';

export type SyncCallback = (response: SyncResponse) => void;
export type SyncErrorCallback = (error: Error) => void;

const MIN_BACKOFF_MS = 1_000;
const MAX_BACKOFF_MS = 30_000;

export class SyncLoop {
  private abortController: AbortController | null = null;
  private since: string | null = null;
  private running = false;
  private backoffMs = 0;

  constructor(
    private session: MatrixSession,
    private onSync: SyncCallback,
    private onError: SyncErrorCallback,
  ) {}

  /** Start the sync loop. Safe to call multiple times (no-op if already running). */
  start(initialSince?: string): void {
    if (this.running) return;
    this.running = true;
    this.since = initialSince ?? null;
    this.loop();
  }

  /** Stop the sync loop and cancel any in-flight request. */
  stop(): void {
    this.running = false;
    this.abortController?.abort();
    this.abortController = null;
  }

  private async loop(): Promise<void> {
    while (this.running) {
      this.abortController = new AbortController();

      try {
        const response = await syncApi(
          this.session,
          this.since ?? undefined,
          10_000,
          this.abortController.signal,
        );

        if (!this.running) return;

        this.since = response.next_batch;
        this.backoffMs = 0;
        this.onSync(response);
      } catch (err) {
        if (!this.running) return;

        // Aborted requests are expected when stopping
        if (err instanceof DOMException && err.name === 'AbortError') return;

        // 401 = token expired, not recoverable
        if (err instanceof MatrixError && err.httpStatus === 401) {
          this.running = false;
          this.onError(err);
          return;
        }

        // Transient error — backoff and retry
        this.backoffMs = Math.min(
          Math.max(this.backoffMs * 2, MIN_BACKOFF_MS),
          MAX_BACKOFF_MS,
        );
        this.onError(err instanceof Error ? err : new Error(String(err)));

        await new Promise((r) => setTimeout(r, this.backoffMs));
      }
    }
  }
}
