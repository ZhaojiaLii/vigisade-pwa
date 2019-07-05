import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs-compat/operator/map';
import {GetCorrection} from '../interfaces/getCorrection/getCorrection.interface';
import {environment} from '../../../../environments/environment';
import {UpdateCorrection} from '../interfaces/updateCorrection/updateCorrection.interface';
import {CreateCorrection} from '../interfaces/createCorrection/createCorrection.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveApiService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;
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
    const url = this.baseUrl + '/api/corrective-action/';
    return this.http.get<GetCorrection>(url).pipe();
  }
}
