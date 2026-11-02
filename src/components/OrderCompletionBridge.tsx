import { useEffect } from 'react';
import { CheckoutContext } from '../store/CheckoutContext';
import { useCartStore } from '../store/cartStore';

export function OrderCompletionBridge() {
  const actorRef = CheckoutContext.useActorRef();
  const clearCart = useCartStore((state) => state.clear);

  useEffect(() => {
    const subscription = actorRef.on('orderSuccess', clearCart);
    return () => subscription.unsubscribe();
  }, [actorRef, clearCart]);

  return null;
}
