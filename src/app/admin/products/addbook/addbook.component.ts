import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {  ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { book } from '../../../model/book';

import { BookService } from '../../../general/book/services/book.service.';
import { CustomeMatSnackBarService } from '../../../shared/custome-mat-snack-bar-service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit,AfterViewInit {

  showSpinner: boolean = false;
  book: book = new book(NaN, '', '', null, '', '', '');
  

  options: string[] = ['One', 'Two', 'Three'];

  editMode = false;
  
  @ViewChild('addBookForm',{static:false}) bookForm: NgForm;

  constructor(private bookService: BookService,
    private customeMatSnackBar: CustomeMatSnackBarService,
    private activatedRoute: ActivatedRoute) { }

 
    ngOnInit(){

    }
  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let id = +params['id']
        //edit 
        if (!isNaN(id)) {
          this.editMode = true;
          this.bookService.getBookById(id).subscribe(
            data => {
              this.book = data
            },
            error => {
              console.log(error)
            }
          )
        }
        else {
          //addnew
          this.getMaxBookId();
        }
      }
    )
  }

  getMaxBookId(){
    this.bookService.getBookMaximumId()
            .subscribe(
              (id: number) => {
                //reset form
                console.log('lets reset form') 
                
                console.log( this.bookForm.errors);



                 this.book = new book(id, '', '', null, '', '', '');
              },
              error => {
                console.log(error);
              }
            )
  }
  addBook() {
    this.showSpinner = true;

  if(!this.editMode) {
    this.bookService.addBook(this.book)
      .subscribe(

        data => {
          this.customeMatSnackBar
            .showSnackBar('Book Inserted Successfully.')
            .then(data => {
              this.showSpinner = false;
              this.getMaxBookId();
            })

            
        },
        error => {
          console.log(error);
        })
  }
  else{

    this.bookService.updateBook(this.book)
    .subscribe(

      data => {
        this.customeMatSnackBar
          .showSnackBar('Book Updated Successfully.')
          .then(data => {
            this.showSpinner = false;
          })
      },
      error => {
        console.log(error);
      })

  }

  }

}
