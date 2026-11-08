import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-cart-summary',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent {
  protected readonly cart = inject(Cart);
}
