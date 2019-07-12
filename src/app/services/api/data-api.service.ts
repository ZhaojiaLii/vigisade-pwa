import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataApi } from '../../interfaces/api/data-api.interface';
import { Header } from '../../interfaces/header.interface';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {

  constructor(private http: HttpClient) {}

  static getData(): Observable<DataApi> {
    // @todo: call API
    return of({
      directions: [
        {id: 1, name: 'Direction 1'},
        {id: 2, name: 'Direction 2'},
      ],
      areas: [
        {id: 1, name: 'Area 1', directionId: 1},
        {id: 2, name: 'Area 2', directionId: 1},
        {id: 3, name: 'Area 3', directionId: 2},
        {id: 4, name: 'Area 4', directionId: 2},
      ],
      entities: [
        {id: 1, name: 'Entity 1', areaId: 1},
        {id: 2, name: 'Entity 2', areaId: 1},
        {id: 3, name: 'Entity 3', areaId: 2},
        {id: 4, name: 'Entity 4', areaId: 3},
        {id: 5, name: 'Entity 5', areaId: 4},
      ],
    });
  }

  getHeader(): Observable<Header> {
    return this.http.get<Header>('/api/header/').pipe(
      map(header => header),
    );
  }
}
