import { useShallow } from 'zustand/react/shallow';
import { selectTotalPrice, useCartStore } from '../store/cartStore';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
  const { itemsCount, total, status, error, checkout } = useCartStore(
    useShallow((state) => ({
      itemsCount: state.items.length,
      total: selectTotalPrice(state),
      status: state.status,
      error: state.error,
      checkout: state.checkout,
    })),
  );

  return (
    <aside className="cart-drawer" aria-labelledby="cart-title">
      <div className="section-heading">
        <h2 id="cart-title">Your Cart</h2>
        <span>{itemsCount} items</span>
      </div>

      <CartItemsList />

      {status === 'error' && (
        <p
          className="status status-error"
          style={{ marginTop: '12px', padding: '10px' }}
        >
          {error || 'Checkout failed. Please try again.'}
        </p>
      )}

      {status === 'success' && (
        <p
          className="status"
          style={{
            marginTop: '12px',
            padding: '10px',
            color: '#0f766e',
            borderColor: '#99f6e4',
            background: '#f0fdfa',
          }}
        >
          Order placed successfully!
        </p>
      )}

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button
          type="button"
          className="button button-checkout"
          onClick={() => {
            void checkout();
          }}
        >
          {status === 'submitting' ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </aside>
  );
}
