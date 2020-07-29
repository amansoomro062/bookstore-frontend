import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { BasicauthenticationService } from '../user-status/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})

export class RouteGuardService implements CanActivate{

  constructor(private basicAuthenticationService:BasicauthenticationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
 
    if(this.basicAuthenticationService.isUserLogedIn()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
