import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DelayedRequest } from '../../interfaces/delayed-request.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BufferApiService {
  constructor(
    private http: HttpClient,
  ) {}

  postDelayedRequest(request: DelayedRequest): Observable<any> {
    return this.http.post(request.url, request.payload);
  }
}
