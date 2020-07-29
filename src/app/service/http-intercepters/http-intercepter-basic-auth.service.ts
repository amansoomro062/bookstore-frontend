import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicauthenticationService } from '../user-status/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService {

  private basicAuthHeaderString:string;
  
  constructor(private basicAuthenticationService:BasicauthenticationService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler){
       
      if( this.basicAuthenticationService.isUserLogedIn() ){
        request=request.clone(
              {
              setHeaders:{
                  Authorization:this.basicAuthenticationService.getAuthenticatedUserHeader()
                }
              }
          )
        }
    
      return next.handle(request);       
  }
}
