import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUser } from '../interfaces/getUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  // private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  /**
   * Gets survey data from API
   */
  getUser(): Observable<GetUser> {
    const url = '/api/user/';
    return this.http.get<GetUser>(url);
  }
}
