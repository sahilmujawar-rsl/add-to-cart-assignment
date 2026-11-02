import { CheckoutContext } from '../store/CheckoutContext';

export function CartErrorBanner() {
  const error = CheckoutContext.useSelector((snapshot) => snapshot.context.error);

  if (!error) {
    return null;
  }

  return (
    <p className="status status-error checkout-error" role="alert">
      {error}
    </p>
  );
}
