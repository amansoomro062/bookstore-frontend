import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BasicauthenticationService } from '../user-status/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteLogoutGuardService implements CanActivate {

      constructor(private basicAuthenticationService:BasicauthenticationService,
              private router:Router)
               { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    if(this.basicAuthenticationService.isUserLogedIn()){
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
  
}
