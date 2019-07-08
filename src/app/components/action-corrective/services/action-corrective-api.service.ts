import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetCorrection } from '../interfaces/getCorrection/getCorrection.interface';
import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveApiService {

  constructor(private http: HttpClient) { }

  updateCorrection(updateCorrectionPayload: UpdateCorrection): Observable<any> {
    return this.http.post(
        '/api/corrective-action/update/',
      updateCorrectionPayload,
    ).pipe();
  }

  createCorrection(createCorrectionPayload: CreateCorrection): Observable<any> {
    return this.http.post(
      '/api/corrective-action/create/',
      createCorrectionPayload,
    ).pipe();
  }

  getCorrection(): Observable<GetCorrection> {
    const url = '/api/corrective-action/';
    return this.http.get<GetCorrection>(url).pipe();
  }
}
