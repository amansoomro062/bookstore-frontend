import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map, catchError, retry} from 'rxjs/operators';
import { API_URL } from 'src/app/constants/app-constant';
import { userprofile } from 'src/app/model/userprofile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private httpClient: HttpClient) { }

  showProfileInformation():Observable<userprofile>{    
    return this.httpClient.get<userprofile>(`${API_URL}/userprofile`)
    .pipe(
      map(
        data =>{
          return data;
        }        
        ),
    );
  }

  updateProfile(user:userprofile){
  
    return this.httpClient.put<userprofile>(`${API_URL}/userprofile`,user)
    .pipe(
      map(
        data=>{
          return data;
        },
        catchError(error=>{
          return error
        })
      )
    )
  }
  
  validateEmail(username:string){    
    return this.httpClient.get<boolean>(`${API_URL}/userprofile/exists/${username}`)
      .pipe(
        map(
          data =>{
            return data;
            }        
          ),
      );
    
  }

}


