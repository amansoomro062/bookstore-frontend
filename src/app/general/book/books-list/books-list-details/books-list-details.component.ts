import { Component, OnInit, Input } from '@angular/core';
import { book } from '../../../../model/book';
import { CartService } from 'src/app/service/cart.service';
import { CartStorageService } from 'src/app/service/cart.storage.service';
import { BasicauthenticationService } from 'src/app/service/user-status/basic-authentication.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/logged-out-users/login/login.component';
import { CustomeMatDialogService } from 'src/app/shared/custome-mat-dialog-service';


@Component({
  selector: 'app-books-list-details',
  templateUrl: './books-list-details.component.html',
  styleUrls: ['./books-list-details.component.css']
})
export class BooksListDetailsComponent implements OnInit {

  @Input() public books;
  @Input() public selectedCategory;



  image_source = 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg';

  constructor(
    private cartService: CartService,
    private cartStorageService: CartStorageService,
    private basicAuthService: BasicauthenticationService,
    private customeDialog: CustomeMatDialogService,
    private dialog: MatDialog
    
  ) { }

  ngOnInit() {


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
