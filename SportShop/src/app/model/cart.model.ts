import { Injectable, computed, signal } from '@angular/core';
import type { Product } from './product.model';

export class CartLine {
  constructor(
    public readonly product: Product,
    public readonly quantity: number,
  ) {}

  get lineTotal() {
    return this.quantity * (this.product.price ?? 0);
  }
}

@Injectable({ providedIn: 'root' })
export class Cart {
  private readonly cartLines = signal<readonly CartLine[]>([]);

  readonly lines = this.cartLines.asReadonly();
  readonly itemCount = computed(() => this.lines().reduce((sum, line) => sum + line.quantity, 0));
  readonly cartPrice = computed(() => this.lines().reduce((sum, line) => sum + line.lineTotal, 0));

  addLine(product: Product, quantity = 1) {
    if (product.id === undefined || !Number.isSafeInteger(quantity) || quantity < 1) {
      return;
    }

    this.cartLines.update((lines) => {
      const existing = lines.find((line) => line.product.id === product.id);

      if (existing === undefined) {
        return [...lines, new CartLine(product, quantity)];
      }

      return lines.map((line) =>
        line === existing ? new CartLine(line.product, line.quantity + quantity) : line,
      );
    });
  }

  updateQuantity(product: Product, quantity: number) {
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return;
    }

    this.cartLines.update((lines) =>
      lines.map((line) =>
        line.product.id === product.id ? new CartLine(line.product, quantity) : line,
      ),
    );
  }

  removeLine(id: number) {
    this.cartLines.update((lines) => lines.filter((line) => line.product.id !== id));
  }

  clear() {
    this.cartLines.set([]);
  }
}
