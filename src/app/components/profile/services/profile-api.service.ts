import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetUser } from '../interfaces/getUser';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  // private headers = new Headers({'Content-Type': 'application/json'});
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  /**
   * Gets survey data from API
   */
  getUser(): Observable<GetUser> {
    const url = this.baseUrl + '/api/user/';
    return this.http.get<GetUser>(url);
  }

  Test() {
    // tslint:disable-next-line:max-line-length
    return this.http.get<GetUser>('http://127.0.24.1/api/user/');
  }
}
