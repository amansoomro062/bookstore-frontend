import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';
import { CartStorageService } from 'src/app/service/cart.storage.service';
import { CustomeMatSnackBarService } from 'src/app/shared/custome-mat-snack-bar-service';
import { CartDetails } from 'src/app/model/cart-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {


  booksCart: cart[] = new Array();
  totle_items_price: number = 0;

  qtyUpdatable = true;

  deleteSubscription: Subscription;
  getSubscription: Subscription;
  getTotleSubscription: Subscription;
  updateSubscription: Subscription;

  displayedColumns: string[] = ['item', 'cost', 'quantity', 'totle_cost', 'star'];
  dataSource: CartDetails[] = new Array();

  totle_quantity: number = 0;
  totleCost: number = 0;
  netCost: number = 0;


  constructor(
    private cartService: CartService,
    private cartStorageService: CartStorageService,
    private customeMatSnackBar: CustomeMatSnackBarService,
  ) { }


  ngOnInit() {
    this.getCartData();
    this.getTotlePrice();
  }


  getCartData() {
    this.getSubscription = this.cartService.getCart().subscribe(
      (cartItems: cart[]) => {
        this.booksCart = cartItems;

        //now calculate initial cart items
        this.displayCartItems()
      }
    )
  }

  getTotlePrice() {

    this.getTotleSubscription = this.cartService.getTottleCartPriceForUser().
      subscribe(
        (totle_price: number) => {
          this.totle_items_price = totle_price;
        }
      )
  }


    clearCart(){
      this.cartService.clearCart().subscribe(
        ()=>{
          this.booksCart = [];
          this.cartStorageService.clearCartStorage();
          this.displayCartItems();
          this.customeMatSnackBar.showSnackBar('Cart is empty');

        }
      )
    }

    // deleteFromCart(cart: cart) {
      deleteFromCart(index: number) {

      let cart = this.booksCart[index];

    this.deleteSubscription = this.cartService.deleteCartItem(cart.id).subscribe(
      (data) => {
        this.cartStorageService.deleteCartItemStorage(cart.book.id);

        this.booksCart = this.cartStorageService.getItemsInCartStorage();
        this.displayCartItems();

        this.getTotlePrice();
        let msg: string;

        this.booksCart.length === 0 ? msg = "Cart is empty" : msg = "Item Deleted From Cart Successfully!";

        this.customeMatSnackBar.showSnackBar(msg);
      }
    )

  }

  isCartEmpty() {
    return this.booksCart.length === 0 ? true : false;

  }

  itemQuantityChanged(index: number, qty: number) {


    this.booksCart[index].quantity = qty;

    this.qtyUpdatable = false;

    this.updateSubscription = this.cartService.updateCart(this.booksCart[index])
      .subscribe(
        (updatedItem: cart) => {
          this.booksCart[index] = updatedItem;
          this.cartStorageService.updateCartStorage(updatedItem);
          this.getTotlePrice();
          
          //now update the view
          this.displayCartItems();

          this.customeMatSnackBar.
            showSnackBar("Item Update Successfully!", 200)
            .then(
              (successValue: string) => {
                this.qtyUpdatable = true;
              }
            )

        }
      )
  }

  //recent added methods
  displayCartItems() {

    //clear previously displaed items
    this.dataSource = [];

    this.booksCart.forEach((item: cart) => {
      let cartDetailsItem: CartDetails = {
        bookid: item.book.id,
        img_src: item.book.img_Source,
        item: item.book.name,
        cost: item.book.price,
        quantity: item.quantity,
        totle_cost: item.totle_price
      };

      this.dataSource.push(cartDetailsItem);
      
      //also update the summary column
      this.calculateSummaryColumn();

    })
  }

  calculateSummaryColumn() {
    this.totle_quantity = 0 ;
    this.totleCost = 0;
    this.netCost = 0;

    this.booksCart.forEach(
      (item) => {
        this.totle_quantity += item.quantity;
        this.totleCost += item.price;
        this.netCost += item.totle_price;
      }
    )
  }


  ngOnDestroy() {
    this.deleteSubscription != null ? this.deleteSubscription.unsubscribe() : '';
    this.getSubscription != null ? this.getSubscription.unsubscribe() : '';
    this.getTotleSubscription != null ? this.getTotleSubscription.unsubscribe() : '';
    this.updateSubscription != null ? this.updateSubscription.unsubscribe() : '';
  }


}
