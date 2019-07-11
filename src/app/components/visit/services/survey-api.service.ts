import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Survey } from '../interfaces/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {

  constructor(private http: HttpClient) {}

  getSurvey(): Observable<Survey> {
    return this.http.get<Survey>('/api/survey/').pipe(
      map(() => ({
        title: 'Titre Questionnaire',
        categories: [
          {
            title: 'Titre Catégorie',
            questions: [
              {
                label: 'Label Question 1',
                help: 'Aide Question 1'
              },
              {
                label: 'Label Question 2',
              },
            ],
          },
        ],
        bestPracticeLabel: 'Bonne pratique',
        bestPracticeHelp: 'Aide bonne pratique',
      })),
    );
  }

  getResults(): Observable<GetResults> {
    return this.http.get<GetResults>('/api/survey/history/').pipe(
        tap((response) => {
            if (response) {
                // console.log(response);
                return;
            }
        })
    );
  }

  getResult(id: number): Observable<GetResult> {
    return this.http.get<GetResult>('/api/survey/history/' + id + '/').pipe(
        map(() => ({
          id: 1,
          surveyId: 1,
          userId: 2,
          directionId: 1,
          zoneId: 11,
          entityId: 1,
          date: '2019-07-02',
          place: 'Paris',
          client: 'zhli',
          questions: [
            {
              id: 1,
              resultId: 1,
              questionId: 1,
              notation: 'notation',
              comment: 'comment',
              photo: 'photo',
            },
            {
              id: 2,
              resultId: 1,
              questionId: 1,
              notation: 'notation',
              comment: 'comment',
              photo: 'photo',
            },
            {
              id: 3,
              resultId: 1,
              questionId: 1,
              notation: 'notation',
              comment: 'comment',
              photo: 'photo',
            },
          ],
          bestPracticeDone: true,
          bestPracticeComment: '111',
          bestPracticePhoto: 'bestPracticePhoto',
        }))
    );
  }

  createResult(createResult: CreateResult): Observable<number> {
    return this.http.post(
      '/api/survey/create/',
      {},
      {observe: 'response'},
      ).pipe(
        tap((response: HttpResponse<{status: number}>) => {
          if (response && response.status) {
              console.log('create result succeed');
              return;
          }
          throw new Error('Bad credentials.');
        }),
        map(response => response.status)
    );
  }

  updateResult(updateResult: UpdateResult): Observable<number> {
    return this.http.post(
      '/api/survey/update/',
       updateResult,
      {observe: 'response'},
      ).pipe(
        tap((response: HttpResponse<{status: number}>) => {
          if (response && response.status) {
              console.log('update result succeed');
              return;
          }
          throw new Error('Bad credentials.');
        }),
        map(response => response.status)
    );
  }
}
