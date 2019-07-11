import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../action-corrective/services/action-corrective.service';
import { Observable } from 'rxjs';
import { GetCorrection } from '../action-corrective/interfaces/getCorrection/getCorrection.interface';
import { SurveyService } from '../../visit/services/survey.service';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  fakeData = [
    {
      id: 0,
      client: 'Jean',
      place: '33 Rue des 3 Bornes, 75011 Paris',
      date: '12/05/2019',
    },
    {
      id: 1,
      client: 'Tom',
      place: '32 Rue Ponthieu, 75008 Paris',
      date: '13/05/2019',
    },
    {
      id: 2,
      client: 'John',
      place: 'Place Charles de Gaulle, 75008 Paris',
      date: '14/05/2019',
    },
    {
      id: 3,
      client: 'Tim',
      place: '22 Av. des Champs-Élysées, 75008 Paris',
      date: '15/05/2019',
    },
    {
      id: 4,
      client: 'Jimmy',
      place: '23B Rue las Cases, 75007 Paris',
      date: '15/05/2019',
    },
    {
      id: 5,
      client: 'Han',
      place: '3 Place Saint-Germain des Prés, 75006 Paris',
      date: '15/05/2019',
    },
    {
      id: 6,
      client: 'Sarah',
      place: '8 Rue de Montpensier, 75001 Paris',
      date: '15/05/2019',
    },
  ];
  data = [];
  id = [];
  ID: number;
  surveyId = [];
  categoryId = [];
  resultId = [];
  questionId = [];
  images = [];
  commentQuestions = [];
  clients = [];
  dates = [];
  places = [];
  index = [];
  aTraiterNum = 0;
  correction$: Observable<GetCorrection> = this.correctionService.getCorrection();
  constructor(
    private correctionService: ActionCorrectiveService,
    private resultService: SurveyService,
  ) { }

  ngOnInit() {
    this.correctionService.loadCorrection();
    this.surveyId = [];
    this.questionId = [];
    this.categoryId = [];
    this.resultId = [];
    this.images = [];
    this.commentQuestions = [];
    this.index = [];
    this.correction$.skip(2).subscribe(
      corrections => {
        this.surveyId = [];
        this.questionId = [];
        this.categoryId = [];
        this.resultId = [];
        this.images = [];
        this.commentQuestions = [];
        this.index = [];
        this.data = [];
        this.data.push(corrections);
        this.aTraiterNum = this.data[0].length;
        for (const correction of this.data[0]) {
          this.surveyId.push(correction.survey_id);
          this.questionId.push(correction.question_id);
          this.categoryId.push(correction.category_id);
          this.resultId.push(correction.result_id);
          this.images.push(correction.image);
          this.commentQuestions.push(correction.comment_question);
          this.index.push(correction.id - 1);
        }
        console.log(this.images);
        // for (const resultId of this.resultId) {
        //   this.correctionService.loadResult(resultId);
        //   this.result$.subscribe(result => {
        //     result ? console.log(result.date) : console.log('result null');
        //   });
        // }
      }
    );
  }

  ScrollTop() {
    window.scroll(0, 0);
  }

}
