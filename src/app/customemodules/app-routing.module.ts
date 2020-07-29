import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BookDetailsComponent } from '../general/book/book-details/book-details.component'

import {BooksListComponent} from '../general/book/books-list/books-list.component'
import { CartComponent } from '../logged-in-users/cart/cart.component';
import { LoginComponent } from '../logged-out-users/login/login.component';
import { SignupComponent } from '../logged-out-users/signup/signup.component';
import { RouteGuardService } from '../service/router-guard/route-guard.service';
import { RouteLogoutGuardService } from '../service/router-guard/router-logout-guard.service';
import { ProfileComponent } from '../logged-in-users/profile/profile.component';
import { AddbookComponent } from '../admin/products/addbook/addbook.component';
import { RouterAdminGuardService } from '../service/router-guard/router-admin-guard.service';
import { ProductsComponent } from '../admin/products/products.component';
import { UsersComponent } from '../admin/users/users.component';
import { CheckoutComponent } from '../logged-in-users/checkout/checkout.component';
import { OrdersComponent } from '../logged-in-users/orders/orders.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';

// { path: 'login', component: LoginComponent },

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: BooksListComponent },

  // { path: '/:category', component: BooksListComponent },

  // { path: 'category/:selectedCategory', component: BooksListComponent},
  { path: 'bookdetails/:id', component: BookDetailsComponent},

  { path: 'cart', component: CartComponent, canActivate:[RouteGuardService] },

  { path: 'checkout', component: CheckoutComponent, canActivate:[RouteGuardService] },

  //order
  { path: 'orders', component: OrdersComponent, canActivate:[RouteGuardService] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate:[RouteGuardService] },


  { path: 'profile', component: ProfileComponent, canActivate:[RouteGuardService] },

  //book component
  { path: 'admin/addbook', component: AddbookComponent, canActivate:[RouterAdminGuardService] },

  { path: 'admin/editbook/:id', component: AddbookComponent, canActivate:[RouterAdminGuardService] },

  { path: 'admin/users', component: UsersComponent, canActivate:[RouterAdminGuardService] },

  { path: 'admin/products', component: ProductsComponent, canActivate:[RouterAdminGuardService] },


  { path: 'login',component: LoginComponent, canActivate:[RouteLogoutGuardService]},

  { path: 'signup',component: SignupComponent, canActivate:[RouteLogoutGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
