import { useCartDispatch } from '../context/CartContext';
import type { Product } from '../types';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useCartDispatch();

  return (
    <article className="product-card">
      <div>
        <h2>{product.name}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="button button-primary"
        onClick={() => dispatch({ type: 'add', product })}
      >
        Add to Cart
      </button>
    </article>
  );
}
