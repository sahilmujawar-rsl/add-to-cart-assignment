import { CartDrawer } from './components/CartDrawer';
import { Catalog } from './components/Catalog';
import { CartSynchronizer } from './components/CartSynchronizer';
import { Header } from './components/Header';
import { OrderCompletionBridge } from './components/OrderCompletionBridge';
import { PaymentPanel } from './components/PaymentPanel';
import { CheckoutContext } from './store/CheckoutContext';
import { useCartStore } from './store/cartStore';

export function App() {
  return (
    <CheckoutContext.Provider
      options={{ input: { initialItems: useCartStore.getState().items } }}
    >
      <CartSynchronizer />
      <OrderCompletionBridge />
      <div className="app">
        <Header />
        <main className="app-content">
          <Catalog />
          <CartDrawer />
          <PaymentPanel />
        </main>
      </div>
    </CheckoutContext.Provider>
  );
}
