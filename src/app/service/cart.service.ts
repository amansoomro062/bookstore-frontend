import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/app-constant';
import { book } from '../model/book';
import { cart } from '../model/cart';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomeMatSnackBarService } from '../shared/custome-mat-snack-bar-service';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    constructor(private httpClient: HttpClient,
        private customeMatSnackBar: CustomeMatSnackBarService) { }


    AddCart(book: book) {
        let item = new cart(null,null, book, book.price, 1, book.price,true);
        return this.httpClient.post<cart>(`${API_URL}/addcart`, item).pipe(
            map(
                data => {
                    this.customeMatSnackBar.showSnackBar("Item Added In The Cart Successfully")
                    return data;
                },
                catchError(
                    error => {
                        this.customeMatSnackBar.showSnackBar("Unable to add into cart..")
                        return error;
                    }
                )
            ));
    }

    clearCart(): Observable<void> {
        return this.httpClient.delete<void>(`${API_URL}/clearcart`);
     }


    deleteCartItem(cartid: number): Observable<void> {
        console.log(cartid);
        const url = `${API_URL}/deletecart/${cartid}`;
        return this.httpClient.delete<void>(url);

    }
    getCart(): Observable<cart[]> {
        return this.httpClient.get<cart[]>(`${API_URL}/getcart`);
    }

    getTottleCartPriceForUser(): Observable<number> {
        return this.httpClient.get<number>(`${API_URL}/usercarttotleprice`);
    }

    updateCart(item: cart): Observable<cart> {
        return this.httpClient.put<cart>(`${API_URL}/updatecart`, item);
    }




}

