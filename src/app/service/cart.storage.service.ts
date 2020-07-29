import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { cart } from '../model/cart';
import { book } from '../model/book';
import { BasicauthenticationService } from './user-status/basic-authentication.service';

@Injectable({
    providedIn: 'root'
})
export class CartStorageService {


    item: cart;

    private cartListSize = new Subject<number>();
    cartListSizeObservable = this.cartListSize.asObservable();


    constructor(private basicAuthService: BasicauthenticationService) { }

    addItemToCartStorage(cartItem: cart) {
        localStorage.setItem("" + cartItem.book.id, JSON.stringify(cartItem));
        this.updateCartListSize();
    }

    addItemsToCartStorage(cartItems: cart[]) {
        cartItems.forEach(
            (item) => {
                localStorage.setItem("" + item.book.id, JSON.stringify(item));
                // localStorage.setItem("" + item.id, JSON.stringify(item));

            }
        )

        this.updateCartListSize();
    }
    clearCartStorage(){
        let keys = Object.keys(localStorage);

        for (let i = 0; i < keys.length; i++) {
            let key: number = + keys[i];
            if (!isNaN(key)) {
            localStorage.removeItem(""+key);
            }
        }
        //clear the cart count
        this.cartListSize.next(0);

    }



    updateCartListSize() {
        this.cartListSize.next(this.getItemsCartStorageCount());

    }

    updateCartStorage(updatedItem: cart) {
        localStorage.removeItem("" + updatedItem.book.id);
        localStorage.setItem("" + updatedItem.book.id, JSON.stringify(updatedItem));
    }


    deleteCartItemStorage(id: number) {
        localStorage.removeItem("" + id);
        this.updateCartListSize();
    }


    getItemsCartStorageCount() {
        let count = 0;

        let keys = Object.keys(localStorage);

        for (let i = 0; i < keys.length; i++) {
            let key: number = + keys[i];
            if (!isNaN(key)) {
                count++;
            }
        }
        return count;
    }


    getItemsInCartStorage(): cart[] {
        let cartItems: cart[] = new Array();

        let keys = Object.keys(localStorage);

        for (let i = 0; i < keys.length; i++) {
            let key: number = + keys[i];
            if (!isNaN(key)) {
                let cart = JSON.parse(localStorage.getItem("" + key));
                cartItems.push(cart);
            }
        }
        return cartItems.slice();
    }


    itemExistsInStorage(id: number): boolean {
        let item = localStorage.getItem("" + id);
        return item != null;
    }

}