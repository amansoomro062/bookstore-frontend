import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

import { book } from '../../model/book';

import { BookService } from '../../general/book/services/book.service.';
import { CustomeMatSnackBarService } from '../../shared/custome-mat-snack-bar-service';


import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


const books: book[] = [
  new book(1, 'Let Us C', 'Yashvanth Kanethkar', 299.2, 'Science', 'imgage-url=',
    'best book to learn c language for begineers'),
  new book(2, 'C++ deep dive', 'Yashvanth kalu', 399.2, 'Science', 'img',
    'best book to learn c++ language ')

];
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['star', 'id', 'name', 'author_Name', 'price', 'category', 'img_Source', 'description'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) header: MatSort;

  dataSource = new MatTableDataSource(books);
  isMobileActive : boolean = false;


  constructor(private bookService: BookService,
              private customeSnackBar: CustomeMatSnackBarService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private bpObserver: BreakpointObserver

              ) { }

  ngOnInit() {

    this.fetchData();

    const isSmallScreen = this.bpObserver.isMatched('(max-width: 599px)');
      
      if(isSmallScreen){
        this.isMobileActive = true;
      }
    
    this.bpObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
          this.isMobileActive = true;
      }
      else{
          this.isMobileActive = false;
      }
    });
  
        
  }

  fetchData() {
    this.bookService.getBooks().subscribe(
      (books: book[]) => {
        //this.dataSource =  books;
        this.dataSource = new MatTableDataSource(books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.header;
      }
    )
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(bookid: number) {

    let confirmCondition = confirm('Do you want to Delete ?');

    if (confirmCondition) {
      this.bookService.
        deleteBook(bookid).subscribe(
          (data) => {

            this.customeSnackBar.
              showSnackBar('Product Deleted Successfully.')
              .then(
                (resolve) => {
                  this.fetchData();
                  this.dataSource.paginator.firstPage();
                }
              )

          },
          (error) => {
            console.log('delete failed due to ' + error);
          }
        )
    }
    else {
      console.log('item not deleted.');
    }

  }

  onEdit(bookid: number) {
    this.router.navigate(['../editbook',bookid],{relativeTo: this.activatedRoute})
  }


}
