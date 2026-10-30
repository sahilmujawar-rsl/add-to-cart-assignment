import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartItem, CheckoutStatus, Product } from '../types';

export interface CartState {
  items: CartItem[];
  status: CheckoutStatus;
  error: string | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  checkout: () => Promise<void>;
}
export const selectTotalPrice = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectTotalQuantity = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        status: 'idle',
        error: null,

        addItem: (product) =>
          set((state) => {
            const existing = state.items.find((item) => item.id === product.id);
            const items = existing
              ? state.items.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                )
              : [...state.items, { ...product, quantity: 1 }];

            return {
              items,
              status: state.status === 'success' ? 'idle' : state.status,
              error: null,
            };
          }),

        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            status: state.status === 'success' ? 'idle' : state.status,
          })),

        clear: () => set({ items: [], status: 'idle', error: null }),

        checkout: async () => {
          const { items } = get();
          set({ status: 'submitting', error: null });

          try {
            const total = selectTotalPrice(get());
            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                items,
                total,
              }),
            });

            if (!response.ok) {
              throw new Error(`Order submission failed (${response.status})`);
            }

            await response.json();
            set({ status: 'success', items: [], error: null });
          } catch (err) {
            set({
              status: 'error',
              error: err instanceof Error ? err.message : 'Checkout failed',
            });
          }
        },
      }),
      {
        name: 'cartStore',
      },
    ),
  ),
);
