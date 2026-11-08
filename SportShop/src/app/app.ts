import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartSummaryComponent } from './shop/cart-summary.component';

@Component({
  imports: [RouterOutlet, CartSummaryComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
