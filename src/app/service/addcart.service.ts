import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, AsyncSubject, ReplaySubject } from 'rxjs';
import { book } from '../model/book';
import { isNgTemplate } from '@angular/compiler';
import { cart } from '../model/cart';
import { BasicauthenticationService } from './user-status/basic-authentication.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/app-constant';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})

export class AddCartService {


  // count = 0;
  // item: cart;

  // private _addCartSource = new ReplaySubject<book>(100);
  // addCart$ = this._addCartSource.asObservable();

  // changeToCartItemList = new Subject<number>();



  // constructor(private basicAuthService: BasicauthenticationService,
  //             private cartService: CartService) { }

  // addToCart(book: book) {

  //   this.cartService.AddCart(book).subscribe(
  //     (data) => {
  //           let username = this.basicAuthService.getAuthenticatedUser();
  //           this.item = new cart(null, book, book.price, 1, book.price);
  //           localStorage.setItem("" + book.id, JSON.stringify(this.item));
  //           this.changeToCartItemList.next(this.getItemsCartCount());
  //     }
  //   );

   
  // }

  // deleteFromCart(id: number) {
  //   localStorage.removeItem("" + id);
  //   this.changeToCartItemList.next(this.getItemsCartCount());
  // }
  // getItemsCartCount() {

  //   let count = 0;

  //   let keys = Object.keys(localStorage);

  //   for (let i = 0; i < keys.length; i++) {
  //     let key: number = + keys[i];
  //     if (!isNaN(key)) {
  //       count++;
  //     }
  //   }
  //   return count;
  // }

  // getBooksInCart(): cart[] {
  //   let booksItems: cart[] = new Array();

  //   let keys = Object.keys(localStorage);

  //   for (let i = 0; i < keys.length; i++) {
  //     let key: number = + keys[i];
  //     if (!isNaN(key)) {
  //       let cart = JSON.parse(localStorage.getItem("" + key));
  //       booksItems.push(cart);
  //     }
  //   }
  //   return booksItems.slice();
  // }

  // doesItemExistsInCart(id: number) {
  //   let item = localStorage.getItem("" + id);
  //   return item != null;
  // }


}