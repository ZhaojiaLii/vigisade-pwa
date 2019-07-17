import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../visit/interfaces/result.interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HistoryApiService {

  constructor(private http: HttpClient) {}

  getHistory(): Observable<Result[]> {
    // return this.http.get<Result[]>('/api/survey/history/').pipe(
    return of({}).pipe(
      map(() => [
        {
          id: 1,
          surveyId: 1,
          userId: 2,
          directionId: 1,
          areaId: 11,
          entityId: 1,
          date: '2019-07-02',
          place: '23 Boulevard Charner 22000 Saint-Brieuc',
          client: 'Nom du client',
          status: true,
          teamMembers: [
            {
              id: 1,
              resultId: 1,
              firstName: 'Jean-Pierre',
              lastName: 'Nomdefamille',
              role: 'admin',
            },
            {
              id: 2,
              resultId: 2,
              firstName: 'Jean-Pierre',
              lastName: 'Nomdefamille',
              role: 'admin',
            },
          ],
          bestPracticeDone: true,
          bestPracticeComment: '111',
          bestPracticePhoto: 'bestPracticePhoto',
        },
        {
          id: 2,
          surveyId: 1,
          userId: 2,
          directionId: 1,
          areaId: 11,
          entityId: 1,
          date: '2019-07-03',
          place: '32 Rue Ponthieu 75008 Paris',
          client: 'Nom du client',
          status: false,
          teamMembers: [
            {
              id: 1,
              resultId: 1,
              firstName: 'Jean-Pierre',
              lastName: 'Nomdefamille',
              role: 'admin',
            },
          ],
          bestPracticeDone: true,
          bestPracticeComment: '111',
          bestPracticePhoto: 'bestPracticePhoto',
        },
        {
          id: 3,
          surveyId: 1,
          userId: 2,
          directionId: 1,
          areaId: 11,
          entityId: 1,
          date: '2019-07-03',
          place: '33 Rue des 3 Bornes 75011 Paris',
          client: 'Nom du client',
          status: false,
          teamMembers: [
            {
              id: 1,
              resultId: 1,
              firstName: 'Jean-Pierre',
              lastName: 'Nomdefamille',
              role: 'admin',
            },
          ],
          bestPracticeDone: true,
          bestPracticeComment: '111',
          bestPracticePhoto: 'bestPracticePhoto',
        },
      ]),
    );
  }

  getResult(id: number): Observable<Result> {
    // return this.http.get<Result>('/api/survey/history/' + id + '/').pipe(
    return of({}).pipe(
      map(() => ({
        id: 1,
        surveyId: 1,
        userId: 2,
        directionId: 1,
        areaId: 11,
        entityId: 1,
        date: '2019-07-02',
        place: '23 Boulevard Charner 22000 Saint-Brieuc',
        client: 'Nom du client',
        status: true,
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
        teamMembers: [
          {
            id: 1,
            resultId: 1,
            firstName: 'Jean',
            lastName: 'Pierre',
            role: 'admin',
          },
          {
            id: 2,
            resultId: 2,
            firstName: 'Clement',
            lastName: 'Han',
            role: 'admin',
          },
        ],
        bestPracticeDone: true,
        bestPracticeComment: '111',
        bestPracticePhoto: 'bestPracticePhoto',
      }))
    );
  }
}
