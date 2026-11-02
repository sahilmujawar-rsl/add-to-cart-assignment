import { useEffect } from 'react';
import { CheckoutContext } from '../store/CheckoutContext';
import { useCartStore } from '../store/cartStore';

export function CartSynchronizer() {
  const actorRef = CheckoutContext.useActorRef();
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    actorRef.send({ type: 'SYNC_ITEMS', items });
  }, [actorRef, items]);

  return null;
}
