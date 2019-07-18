import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    return this.http.get<User>('/api/user/').pipe(
      // @todo: remove this MAP when the API is OK
      map(() => ({
        mail: 'admin_0@gmail.com',
        directionId: 1,
        areaId: 1,
        entityId: 1,
        firstName: 'Admin',
        lastName: 'Test',
        photo: 'https://via.placeholder.com/300x300',
        countRemainingActions: 2,
        countCurrentMonthVisits: 3,
        countLastMonthVisits: 4,
      })),
    );
  }

  updateUser(updateUserPayload: User): Observable<any> {
    return this.http.post(
      '/api/user/update/',
      updateUserPayload,
      {observe: 'response'},
    ).pipe(
      tap((response: HttpResponse<{status: number}>) => {
        if (response && response.status) {
          console.log('update profile succeed');
        } else {
          console.log('update profile failed');
        }
      }),
      map(response => response.status),
    );
  }
}
