import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { BooksListComponent } from './general/book/books-list/books-list.component';
import { NavbarComponent } from './general/navbar/navbar.component';
import { BooksListDetailsComponent } from './general/book/books-list/books-list-details/books-list-details.component';
import { BookDetailsComponent } from './general/book/book-details/book-details.component';
import { CartComponent } from './logged-in-users/cart/cart.component';
import { LoginComponent } from './logged-out-users/login/login.component';
import { SignupComponent } from './logged-out-users/signup/signup.component';
import { ProfileComponent } from './logged-in-users/profile/profile.component';
import { AddbookComponent } from './admin/products/addbook/addbook.component';
import { UsersComponent } from './admin/users/users.component';
import { ProductsComponent } from './admin/products/products.component';


import { HttpIntercepterBasicAuthService } from './service/http-intercepters/http-intercepter-basic-auth.service';

import { AppRoutingModule } from './customemodules/app-routing.module';
import { MaterialModule } from './customemodules/material.module';
import { CustomeformModule } from './customemodules/customeform.module';
import { SidenavbarListComponent } from './sidenavbar-list/sidenavbar-list.component';
import { CheckoutComponent } from './logged-in-users/checkout/checkout.component';
import { CheckoutDetailsComponent } from './logged-in-users/checkout/checkout-details/checkout-details.component';
import { CheckoutFormComponent } from './logged-in-users/checkout/checkout-form/checkout-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderConfirmedComponent } from './logged-in-users/order-confirmed/order-confirmed.component';
import { OrdersComponent } from './logged-in-users/orders/orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    NavbarComponent,
    BooksListDetailsComponent,
    BookDetailsComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    AddbookComponent,
    ProductsComponent,
    UsersComponent,
    SidenavbarListComponent,
    CheckoutComponent,
    CheckoutDetailsComponent,
    CheckoutFormComponent,
    OrderConfirmedComponent,
    OrdersComponent,
    AdminOrdersComponent,
  ],
  entryComponents: [OrderConfirmedComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    CustomeformModule,
    MaterialModule,
    FlexLayoutModule
 
  ],
  providers:  [{provide:HTTP_INTERCEPTORS,useClass: HttpIntercepterBasicAuthService,multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
