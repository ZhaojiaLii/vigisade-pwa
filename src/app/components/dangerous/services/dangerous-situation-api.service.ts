import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';

@Injectable({
  providedIn: 'root',
})
export class DangerousSituationApiService {

  constructor(private http: HttpClient) {}

  postDangerous(dangerousPayload: DangerousSituationPayload): Observable<any> {
    return this.http.post(
      '/api/dangerous-situation/create/',
      dangerousPayload,
    );
  }
}
