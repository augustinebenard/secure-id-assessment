import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'LG Monitor',
      price: 50000,
      description: 'LG Monitor 24 inch! Best for gaming and office use. 4K resolution with 60Hz refresh rate. 1 HDMI and 1 Display port available.',
      imageUrl: 'desktop.webp'
    },
    { id: 2,
      name: 'Macbook Laptop Case',
      price: 12000,
      description: 'Macbook Laptop Case! Best for protecting your laptop from dust and scratches. Available in multiple colors.',
      imageUrl: 'laptop-case.webp'
    },
    {
      id: 3,
      name: 'Wireless Keyboard',
      price: 2500,
      description: 'Wireless Keyboard! Best for office use. 2.4 GHz wireless keyboard with 104 keys.',
      imageUrl: 'keyboard.webp'
    },
    {
      id: 4,
      name: 'Wireless Mouse',
      price: 1500,
      description: 'Wireless Mouse! Best for office use. 2.4 GHz wireless mouse with 4 buttons.',
      imageUrl: 'mouse.webp'
    },
    {
      id: 5,
      name: 'Headphones',
      price: 2000,
      description: 'Headphones! Best for music lovers. Over the ear headphones with noise cancellation.',
      imageUrl: 'headphones.webp'
    },
    {
      id: 6,
      name: 'Smart Watch',
      price: 5000,
      description: 'Smart Watch! Best for tracking your daily activities. Water resistant with 1 year warranty.',
      imageUrl: 'smart-watch.webp'
    },
    {
      id: 7,
      name: 'Bluetooth Speaker',
      price: 3000,
      description: 'Bluetooth Speaker! Best for music lovers. 10W speaker with 10 hours of battery life.',
      imageUrl: 'speaker.webp'
    },
    {
      id: 8,
      name: 'Power Bank',
      price: 1500,
      description: 'Power Bank! Best for charging your devices on the go. 10000 mAh battery with 2 USB ports.',
      imageUrl: 'power-bank.webp'
    },
    {
      id: 9,
      name: 'External Hard Drive',
      price: 6000,
      description: 'External Hard Drive! Best for storing your data. 1 TB storage with USB 3.0 connectivity.',
      imageUrl: 'hard-drive.webp'
    },
  ];
  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
