import { useAtomValue, useSetAtom } from 'jotai';
import { cartCountAtom, cartTotalAtom, clearCartAtom } from '../store/cartAtoms';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
  const count = useAtomValue(cartCountAtom);
  const total = useAtomValue(cartTotalAtom);
  const clearCart = useSetAtom(clearCartAtom);

  return (
    <aside className="cart-drawer" aria-labelledby="cart-title">
      <div className="section-heading">
        <h2 id="cart-title">Your Cart</h2>
        <span>{count} items</span>
      </div>

      <CartItemsList />

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <div className="cart-item-actions">
          <button
            type="button"
            className="button button-ghost"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button type="button" className="button button-checkout">
            Checkout
          </button>
        </div>
      </div>
    </aside>
  );
}
