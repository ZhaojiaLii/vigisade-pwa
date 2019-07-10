import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        zoneId: 1,
        entityId: 1,
        language: 'Français',
        firstName: 'Admin',
        lastName: 'Test',
        photo: 'https://via.placeholder.com/300x300',
        countRemainingActions: 2,
        countCurrentMonthVisits: 3,
        countLastMonthVisits: 4,
      })),
    );
  }
}
