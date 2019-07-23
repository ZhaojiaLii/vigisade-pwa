import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { Observable } from 'rxjs';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { HistoryService } from '../../history/services/history.service';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { Correction } from '../../action-corrective/interfaces/getCorrection/correction.interface';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  data = [];
  resultId = [];
  aTraiterNum = 0;
  correction$: Observable<Correction[]> = this.correctionService.getCorrection();
  countCorrection$: Observable<number> = this.correctionService.countCorrection();
  correctionSurvey$: Observable<Survey> = this.correctionService.getCorrectionSurvey();
  correctionQuestion$: Observable<any> = this.correctionService.getCorrectionQuestion();
  history$: Observable<GetResult> = this.historyService.getHistory();
  constructor(
    private correctionService: ActionCorrectiveService,
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.correctionService.loadCorrection();

    this.correctionQuestion$.subscribe(history => {
      console.log(history);
    });
  }

  // ScrollTop() {
  //   window.scroll(0, 0);
  // }

}
