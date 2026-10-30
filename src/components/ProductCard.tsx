import { memo } from 'react';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';

export const ProductCard = memo(function ProductCard({
  product,
}: {
  product: Product;
}) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="product-card">
      <div>
        <h2>{product.name}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="button button-primary"
        onClick={() => addItem(product)}
      >
        Add to Cart
      </button>
    </article>
  );
});
