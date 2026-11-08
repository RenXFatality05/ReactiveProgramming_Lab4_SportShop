import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';

const UNCATEGORIZED = '(None)';

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(dataSource: StaticDataSource) {
    dataSource.getProducts().subscribe((products) => {
      this.products = products;
      this.categories = [...new Set(products.map((product) => product.category ?? UNCATEGORIZED))].sort();
    });
  }

  getProducts(category?: string): Product[] {
    return this.products.filter(
      (product) => category === undefined || (product.category ?? UNCATEGORIZED) === category,
    );
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }
}
