import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Order } from './order.model';
import { StaticDataSource } from './static.datasource';

@Injectable({ providedIn: 'root' })
export class OrderRepository {
  constructor(private readonly dataSource: StaticDataSource) {}

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }
}
