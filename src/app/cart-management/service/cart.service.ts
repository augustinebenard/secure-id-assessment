import { Injectable } from '@angular/core';
import { Product } from '../../products/model/product.model';
import { CartItem } from '../model/cart.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems = this.cartItemsSubject.asObservable();
  constructor() { }

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(cartItem => cartItem.product.id === product.id);
    if (item) {
      item.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }
    this.cartItemsSubject.next(currentItems);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(cartItem => cartItem.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }
  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(cartItem => cartItem.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next(currentItems);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }


  getTotalCost(): number {
    return this.cartItemsSubject.value.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);
  }

  applyCoupon(couponCode: string): number {
    const total = this.getTotalCost();
    switch (couponCode) {
      case 'AUSTIN001':
        return total * 0.10;
      case 'NG001':
        return total * 0.15;
      case 'SECUREDEV001':
        return total * 0.20;
      default:
        return 0;
    }
  }

  calculateShipping(): number {
    // Default shipping fee
    return 200;
  }
}
