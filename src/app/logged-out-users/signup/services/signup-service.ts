import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../../../model/user';
import { API_URL } from 'src/app/constants/app-constant';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient) { }

  
   CreateNewUser(newUser:user){
    return  this.httpClient.post(`${API_URL}/CreateUser`,newUser);
  }


}

