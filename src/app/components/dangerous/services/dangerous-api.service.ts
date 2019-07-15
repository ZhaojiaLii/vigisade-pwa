import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateDangerous } from '../interfaces/createDangerous.interface';
import { Observable } from 'rxjs';
import { GetDangerousType } from '../interfaces/getDangerousType.interface';

@Injectable({
  providedIn: 'root'
})
export class DangerousApiService {

  constructor(private http: HttpClient) { }

  postDangerous(dangerousPayload: CreateDangerous): Observable<any> {
    return this.http.post(
      '/api/dangerous-situation/create/',
      dangerousPayload,
      ).pipe();
  }

  loadDangerousType(): Observable<GetDangerousType> {
    return this.http.get<GetDangerousType>(
      '/api/dangerous-situation/getType/'
    ).pipe();
  }
}
