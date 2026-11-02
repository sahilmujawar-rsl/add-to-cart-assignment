import { Toolbar } from './Toolbar';

export function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark">S</span>
        <span>ShopCart</span>
      </div>
      <Toolbar />
    </header>
  );
}
