import { memo } from 'react';
import { useCartStore } from '../store/cartStore';

const RemoveButton = memo(function RemoveButton({ id }: { id: string }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <button
      type="button"
      className="button button-ghost"
      onClick={() => removeItem(id)}
    >
      Remove
    </button>
  );
});

export function CartItemsList() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <ul className="cart-items">
      {items.map((item) => (
        <li key={item.id} className="cart-item">
          <div>
            <strong>{item.name}</strong>
            <p>
              {item.quantity} x ${item.price.toFixed(2)}
            </p>
          </div>
          <div className="cart-item-actions">
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <RemoveButton id={item.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
