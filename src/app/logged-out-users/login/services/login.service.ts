import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { API_URL, AUTHENTICATED_USER, AUTHENTICATED_USER_HEADER } from 'src/app/constants/app-constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  basicAuthUser(username:string,password:string){
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
        Authorization: basicAuthHeaderString
      })


    return this.httpClient.get<any>(`${API_URL}/basicauth`,{headers})
    .pipe(
        map(
          data => {
            localStorage.setItem(AUTHENTICATED_USER, username);
            localStorage.setItem(AUTHENTICATED_USER_HEADER, basicAuthHeaderString);
            return data;

          },
          error=>{
            console.log('errors '+error);
          }
        ),

      );
  }

}
