import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Order } from './order.model';
import type { Product } from './product.model';
import type { StaticDataSource } from './static.datasource';

const API_URL = 'http://127.0.0.1:3500';

@Injectable()
export class RestDataSource implements Pick<StaticDataSource, 'getProducts' | 'saveOrder'> {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${API_URL}/orders`, order);
  }
}
