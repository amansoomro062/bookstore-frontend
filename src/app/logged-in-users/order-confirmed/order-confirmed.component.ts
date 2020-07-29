import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { order } from 'src/app/model/order';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmedComponent>,
    @Inject(MAT_DIALOG_DATA) public orderDataa: order,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
  
  }

  closeDialog(){
    this.dialogRef.close();
  }

  viewOrders(){
    this.router.navigate(['../orders'],{relativeTo: this.activatedRoute})
    this.dialogRef.close();
  }
}
