import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, AfterContentChecked, OnChanges, SimpleChanges, DoCheck, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { cart } from 'src/app/model/cart';
import { Summary } from 'src/app/model/Summary';


// export interface Summary {
//   item: string;
//   cost: number;
//   quantity: number;
//   totle_cost: number;
// }

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.css']
})

export class CheckoutDetailsComponent implements OnChanges {

  @Input("item") cartItems: cart[];

  displayedColumns: string[] = ['item', 'cost', 'quantity', 'totle_cost'];
  dataSource: Summary[] = new Array();
  totle_quantity: number=0;
  totleCost: number=0;
  netCost: number=0;


  calculateSummaryColumn(){   
    this.cartItems.forEach(
      (item)=>{
       this.totle_quantity += item.quantity;
        this.totleCost += item.price;
        this.netCost += item.totle_price;
      }
    )
  }

  
  ngOnChanges(change: SimpleChanges) {

    //just comment this and everything breaks
    this.dataSource = [];

    let changedValue = <cart[]>change['cartItems'].currentValue;

    let changeDetection: boolean = change['cartItems'].currentValue !== change['cartItems'].previousValue

    if (changeDetection) {
      this.calculateSummaryColumn();

      changedValue.forEach((item: cart) => {
        let summaryItem: Summary = { item: item.book.name, cost: item.book.price, quantity: item.quantity, totle_cost: item.totle_price };
        this.dataSource.push(summaryItem);
      })
    }

  }
}
