import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddCartService } from '../../service/addcart.service';
import { BasicauthenticationService } from '../../service/user-status/basic-authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { CartStorageService } from 'src/app/service/cart.storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  cartItems: number;

  subscription: Subscription;

      constructor(
        public basicAuthenticationService: BasicauthenticationService,
        private cartStorageService: CartStorageService,
        private router: Router
      ) { }

  ngOnInit() {

    this.cartItems = this.cartStorageService.getItemsCartStorageCount();

    this.subscription = this.cartStorageService.cartListSizeObservable.subscribe(
      (cartListChangeCount: number) => {
        this.cartItems = cartListChangeCount
      }
    )

  }

  logOut() {
    this.basicAuthenticationService.logOut();

    this.cartItems = this.cartStorageService.getItemsCartStorageCount();

    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
