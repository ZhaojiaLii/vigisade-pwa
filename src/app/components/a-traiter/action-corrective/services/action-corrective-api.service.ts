import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetCorrection } from '../interfaces/getCorrection/getCorrection.interface';
import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveApiService {

  constructor(private http: HttpClient) { }
  updateCorrection(updateCorrectionPayload: UpdateCorrection): Observable<any> {
    return this.http.post(
        '/api/corrective-action/update/',
      JSON.stringify(updateCorrectionPayload),
    ).pipe();
  }

  createCorrection(createCorrectionPayload: CreateCorrection): Observable<any> {
    return this.http.post(
      '/api/corrective-action/create/',
      createCorrectionPayload,
      httpOptions,
    ).pipe();
  }

  loadCorrection(): Observable<GetCorrection> {
    return this.http.get<GetCorrection>(
      '/api/corrective-action/'
    ).pipe();
  }
}
