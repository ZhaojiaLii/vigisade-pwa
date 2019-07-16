import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateDangerousSituation } from '../interfaces/create-dangerous-situation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DangerousApiService {

  constructor(private http: HttpClient) {}

  postDangerous(dangerousPayload: CreateDangerousSituation): Observable<any> {
    return this.http.post(
      '/api/dangerous-situation/create/',
      dangerousPayload,
    );
  }
}
