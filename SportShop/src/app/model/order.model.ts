import type { Cart } from './cart.model';

export interface DeliveryDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export class Order {
  id?: number;
  shipped = false;

  readonly name: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly country: string;
  readonly cart;

  constructor(cart: Cart, delivery: DeliveryDetails) {
    this.name = delivery.name;
    this.address = delivery.address;
    this.city = delivery.city;
    this.state = delivery.state;
    this.zip = delivery.zip;
    this.country = delivery.country;

    this.cart = {
      lines: cart.lines().map(({ product, quantity }) => ({
        product: { ...product },
        quantity,
      })),
      itemCount: cart.itemCount(),
      cartPrice: cart.cartPrice(),
    };
  }
}
