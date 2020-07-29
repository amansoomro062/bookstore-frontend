import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service.';
import { book } from '../../../model/book';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { resolve } from 'url';
import { promise } from 'protractor';
import { Subscription } from 'rxjs';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],

})

export class BooksListComponent implements OnInit,OnDestroy {

  books: book[] = [];
  origninal_books: book[] = [];
  categories: string[] = [];
  paramSubscription: Subscription;

  selectedCategory: string;
  defaultSelectedCategory: string = 'Top'

  constructor(private bookService: BookService,
    private activatedRouter: ActivatedRoute) { }


  ngOnInit() {

    //we have to make sure we have required books detai;s list and categories list

    this.getBooksDetailsList()


    this.selectedCategory = this.defaultSelectedCategory;
  }

  getBooksDetailsList() {
    this.bookService.getBooksDetailsList().subscribe(
      data => {
        this.books = data;
        this.origninal_books = this.books;
        //fetching categories
        this.getBooksCategories();

      })
  }


  getBooksCategories() {
    this.bookService.getBooksCategories().subscribe(
      data => {
        this.categories = data;
        //fetching queryparams
        this.getQueryParams();
      }
    );
  }
  getQueryParams() {
    this.paramSubscription = this.activatedRouter.queryParams.subscribe(
      (params: Params) => {
        let category = params["category"];

        this.showBooksByCategory(category);

      }
    )

    // this.paramSubscription = this.activatedRouter.params.subscribe(
  //     (params: Params) => {
  //       let category = params["selectedCategory"];

  //       this.showBooksByCategory(category);

  //     }
  //   )
  }

  showBooksByCategory(category) {
    if (category === undefined) {
      this.books = this.origninal_books;
      this.selectedCategory = this.defaultSelectedCategory;
      return;
    }


    this.selectedCategory = category;
    this.books = this.origninal_books;
    this.books = this.books.filter(book => book.category === category)

  }

  ngOnDestroy(){
    if(this.paramSubscription)
    this.paramSubscription.unsubscribe();
  }
}
