import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from '../../visit/services/survey.service';
import { Observable } from 'rxjs';
import { HistoryService } from '../../history/services/history.service';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';

@Component({
  selector: 'app-a-traiter-element',
  templateUrl: './a-traiter-element.component.html',
})
export class ATraiterElementComponent implements OnInit {
  @Input() resultId;
  question: any;
  history$: Observable<GetResult> = this.historyService.getHistory();
  result$: Observable<Result> = this.historyService.getSelectedResult();
  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private correctionService: ActionCorrectiveService,
  ) { }

  ngOnInit() {
    // this.historyService.selectResult(this.resultId);
    // this.historyService.loadResult(this.resultId);
    this.historyService.loadHistory();
    this.history$.subscribe(val => {
      console.log(val);
    });
  }

}
