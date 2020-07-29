import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Subscription } from 'rxjs';
import { OrderOrderDetails } from 'src/app/model/order-order-details';
import { order } from 'src/app/model/order';
import { CustomeMatSnackBarService } from 'src/app/shared/custome-mat-snack-bar-service';
import { OrderDetails } from 'src/app/model/order-details';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit,OnDestroy {

  orderOrderDetailsSubscription: Subscription;
  
  orderOrderDetails: OrderOrderDetails[] = new Array();

  displayedColumns: string[] = ['item', 'cost', 'quantity', 'totle_cost'];

  totle_quantity: number = 0;
  totleCost: number = 0;
  netCost: number = 0;

  panelOpenState = false;
   
  orderStatusMap:Map<string,string> = new Map();


  constructor(private orderService: OrderService,
              private customeMatSnackBar: CustomeMatSnackBarService ) {
    


    this.orderStatusMap.set('canceled','red');

    this.orderStatusMap.set('ordered','brown');
    this.orderStatusMap.set('process','blue');
    this.orderStatusMap.set('confirm','darkgreen');
    this.orderStatusMap.set('shipped','darkblue');
    this.orderStatusMap.set('delivered','green');
    this.orderStatusMap.set('cancel','red');
  }

  ngOnInit() {
    this.orderOrderDetailsSubscription = this.orderService.getOrders().subscribe(
        (data: OrderOrderDetails[])=>{
            this.orderOrderDetails = data;
          }
      )
    }
    applyFilter(filterValue: string) {
     
     
    }


    cancelOrder(index:number, toBeCanceledOrder: order) {
          let confirmCondition = confirm("Are you sure you want to cancel? Once order cancel it cannot be uncanceled");
          
          if(confirmCondition){
            console.log('lets cancel');
              console.log(toBeCanceledOrder);

            this.orderService.cancelOrder(toBeCanceledOrder).subscribe(
                  (canceledOrder:order)=>{
                    this.orderOrderDetails[index].order = canceledOrder;
                    this.customeMatSnackBar.showSnackBar("Order Canceled Successfully!")
                  }
                )
            }
    }
    getStatusColor(orderStatus: string){
     return this.orderStatusMap.get(orderStatus);
    }
    
    ngOnDestroy(){
      if(this.orderOrderDetailsSubscription)
          this.orderOrderDetailsSubscription.unsubscribe();
    }
}
