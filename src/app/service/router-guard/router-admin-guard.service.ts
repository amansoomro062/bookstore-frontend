
import { Injectable } from '@angular/core';
import { BasicauthenticationService } from '../user-status/basic-authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouterAdminGuardService implements CanActivate {
  constructor(private basicAuthenticationService: BasicauthenticationService,
    private http: HttpClient,
    private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean> | boolean {

      if(this.basicAuthenticationService.isUserLogedIn()){
        return true;
      }
      this.router.navigate(['/']);
      return false;
    // return this.myfunction();
  }

  // myfunction(): Promise<boolean>{



  //   let promise1: Promise<boolean> = new Promise((resolve, reject)=> {
  //     setTimeout(()=> {
          
  //         let permission: Observable<boolean>=this.http.get<boolean>(`${API_URL}/userrole`);

  //         permission.subscribe(
  //           (data:boolean)=>{
  //               if(data === true){
  //                 resolve(true);
  //                 console.log('we successed');
  //               }
  //               else{
  //                 reject(false);
  //                 console.log("we success but failed")
  //               }
              
  //           },
  //           error=>{
  //             reject(false);
  //             console.log("we failed badly");
  //           }
  //         )
        
  //     }, 1);
  //   });

  //   return promise1;
  // }



}
