import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DataApi } from '../../interfaces/api/data-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {

  constructor(private http: HttpClient) {}

  getData(): Observable<DataApi> {
    // @todo: call API
    return of({
      directions: [],
      areas: [],
      entities: [],
    });
  }
}
