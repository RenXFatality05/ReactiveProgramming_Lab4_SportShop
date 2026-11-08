import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  template: `
    <main class="container py-4">
      <h1>Checkout</h1>
      <a class="btn btn-outline-primary" routerLink="/cart">Back to Cart</a>
    </main>
  `,
})
export class CheckoutComponent {}
