import { useAtomValue, useSetAtom } from 'jotai';
import { cartItemsAtom, removeItemAtom } from '../store/cartAtoms';

function RemoveButton({ id }: { id: string }) {
  const removeItem = useSetAtom(removeItemAtom);

  return (
    <button
      type="button"
      className="button button-ghost"
      onClick={() => removeItem(id)}
    >
      Remove
    </button>
  );
}

export function CartItemsList() {
  const items = useAtomValue(cartItemsAtom);

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
