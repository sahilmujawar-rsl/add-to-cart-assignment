import { useCartState } from '../context/CartContext';

export function CartBadge() {
  const { items } = useCartState();
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <span className="cart-badge">
      Cart
      <span className="cart-badge-count">{count}</span>
    </span>
  );
}
