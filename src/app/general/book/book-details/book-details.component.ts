import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service.';
import { book } from '../../../model/book';
import { CartService } from 'src/app/service/cart.service';
import { CartStorageService } from 'src/app/service/cart.storage.service';
import { BasicauthenticationService } from 'src/app/service/user-status/basic-authentication.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/logged-out-users/login/login.component';
import { CustomeMatDialogService } from 'src/app/shared/custome-mat-dialog-service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id;
  book: book;
  isModelOpen: boolean = false;

  constructor(
    private basicAuthService: BasicauthenticationService,
    private bookService: BookService,
    private cartService: CartService,
    private cartStorageService: CartStorageService,
    private route: ActivatedRoute,
    private customeDialog: CustomeMatDialogService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getBookDetails();
  }

  getBookDetails() {
    //dummy object to avoid null exception
    // this.book = new book(33,'S','D',23,'23','SD');

    this.bookService.getBookById(this.id).
      subscribe(
        data => {
          this.book = data;
        }
      )
  }


  addToCart(book: book) {

    if (this.basicAuthService.isUserLogedIn()) {
      this.cartService.AddCart(book).subscribe(
        (data) => {
          this.cartStorageService.addItemToCartStorage(data);

        }
      )
    }
    else {
      this.openLoginModel(book);
    }
  }
  openLoginModel(book: book) {

    localStorage.setItem("special_item", JSON.stringify(book));
    this.customeDialog.isDialogOpened = true;
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("special_item");
      this.customeDialog.isDialogOpened = false;
    });
  }

  isItemInCart(id: number) {
    return this.cartStorageService.itemExistsInStorage(id);
  }


}
