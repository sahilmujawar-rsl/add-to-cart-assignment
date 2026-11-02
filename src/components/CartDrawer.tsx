import { useCartState } from '../context/CartContext';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
  const { items } = useCartState();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <aside className="cart-drawer" aria-labelledby="cart-title">
      <div className="section-heading">
        <h2 id="cart-title">Your Cart</h2>
        <span>{items.length} items</span>
      </div>

      <CartItemsList />

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button
          type="button"
          className="button button-checkout"
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}
