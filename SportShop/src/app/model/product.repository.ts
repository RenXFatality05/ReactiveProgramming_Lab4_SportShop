import { Injectable, computed, signal } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';

const UNCATEGORIZED = '(None)';

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  private readonly products = signal<Product[]>([]);
  private readonly categories = computed(() =>
    [...new Set(this.products().map((product) => product.category ?? UNCATEGORIZED))].sort(),
  );
  private readonly loadState = signal<'idle' | 'loading' | 'ready' | 'error'>('idle');

  readonly status = this.loadState.asReadonly();

  constructor(private readonly dataSource: StaticDataSource) {
    this.loadProducts();
  }

  loadProducts() {
    if (this.loadState() === 'loading') {
      return;
    }

    this.loadState.set('loading');
    this.dataSource.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loadState.set('ready');
      },
      error: () => this.loadState.set('error'),
    });
  }

  getProducts(category?: string): Product[] {
    return this.products().filter(
      (product) => category === undefined || (product.category ?? UNCATEGORIZED) === category,
    );
  }

  getProduct(id: number): Product | undefined {
    return this.products().find((product) => product.id === id);
  }

  getCategories(): string[] {
    return this.categories();
  }
}
