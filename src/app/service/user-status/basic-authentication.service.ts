import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AUTHENTICATED_USER, AUTHENTICATED_USER_HEADER, API_URL } from '../../constants/app-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicauthenticationService {

  constructor(private http: HttpClient) { }


  isUserLogedIn() {
    let user = localStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem(AUTHENTICATED_USER);
    localStorage.clear();
  }

  getAuthenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedUserHeader() {
    return localStorage.getItem(AUTHENTICATED_USER_HEADER);
  }

  


}
