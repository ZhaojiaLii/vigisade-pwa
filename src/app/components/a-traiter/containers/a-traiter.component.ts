import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { Observable } from 'rxjs';
import { GetCorrection } from '../../action-corrective/interfaces/getCorrection/getCorrection.interface';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { HistoryService } from '../../history/services/history.service';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  data = [];
  resultId = [];
  aTraiterNum = 0;
  correction$: Observable<GetCorrection> = this.correctionService.getCorrection();
  history$: Observable<GetResult> = this.historyService.getHistory();
  constructor(
    private correctionService: ActionCorrectiveService,
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.correctionService.loadCorrection();
  }

  // ScrollTop() {
  //   window.scroll(0, 0);
  // }

}
