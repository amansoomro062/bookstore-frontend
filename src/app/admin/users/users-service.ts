import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/constants/app-constant';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { userprofile } from 'src/app/model/userprofile';

@Injectable({
    providedIn: "root"
})
export class UsersService {

    constructor(private httpClient: HttpClient) {

    }
    getUsers(): Observable<userprofile[]> {
        return this.httpClient.get<userprofile[]>(`${API_URL}/getusers`)
            .pipe(
                map(
                    data => {
                        return data;
                    }
                ),
            );
    }

    updateUsers(users: userprofile[]) {

        return this.httpClient.put<userprofile[]>(`${API_URL}/updateusers`, users)
            .pipe(
                map(
                    data => {
                        return data;
                    }
                )
            )

    }


}