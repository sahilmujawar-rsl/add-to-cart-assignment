import { CheckoutContext } from '../store/CheckoutContext';

export function CheckoutButton() {
  const actorRef = CheckoutContext.useActorRef();
  const isSubmitting = CheckoutContext.useSelector((snapshot) =>
    snapshot.matches('submitting'),
  );
  const canSubmit = CheckoutContext.useSelector((snapshot) =>
    snapshot.can({ type: 'SUBMIT' }),
  );

  return (
    <button
      type="button"
      className="button button-checkout"
      disabled={!canSubmit || isSubmitting}
      onClick={() => actorRef.send({ type: 'SUBMIT' })}
    >
      {isSubmitting ? 'Processing Payment...' : 'Checkout'}
    </button>
  );
}
