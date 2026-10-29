import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: string };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.product.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }

    case 'remove':
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };

    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
}

const CartStateContext = createContext<CartState | null>(null);
const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState(): CartState {
  const state = useContext(CartStateContext);

  if (state === null) {
    throw new Error('useCartState must be used within a <CartProvider>');
  }

  return state;
}

export function useCartDispatch(): Dispatch<CartAction> {
  const dispatch = useContext(CartDispatchContext);

  if (dispatch === null) {
    throw new Error('useCartDispatch must be used within a <CartProvider>');
  }

  return dispatch;
}
