import { assign, emit, fromPromise, setup } from 'xstate';
import type { CartItem, CheckoutResult } from '../types';

interface CheckoutContext {
  items: CartItem[];
  error: string | null;
  order: CheckoutResult | null;
}

type CheckoutEvent =
  | { type: 'SYNC_ITEMS'; items: CartItem[] }
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' };

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    events: {} as CheckoutEvent,
    input: {} as { initialItems: CartItem[] },
    output: {} as CheckoutResult,
    emitted: {} as { type: 'orderSuccess' },
  },
  actors: {
    submitOrder: fromPromise(
      async ({
        input,
        signal,
      }: {
        input: { items: CartItem[] };
        signal: AbortSignal;
      }): Promise<CheckoutResult> => {
        const total = input.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: input.items, total }),
          signal,
        });

        if (!response.ok) {
          throw new Error(`Order submission failed (${response.status})`);
        }

        return (await response.json()) as CheckoutResult;
      },
    ),
  },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
    hasSyncedItems: ({ event }) =>
      event.type === 'SYNC_ITEMS' && event.items.length > 0,
  },
  actions: {
    syncItems: assign(({ event }) =>
      event.type === 'SYNC_ITEMS'
        ? { items: event.items, error: null }
        : {},
    ),
    clearError: assign({ error: null }),
    notifyOrderSuccess: emit({ type: 'orderSuccess' }),
  },
}).createMachine({
  id: 'checkout',
  initial: 'review',
  context: ({ input }) => ({
    items: input.initialItems,
    error: null,
    order: null,
  }),
  states: {
    review: {
      on: {
        SYNC_ITEMS: { actions: 'syncItems' },
        SUBMIT: {
          target: 'submitting',
          guard: 'hasItems',
          actions: 'clearError',
        },
      },
    },
    submitting: {
      invoke: {
        id: 'submitOrder',
        src: 'submitOrder',
        input: ({ context }) => ({ items: context.items }),
        onDone: {
          target: 'success',
          actions: assign(({ event }) => ({
            order: event.output,
            error: null,
          })),
        },
        onError: {
          target: 'review',
          actions: assign(({ event }) => ({
            error:
              event.error instanceof Error
                ? event.error.message
                : 'Order submission failed',
          })),
        },
      },
      on: {
        SYNC_ITEMS: { actions: 'syncItems' },
        CANCEL: {
          target: 'review',
          actions: 'clearError',
        },
      },
    },
    success: {
      type: 'final',
      output: ({ context }) => context.order!,
      entry: 'notifyOrderSuccess',
    },
  },
});
