import { Injectable } from '@angular/core';
import { order } from '../model/order';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/app-constant';
import { OrderOrderDetails } from '../model/order-order-details';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class OrderService{

    constructor(private httpClient: HttpClient){

    }
    cancelOrder(item: order): Observable<order> {
        return this.httpClient.put<order>(`${API_URL}/cancelorder`, item);
    }

    confirmOrder(confirmedOrder: order) {
        return this.httpClient.post<order>(`${API_URL}/confirmorder`,confirmedOrder);
    }

    getOrders(){
        return this.httpClient.get<OrderOrderDetails[]>(`${API_URL}/getorders`);   
     }
     getAllOrders(){
        return this.httpClient.get<OrderOrderDetails[]>(`${API_URL}/getallorders`);   
     }

     updateOrder(item: order): Observable<order> {
        return this.httpClient.put<order>(`${API_URL}/order`, item);
    }
}