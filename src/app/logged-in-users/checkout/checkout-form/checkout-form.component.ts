import { Component, OnInit,OnDestroy, Input, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { cart } from 'src/app/model/cart';
import { NgForm } from '@angular/forms';
import { user } from 'src/app/model/user';
import { userprofile } from 'src/app/model/userprofile';
import { order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/logged-out-users/login/login.component';
import { CartStorageService } from 'src/app/service/cart.storage.service';
import { OrderConfirmedComponent } from '../../order-confirmed/order-confirmed.component';
import { Router, ActivatedRoute } from '@angular/router';

export interface OrderDisplay {
  email: string;
  firstName: string;
  lastName: string;
  shippingAddress: string;
}

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit,OnDestroy {


  @Input("item") cartItems: cart[];
  @ViewChild("checkoutForm", { static: false }) checkOutForm: NgForm;

  orderDetails: OrderDisplay = {
    email: '',
    firstName: '',
    lastName: '',
    shippingAddress: ''
  }
  confirmOrderSubscription: Subscription;
  
  constructor(private orderService: OrderService,
              private cartStorageServive: CartStorageService,
              private dialog: MatDialog,
              private router: Router,
              ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.cartItems.length > 0) {
      let user: userprofile = this.cartItems[0].user;
      this.orderDetails = {
        email: user.username,
        firstName: user.firstname,
        lastName: user.lastname,
        shippingAddress: user.address
      }
    }
  }

  confirmOrder() {

    let formValue = this.checkOutForm.value;


    let confirmedOrder = new order(null, formValue.email, formValue.firstName,
      formValue.lastName, formValue.shippingAddress,
      new Date(),
      null,
      "ordered",
      0,
      ''
    );
    
      let confirmOrder=window.confirm("Please Confirm if you want to confirm order");

    if(confirmOrder){

      this.confirmOrderSubscription =
        this.orderService.confirmOrder(confirmedOrder).subscribe(
        (data:order)=>{
          this.cartStorageServive.clearCartStorage();
          this.orderConfirmedDialog(data);
        }
      )
    }
  }

  orderConfirmedDialog(data: order) {


    let dialogRef = this.dialog.open(OrderConfirmedComponent, {
      width: '350px',
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(this.activatedRoute.snapshot.url[0].path);

       this.router.url==="/checkout" ? this.router.navigate(['/']) : null;     
    });

  }


  ngOnDestroy(){
    if(this.confirmOrderSubscription)
    this.confirmOrderSubscription.unsubscribe();
  }
  
 
  
}
