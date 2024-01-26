import { Component } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseProductService } from '../shared/services/firebase-product.service';

@Component({
  selector: 'app-Marketplace',
  templateUrl: 'Marketplace.page.html',
  styleUrls: ['Marketplace.page.scss']
})
export class MarketplacePage {

  products: Product[] = [];
  redHeart : string = "";
  constructor(private productService:  FirebaseProductService, private toastController: ToastController, private router: Router ) {
    
    //Displaying all the products from DB
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  async addToFavToast(item: Product) {
    const toast = await this.toastController.create({
    message: item.name + ' added to Favourite',
    duration: 2000,
    position: 'top',
    color: 'secondary'
    });
    toast.present();
    }

    addproductpage() {
      this.router.navigate(['add-product']);
    }

}
