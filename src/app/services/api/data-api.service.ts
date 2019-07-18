import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataApi } from '../../interfaces/api/data-api.interface';
import { Header } from '../../interfaces/header.interface';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {

  constructor(private http: HttpClient) {}

  getData(): Observable<DataApi> {
    return this.http.get<DataApi>('/api/direction-zone-entity-type-dangerous-situation');
  }

  getHeader(): Observable<Header> {
    return this.http.get<Header>('/api/header/');
  }
}
