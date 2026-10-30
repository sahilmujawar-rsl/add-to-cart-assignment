import { CartDrawer } from './components/CartDrawer';
import { Catalog } from './components/Catalog';
import { Header } from './components/Header';

export function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Catalog />
        <CartDrawer />
      </main>
    </div>
  );
}
