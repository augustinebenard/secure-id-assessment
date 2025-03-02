import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { CartService } from '../../cart-management/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  filteredProducts: Product[] = [];
  cartItems: Map<number, boolean> = new Map();
  itemsPerPage = 6;
  currentPage = 1;
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.cartService.cartItems.subscribe((items) => {
      this.cartItems.clear();
      items.forEach((item) => {
        this.cartItems.set(item.product.id, true);
      });
      // console.log(this.cartItems);

    });
  }

  getAllProducts(): void {
    this.products = this.productService.getProducts();
    this.loadProducts();
  }

  loadProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
    this.filterProducts();
  }

  loadMore(): void {
    const nextStartIndex = this.currentPage * this.itemsPerPage;
    if (nextStartIndex < this.products.length) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  goBack(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    } else {
      this.toast.warning('You are on the first page.', 'Warning');
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.cartItems.set(product.id, true);
    // console.log(this.cartItems);

    this.toast.success(`${product.name} added to cart.`, 'Success');
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems.delete(productId);
    this.toast.info('Item removed from cart.', 'Info');
  }

  isAddedToCart(productId: number): boolean {
    return this.cartItems.get(productId) || false;
  }

  filterProducts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.displayedProducts;
    } else {
      this.filteredProducts = this.displayedProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      // console.log(this.filteredProducts);

    }
  }
}
