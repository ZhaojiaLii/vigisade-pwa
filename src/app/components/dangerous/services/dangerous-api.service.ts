import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DangerousSituation } from '../interfaces/dangerous-situation.interface';

@Injectable({
  providedIn: 'root',
})
export class DangerousApiService {

  constructor(private http: HttpClient) {}

  postDangerous(dangerousPayload: DangerousSituation): Observable<any> {
    return this.http.post(
      '/api/dangerous-situation/create/',
      dangerousPayload,
    );
  }
}
