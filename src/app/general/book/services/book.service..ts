import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { book } from '../../../model/book'
import { API_URL } from 'src/app/constants/app-constant';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getBooks() {
    return this.httpClient.get<book[]>(`${API_URL}/getbooks`);
  }

  getBooksDetailsList() {
    return this.httpClient.get<book[]>(`${API_URL}/getbooks`);
  }

  getBooksCategories() {
    // return  this.httpClient.get<string[]>('http://localhost:8080/getbooks/categories');

    return this.httpClient.get<string[]>(`${API_URL}/getbooks/categories`);
    //return this.httpClient.get<Map<number,any>>('http://localhost:8080/getbooks');
  }
  getBookById(id) {
    return this.httpClient.get<book>(`${API_URL}/getbooks/id/${id}`);
  }

  getBookMaximumId(): Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/getbooks/maxid`);
  }


  addBook(book: book) {
    console.log('lets save ' + JSON.stringify(book));

    return this.httpClient.post<book>(`${API_URL}/addbook`, book)
      .pipe(
        map(
          data => {
            return data;
          },
          catchError(error => {
            console.log("error is " + error)
            return error;
          })
        )
      )
  }

  //update
  updateBook(book: book) {
    console.log('lets update ' + JSON.stringify(book));

    return this.httpClient.put<book>(`${API_URL}/updatebook`, book)
      .pipe(
        map(
          data => {
            return data;
          },
          catchError(error => {
            console.log("error is " + error)
            return error;
          })
        )
      )
  }

  deleteBook(bookid: number): Observable<void> {
    const url = `${API_URL}/deletebook/${bookid}`;
    return this.httpClient.delete<void>(url);
  }




}
