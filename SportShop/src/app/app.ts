import { Component } from '@angular/core';
import { ShopComponent } from './shop/shop.component';

@Component({
  imports: [ShopComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
