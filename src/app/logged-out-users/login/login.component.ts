import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/logged-out-users/login/services/login.service';
import { CartService } from 'src/app/service/cart.service';
import { cart } from 'src/app/model/cart';
import { CartStorageService } from 'src/app/service/cart.storage.service';
import { book } from 'src/app/model/book';
import { MatDialog } from '@angular/material';
import { CustomeMatDialogService } from 'src/app/shared/custome-mat-dialog-service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  showError = false;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private cartService: CartService,
    private cartStorageService: CartStorageService,
    public customeDialog: CustomeMatDialogService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addToCart(book: book) {

    this.cartService.AddCart(book).subscribe(
      (data) => {
        this.cartStorageService.addItemToCartStorage(data);

      }
    )
  }

  loginUser() {

    this.loginService.basicAuthUser(this.username, this.password)
      .subscribe(
        data => {
          this.updateCartStorage();
          this.updatedSpecialItem();

            this.dialog.closeAll();
          this.router.navigate(['/']);
        },
        error => {
          this.showError = true;
        }
      );
  }

  //used for  special item to  be added to user when logges in  from model
  updatedSpecialItem() {
    let itemString = localStorage.getItem("special_item");
    let book: book = JSON.parse(itemString);

    if(book!==null){
      this.addToCart(book);
    }
    else{
      console.log('we have null;')
    }

  }

  signUp(){

      this.router.navigate(['/signup']);



  }
  updateCartStorage() {

    this.cartService.getCart().subscribe(
      (cartItems: cart[]) => {
        this.cartStorageService.addItemsToCartStorage(cartItems);
      }
    )
  }

}
