import { CheckoutContext } from '../store/CheckoutContext';

export function PaymentPanel() {
  const actorRef = CheckoutContext.useActorRef();
  const isSubmitting = CheckoutContext.useSelector((snapshot) =>
    snapshot.matches('submitting'),
  );
  const isSuccess = CheckoutContext.useSelector((snapshot) =>
    snapshot.matches('success'),
  );
  const canSubmit = CheckoutContext.useSelector((snapshot) =>
    snapshot.can({ type: 'SUBMIT' }),
  );
  const error = CheckoutContext.useSelector((snapshot) => snapshot.context.error);
  const order = CheckoutContext.useSelector((snapshot) => snapshot.context.order);

  return (
    <section className="payment-panel" aria-labelledby="payment-title">
      <h2 id="payment-title">Payment</h2>
      <p className="payment-status" aria-live="polite">
        {isSubmitting
          ? 'Payment is processing...'
          : isSuccess
            ? `Order ${order?.id} placed successfully.`
            : 'Ready to review your order.'}
      </p>

      {error && (
        <p className="status status-error checkout-error" role="alert">
          {error}
        </p>
      )}

      <div className="payment-actions">
        <button
          type="button"
          className="button button-checkout"
          disabled={!canSubmit || isSubmitting}
          onClick={() => actorRef.send({ type: 'SUBMIT' })}
        >
          {isSubmitting ? 'Submitting Payment...' : 'Submit Payment'}
        </button>
        <button
          type="button"
          className="button button-ghost"
          disabled={!isSubmitting}
          onClick={() => actorRef.send({ type: 'CANCEL' })}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
