import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';



// export interface CanComponentDeactivate {
//     canDeactivateMethod: () => Observable<boolean> | Promise<boolean> | boolean
// }
@Injectable({
    providedIn: 'root'
})
// export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate>{

    export class CanDeactivateGuardService {

    // canDeactivate(component: CanComponentDeactivate,
    //     currentRoute: ActivatedRouteSnapshot,
    //     currentState: RouterStateSnapshot,
    //     nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //     return component.canDeactivateMethod();

    // }




}