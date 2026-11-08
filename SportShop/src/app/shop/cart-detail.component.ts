import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart, type CartLine } from '../model/cart.model';

@Component({
  selector: 'app-cart-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-detail.component.html',
})
export class CartDetailComponent {
  protected readonly cart = inject(Cart);

  changeQuantity(line: CartLine, input: HTMLInputElement) {
    const quantity = input.valueAsNumber;

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      input.value = String(line.quantity);
      return;
    }

    this.cart.updateQuantity(line.product, quantity);
  }
}
