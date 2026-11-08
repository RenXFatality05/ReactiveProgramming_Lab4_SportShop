import type { Routes } from '@angular/router';
import { shopFirstGuard } from './shop-first.guard';
import { CartDetailComponent } from './shop/cart-detail.component';
import { CheckoutComponent } from './shop/checkout.component';
import { ShopComponent } from './shop/shop.component';

export const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartDetailComponent, canActivate: [shopFirstGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [shopFirstGuard] },
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: '**', redirectTo: 'shop' },
];
