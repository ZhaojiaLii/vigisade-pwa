import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUser } from '../interfaces/getUser';
import { environment } from '../../../../environments/environment';

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
    // @todo: you must add the auth token via interceptor to run this endpoint.
    return this.http.get<GetUser>(url);
  }

  Test() {
    const url = this.baseUrl + '/api/user/';
    return this.http.get<GetUser>(url, {
      responseType: 'json',
      observe: 'response'});
  }
}
