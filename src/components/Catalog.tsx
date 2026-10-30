import { Suspense, useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error(`Could not load products (${response.status})`);
        }

        const data = (await response.json()) as Product[];
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load products');
      }
    }

    loadProducts();
  }, []);

  if (error) {
    return <p className="status status-error">{error}</p>;
  }

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="section-heading">
        <h1 id="catalog-title">Catalog</h1>
        <span>{products.length} products</span>
      </div>
      <Suspense fallback={<p className="status">Loading products...</p>}>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </section>
  );
}
