import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Survey } from '../interfaces/getSurveyInterface/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { environment } from '../../../../environments/environment';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { AddData } from '../securite/containers/addData';
import { SecurityTemplateComponent } from '../securite/containers/security-template.component';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {

  baseUrl = environment.baseUrl;
  fakeData = {
      title: 'Quia dicta eveniet occaecati ut ut.',
      best_practice_label: 'Provident ea quidem ducimus.',
      best_practice_help: 'Eum mollitia ea adipisci facilis id.',
      categories: [
          {
              title: 'Laborum cum dignissimos earum error sit perferendis ut.',
              questions: [
                  {
                      label: 'Eveniet quis dignissimos facilis.',
                      help: 'Architecto rerum consectetur voluptatem aliquid ipsa et.'
                  },
                  {
                      label: 'Provident animi debitis voluptas.',
                      help: 'Et autem et et sit deserunt asperiores.'
                  }
              ]
          }
      ]
  };
  constructor(private http: HttpClient) {}
    survey: any;
    surveyTitle = '';
    surveyBestPracticeLabel = '';
    surveyBestPracticeHelp = '';
    surveyCategories = [];
    categoryNum = 0;
    questionNum = 0;
    categoryTitle = [];
    categoryQuestions = [];
    questionLabel = [];
    questionHelp = [];
    separateQuestions = [];

    idQuestion = 0;

  getSurvey(): Observable<Survey> {
    const url = this.baseUrl + '/api/survey/';
    return this.http.get<Survey>(url).skip(0).pipe(
        tap((survey) => {
            if (survey) {
                // console.log(response);
                this.survey = survey;
                this.surveyTitle = this.survey.title;
                this.surveyBestPracticeLabel = this.survey.best_practice_label;
                this.surveyBestPracticeHelp = this.survey.best_practice_help;
                this.surveyCategories = survey.categories;
                this.categoryNum = this.surveyCategories.length;
                this.categoryTitle = [];
                this.categoryQuestions = [];
                this.questionLabel = [];
                this.questionHelp = [];
                this.separateQuestions = [];
                this.idQuestion = 0;
                for (const category of this.surveyCategories) {
                    this.categoryTitle.push(category.title);
                    this.categoryQuestions.push(category.questions);
                    this.questionNum = category.questions.length;
                    this.separateQuestions.push(this.questionNum);
                    for (const question of category.questions) {
                        this.questionLabel.push(question.label);
                        this.questionHelp.push(question.help);
                    }
                }
                return;
            }
        })
    );
  }

  getFormData(): any {
      const url = this.baseUrl + '/api/survey/';
      this.http.get<Survey>(url).skip(0).pipe(
          tap((survey) => {
              if (survey) {
                  // console.log(response);
                  this.survey = survey;
                  this.surveyTitle = this.survey.title;
                  this.surveyBestPracticeLabel = this.survey.best_practice_label;
                  this.surveyBestPracticeHelp = this.survey.best_practice_help;
                  this.surveyCategories = survey.categories;
                  this.categoryNum = this.surveyCategories.length;
                  this.categoryTitle = [];
                  this.categoryQuestions = [];
                  this.questionLabel = [];
                  this.questionHelp = [];
                  this.separateQuestions = [];
                  this.idQuestion = 0;
                  for (const category of this.surveyCategories) {
                      this.categoryTitle.push(category.title);
                      this.categoryQuestions.push(category.questions);
                      this.questionNum = category.questions.length;
                      this.separateQuestions.push(this.questionNum);
                      for (const question of category.questions) {
                          this.questionLabel.push(question.label);
                          this.questionHelp.push(question.help);
                      }
                  }
                  return [
                      // tslint:disable-next-line:max-line-length
                      new AddData(SecurityTemplateComponent, {label: this.questionLabel, help: this.questionHelp, questionsNum: this.separateQuestions})
                  ];
              }
          })
      );
  }

  getResults(): Observable<GetResults> {
    const url = this.baseUrl + '/api/survey/history/';
    return this.http.get<GetResults>(url).pipe(
        tap((response) => {
            if (response) {
                console.log(response);
                return;
            }
        })
    );
  }

  getResult(): Observable<GetResult> {
    const id = 0;
    const url = this.baseUrl + '/api/survey/history/' + id + '/';
    return this.http.get<GetResult>(url).pipe(
        tap((response) => {
            if (response) {
                console.log(response);
                return;
            }
        })
    );
  }

  createResult(createResult: CreateResult): Observable<number> {
    const url = this.baseUrl + '/api/survey/create/';
    return this.http.post(url, this.fakeData, {observe: 'response'}, ).pipe(
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
    const url = this.baseUrl + '/api/survey/update/';
    return this.http.post(url, updateResult, {observe: 'response'}, ).pipe(
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
