import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { Order } from './order.model';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class StaticDataSource {
  private readonly products: Product[] = Array.from({ length: 15 }, (_, index) => {
    const id = index + 1;
    const name = `Product ${id}`;
    const category = `Category ${Math.floor(index / 5) + 1}`;

    return new Product(id, name, category, `${name} (${category})`, 100);
  });

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  saveOrder(order: Order): Observable<Order> {
    console.log(JSON.stringify(order));
    return of(order);
  }
}
