import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from '../../visit/services/survey.service';
import { Observable } from 'rxjs';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { HistoryService } from '../../history/services/history.service';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';

@Component({
  selector: 'app-a-traiter-element',
  templateUrl: './a-traiter-element.component.html',
})
export class ATraiterElementComponent implements OnInit {
  @Input() resultId;
  result$: Observable<Result> = this.historyService.getSelectedResult();
  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.historyService.loadResult(this.resultId) ;
  }

}
