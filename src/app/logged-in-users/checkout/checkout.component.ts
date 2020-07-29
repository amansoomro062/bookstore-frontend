import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { cart } from 'src/app/model/cart';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  booksCart: cart[] = new Array();
  cartSubscription: Subscription;
  mediaSub: Subscription;
  xsSize: boolean;
  condition: boolean;



  constructor(private cartService: CartService, private router: Router,
    private media: MediaObserver
  ) { }

  ngOnInit() {

    //  this.mediaSub = this.media.asObservable().subscribe(
    //                 (changes: MediaChange[])=>{
    //                     changes.forEach(
    //                       (change: MediaChange)=>{
    //                         if(change.mqAlias==='gt-xs'){
    //                           this.xsSize = true;
    //                         }
    //                         else{
    //                           this.xsSize = false;
    //                         }

    //                       }
    //                     )
    //                 });


    this.cartSubscription = this.cartService.getCart().subscribe(
      (data: cart[]) => {
        this.booksCart = data;

        if (this.booksCart.length === 0) {
          this.router.navigate(['/']);
        }

      }
    )
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    // this.mediaSub.unsubscribe();
  }
}
