import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataApi } from '../../interfaces/api/data-api.interface';
import { Header } from '../../interfaces/header.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {

  constructor(private http: HttpClient) {}

  getData(): Observable<DataApi> {
    return this.http.get<DataApi>('/api/direction-zone-entity-type-dangerous-situation').pipe(
      // Filter null data received from API to prevent unwanted side-effects.
      map(data => ({
        ...data,
        typeDangerousSituations: data.typeDangerousSituations
          .filter(type => !!type),
      })),
    );
  }

  getHeader(): Observable<Header> {
    return this.http.get<Header>('/api/header/');
  }
}
