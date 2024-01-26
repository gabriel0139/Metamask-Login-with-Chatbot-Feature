import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.page.html',
  styleUrls: ['./view-products.page.scss'],
})
export class ViewProductsPage implements OnInit {
  productId: string = '';
  product: Product | undefined;
  
  constructor(
    private route: ActivatedRoute, 
    private productService: FirebaseProductService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId)
      .subscribe((productData: Product) => {
        this.product = productData;
        // Now all product properties are accessible through this.product
      }, (error) => {
        console.error('Error fetching product data:', error);
      });
  }
}
