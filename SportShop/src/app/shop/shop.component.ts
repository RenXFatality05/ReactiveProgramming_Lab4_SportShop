import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Cart } from '../model/cart.model';
import { ProductRepository } from '../model/product.repository';
import { CounterDirective } from './counter.directive';

@Component({
  selector: 'app-shop',
  imports: [CurrencyPipe, CounterDirective],
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  private readonly repository = inject(ProductRepository);
  protected readonly cart = inject(Cart);
  protected readonly selectedCategory = signal<string | undefined>(undefined);
  protected readonly selectedPage = signal(1);
  protected readonly productsPerPage = signal(4);

  get categories() {
    return this.repository.getCategories();
  }

  private get filteredProducts() {
    return this.repository.getProducts(this.selectedCategory());
  }

  get products() {
    const pageSize = this.productsPerPage();
    const start = (this.selectedPage() - 1) * pageSize;

    return this.filteredProducts.slice(start, start + pageSize);
  }

  get pageCount() {
    return Math.ceil(this.filteredProducts.length / this.productsPerPage());
  }

  selectCategory(category?: string) {
    this.selectedCategory.set(category);
    this.selectedPage.set(1);
  }

  changePageSize(pageSize: number) {
    this.productsPerPage.set(pageSize);
    this.selectedPage.set(1);
  }
}
