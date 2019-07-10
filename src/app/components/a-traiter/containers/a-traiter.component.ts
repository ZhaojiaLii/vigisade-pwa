import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../action-corrective/services/action-corrective.service';

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
  i = 0;
  aTraiterNum = 0;
  constructor(
    private correctionService: ActionCorrectiveService,
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
    this.correctionService.getCorrection().skip(2).subscribe(
      actionCorrectives => {
        this.data.push(actionCorrectives);
        this.aTraiterNum = this.data[0].length;
        for (const actionCorrective of this.data[0]) {
          this.surveyId.push(actionCorrective.survey_id);
          this.questionId.push(actionCorrective.question_id);
          this.categoryId.push(actionCorrective.category_id);
          this.resultId.push(actionCorrective.result_id);
          this.images.push(actionCorrective.image);
          this.commentQuestions.push(actionCorrective.comment_question);
          this.index.push(actionCorrective.id - 1);
        }
        console.log(this.commentQuestions);
      }
    );
  }

  test() {
    this.fakeData.forEach((data) => {
      this.index.push(this.i);
      this.places.push(data.place);
      this.dates.push(data.date);
      this.clients.push(data.client);
      this.id.push(data.id);
      this.i++;
    });
    this.aTraiterNum = this.places.length;
  }

  ScrollTop() {
    window.scroll(0, 0);
  }

}
