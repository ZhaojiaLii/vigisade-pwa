import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UpdateUser } from '../interfaces/updateUser.interface';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//   })
// };

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>('/api/user/');
  }

  updateUser(updateUserPayload: UpdateUser): Observable<any> {
    return this.http.post(
      '/api/user/update/',
      updateUserPayload,
      {observe: 'response'},
    ).pipe(
      tap((response: HttpResponse<{status: number}>) => {
        if (response && response.status === 200) {
          console.log('update profile succeed');
        } else {
          console.log('update profile failed');
        }
      }),
      map(response => response.status),
    );
  }
}
