import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];

  constructor() { 
    this.products = [
      new Product('Uniqlo Beige Set', 20, 'assets/products/beigeSweatshirt.jpg', '1', 'BT', 'Delivery', 'This exquisite blouse boasts a modern yet timeless design, ideal for both casual and formal settings. Crafted from a lightweight, breathable fabric, it ensures comfort throughout the day. The blouse features a delicate floral print in a subtle pastel palette, adding a touch of femininity and elegance. Its relaxed fit is complemented by billowy sleeves that cinch at the wrists, creating a sophisticated balloon effect', 'used', 'Marcus Soh', true, 'assets/sellers/profile1.jpg'),
      new Product('Uniqlo Brown Set', 50, 'assets/products/brownSweatshirt.jpg', '2', 'BT', 'Delivery', 'Worn one to two times', 'likely used', 'Marcus Soh', true, 'assets/sellers/profile2.jpg'),
      new Product('Brown Oversize Tee', 35, 'assets/products/beigeOversizeTee.jpg', '3', 'BT', 'Meet Up', 'Worn one to two times', 'used', 'Marcus Soh', false, 'assets/sellers/profile3.jpg'),
      new Product('Grey Sweatpants', 10, 'assets/products/sweatpants.jpg', '4', 'BS', 'Meet Up', 'Worn one to two times', 'heavily used', 'Marcus Soh', false, 'assets/sellers/profile4.jpg'),
      new Product('White Puffer Coat', 15, 'assets/products/coat.jpg', '5', 'BS', 'Meet Up', 'Worn one to two times', 'used', 'Marcus Soh', false, 'assets/sellers/profile5.jpg'),
      new Product('White Puffer Coat', 15, 'assets/products/coat.jpg', '5', 'BS', 'Meet Up', 'Worn one to two times', 'used', 'Marcus Soh', false, 'assets/sellers/profile5.jpg')
    ];    
    }

  //Get a the products in the product class
  getProducts(): Product[] {
    return this.products;
    }

  //Start :Getting a specific product base on ID : Use in the view products page
  getProductById(id: string): Product |undefined {
    return this.products.find(item => item.id == id);
    }

}
