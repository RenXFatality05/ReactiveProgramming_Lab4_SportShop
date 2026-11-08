import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, type NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Cart } from '../model/cart.model';
import { Order, type DeliveryDetails } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly repository = inject(OrderRepository);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly cart = inject(Cart);
  protected readonly submitting = signal(false);
  protected readonly orderSubmitted = signal(false);
  protected readonly submitError = signal('');

  protected readonly delivery: DeliveryDetails = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  };

  protected readonly fields = [
    { name: 'name', label: 'Name', autocomplete: 'name' },
    { name: 'address', label: 'Address', autocomplete: 'street-address' },
    { name: 'city', label: 'City', autocomplete: 'address-level2' },
    { name: 'state', label: 'Region', autocomplete: 'address-level1' },
    { name: 'zip', label: 'Postal code', autocomplete: 'postal-code' },
    { name: 'country', label: 'Country', autocomplete: 'country-name' },
  ] as const;

  protected submitOrder(form: NgForm) {
    if (form.invalid || this.submitting() || this.cart.itemCount() === 0) {
      return;
    }

    const { name, address, city, state, zip, country } = this.delivery;
    const order = new Order(this.cart, {
      name: name.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      country: country.trim(),
    });

    this.submitError.set('');
    this.submitting.set(true);
    this.repository
      .saveOrder(order)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.submitting.set(false)),
      )
      .subscribe({
        next: () => {
          this.orderSubmitted.set(true);
          this.cart.clear();
        },
        error: () => this.submitError.set('Unable to place the order. Please try again.'),
      });
  }
}
