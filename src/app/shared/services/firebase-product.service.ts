import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseProductService {

  private productsRef = firebase.firestore().collection('products');

  constructor() {}

  //Start : Getting all the products from DB
  getProducts(): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.onSnapshot((querySnapshot) => {
        let products: Product[] = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Product(
            data['name'],
            data['price'],
            data['image'],
            doc['id'],
            data['categories'],
            data['dealMethod'],
            data['details'],
            data['condition'],
            data['seller'],
            data['isFavourite'],
            data['sellerImage']
          );

          if (data['image']) {
            p.imagePath = data['image'];
            const imageRef = firebase.storage().ref().child(data['image']);
            imageRef
              .getDownloadURL()
              .then((url) => {
                p.image = url;
              })
              .catch((error) => {
                console.log('Error: Read image fail ' + error);
              });
          }
          if (data['sellerImage']) {
            p.sellerimagePath = data['sellerImage'];
            const imageRef2 = firebase
              .storage()
              .ref()
              .child(data['sellerImage']);
            imageRef2
              .getDownloadURL()
              .then((url) => {
                p.sellerImage = url;
              })
              .catch((error) => {
                console.log('Error: Read image fail ' + error);
              });
          }

          products.push(p);
        });
        observer.next(products);
      });
    });
  }
  //End : Getting all the products from DB

  //Start : GEtting Product by ID (Retrieve)
  getProductById(id: string): Observable<any> {
    return new Observable((observer) => {
      this.productsRef
        .doc(id)
        .get()
        .then((doc) => {
          let data = doc.data();
          let p = new Product(
            data!['name'],
            data!['price'],
            data!['image'],
            doc['id'],
            data!['categories'],
            data!['dealMethod'],
            data!['details'],
            data!['condition'],
            data!['seller'],
            data!['isFavourite'],
            data!['sellerImage']
          );
          // If there's image, read from Firebase Storage
          if (data!['image']) {
            p.imagePath = data!['image'];
            const imageRef = firebase.storage().ref().child(data!['image']);
            imageRef
              .getDownloadURL()
              .then((url) => {
                p.image = url;
                // Tell the subscriber that image is updated
                observer.next(p);
                console.log('Image is ' + p.image);
              })
              .catch((error) => {
                console.log('Error: Read image fail ' + error);
              });
          }
          observer.next(p);
        });
    });
  }
  //End : GEtting Product by ID (Retrieve)

  //Start : Creating Products (Create)
  add(p: Product) {
    // Let firebase auto generate id
    this.productsRef.add({
    name: p.name,
    price: p.price,
    categories: p.categories,
    dealMethod : p.dealMethod,
    details: p.details,
    condition: p.condition,
    seller: p.seller,
    isFavourite : p.isFavourite
    }).then(doc => {
      if (p.image) {
      const dataUrl = p.imagePath;
      const imageRef = firebase.storage().ref().child(doc.id);
      imageRef.putString(dataUrl, 
     firebase.storage.StringFormat.DATA_URL).then(() => {
      const ref = this.productsRef.doc(doc.id);
      ref.update({image: doc.id});
      });
      }
      });;
  }
  //End : Creating Products (Create)
}
