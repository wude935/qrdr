import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private toastController: ToastController) {}

  cart$ = new BehaviorSubject([]);

  initializeCart() {
    this.cart$.next([]);
  }

  getCart() {
    this.cart$.subscribe(result => console.log('CART:', result));
  }

  //Adds menu item to the cart with an id and displays a toast of the item added
  async addCart(menuItem) {
    let newCart = [...this.cart$.value, menuItem];
    newCart.forEach((item, index) => {
      item.id = index;
    });
    this.cart$.next(newCart);
    let toast = await this.toastController.create({
      message: `Item added to cart: ${menuItem.name}`,
      duration: 2000,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }
}