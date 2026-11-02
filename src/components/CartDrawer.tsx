import {
  selectTotalPrice,
  selectTotalQuantity,
  useCartStore,
} from '../store/cartStore';
import { CartErrorBanner } from './CartErrorBanner';
import { CheckoutButton } from './CheckoutButton';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
  const itemsCount = useCartStore(selectTotalQuantity);
  const total = useCartStore(selectTotalPrice);

  return (
    <aside className="cart-drawer" aria-labelledby="cart-title">
      <div className="section-heading">
        <h2 id="cart-title">Your Cart</h2>
        <span>{itemsCount} items</span>
      </div>

      <CartItemsList />

      <CartErrorBanner />

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <CheckoutButton />
      </div>
    </aside>
  );
}
