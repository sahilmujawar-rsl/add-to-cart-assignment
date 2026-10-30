import { useSetAtom } from 'jotai';
import { addItemAtom } from '../store/cartAtoms';
import type { Product } from '../types';

export function ProductCard({
  product,
}: {
  product: Product;
}) {
  const addItem = useSetAtom(addItemAtom);

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
}
