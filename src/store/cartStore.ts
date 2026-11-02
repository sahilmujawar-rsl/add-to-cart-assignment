import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const selectTotalPrice = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectTotalQuantity = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        addItem: (product) =>
          set((state) => {
            const existing = state.items.find((item) => item.id === product.id);
            return {
              items: existing
                ? state.items.map((item) =>
                    item.id === product.id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item,
                  )
                : [...state.items, { ...product, quantity: 1 }],
            };
          }),

        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          })),

        clear: () => set({ items: [] }),
      }),
      {
        name: 'cartStore',
      },
    ),
  ),
);
