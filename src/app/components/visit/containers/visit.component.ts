import { Component } from '@angular/core';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
})
export class VisitComponent {
  selected = 'option2';
  constructor(private surveyService: SurveyService) { }

  getSurvey() {
    this.surveyService.getSurvey();
  }

  getResults() {
    this.surveyService.getResults();
  }

  getResultByID() {
    this.surveyService.getResult();
  }
}
