import { useAtomValue } from 'jotai';
import { cartCountAtom } from '../store/cartAtoms';

export function CartBadge() {
  const count = useAtomValue(cartCountAtom);

  return (
    <span className="cart-badge">
      Cart
      <span className="cart-badge-count">{count}</span>
    </span>
  );
}
