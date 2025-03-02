import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cart.model';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit {
  cartItems: CartItem[] = [];
  totalCost: number = 0;
  couponCode: string = '';
  discount: number = 0;
  shipping: number = 0;
  grandTotal: number = 0;

  constructor(private cartService: CartService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalCost = this.cartService.getTotalCost();
    this.shipping = this.cartService.calculateShipping();
    this.grandTotal = this.totalCost + this.shipping - this.discount;
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.calculateTotals();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.calculateTotals();
  }

  applyCoupon(): void {
    const discount = this.cartService.applyCoupon(this.couponCode);
    if (discount > 0) {
      this.discount = discount;
      this.calculateTotals();
      this.toastr.success('Coupon applied successfully.', 'Success');
    } else {
      this.toastr.error('Invalid coupon code. Please try again.', 'Error');
    }
  }
}
