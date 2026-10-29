import { CartDrawer } from './components/CartDrawer';
import { Catalog } from './components/Catalog';
import { Header } from './components/Header';
import { CartProvider } from './context/CartContext';

export function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="app-content">
          <Catalog />
          <CartDrawer />
        </main>
      </div>
    </CartProvider>
  );
}
