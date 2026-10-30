import { selectTotalQuantity, useCartStore } from '../store/cartStore';

export function CartBadge() {
  const count = useCartStore(selectTotalQuantity);

  return (
    <span className="cart-badge">
      Cart
      <span className="cart-badge-count">{count}</span>
    </span>
  );
}
