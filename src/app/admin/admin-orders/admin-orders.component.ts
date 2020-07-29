import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderOrderDetails } from 'src/app/model/order-order-details';
import { OrderService } from 'src/app/service/order.service';
import { order } from 'src/app/model/order';
import { CustomeMatSnackBarService } from 'src/app/shared/custome-mat-snack-bar-service';

// export interface Status {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orderOrderDetailsSubscription: Subscription;
  updateSubscription: Subscription;


  orderOrderDetails: OrderOrderDetails[] = new Array();

 displayedColumns: string[] = ['item', 'cost', 'quantity', 'totle_cost'];


  totle_quantity: number = 0;
  totleCost: number = 0;
  netCost: number = 0;

  panelOpenState = false;


   orderStatus :string [] = ['ordered','process','confirm','shipped','delivered','cancel'];

    selected = 'Process';

  constructor(private orderService: OrderService,
              private customeMatSnackBar: CustomeMatSnackBarService) { }

  ngOnInit() {
    this.orderOrderDetailsSubscription = this.orderService.getAllOrders().subscribe(
        (data: OrderOrderDetails[])=>{
            this.orderOrderDetails = data;
          }
      )
    }

    updateOrder(index:number, toBeUpdatedOrder: order){
      this.updateSubscription = this.orderService.updateOrder(toBeUpdatedOrder)
      .subscribe(
        (updatedOrder: order) => {
          //updating the order
          this.orderOrderDetails[index].order = updatedOrder;
          this.customeMatSnackBar.showSnackBar("Order Update Successfully!")
        }
      )
    }
    ngOnDestroy(){
      if(this.orderOrderDetailsSubscription)
          this.orderOrderDetailsSubscription.unsubscribe();
      this.updateSubscription != null ? this.updateSubscription.unsubscribe() : '';
    }
  }
