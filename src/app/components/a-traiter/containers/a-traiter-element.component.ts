import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from '../../survey/services/survey.service';
import { Observable } from 'rxjs';
import { HistoryService } from '../../history/services/history.service';
import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';
import { Correction } from '../../action-corrective/interfaces/getCorrection/correction.interface';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';

@Component({
  selector: 'app-a-traiter-element',
  templateUrl: './a-traiter-element.component.html',
})
export class ATraiterElementComponent implements OnInit {
  @Input() resultId;
  @Input() correctionId;
  @Input() isDesktop: boolean;
  result: any;
  categoryId: number;
  categoryTitle: string;
  history$: Observable<GetResult> = this.historyService.getHistory();
  correction$: Observable<Correction[]> = this.correctionService.getCorrection();
  getCorrectionCategory$: Observable<any> = this.correctionService.getCorrectionCategory();
  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private correctionService: ActionCorrectiveService,
  ) { }

  ngOnInit() {
    this.historyService.loadHistory();
    this.history$.subscribe(histories => {
      if (histories && histories.result) {
        this.result = histories.result.find(result => result.resultId === this.resultId);
      }
    });
    this.correction$.subscribe(
      corrections => {
        for (const correction of corrections) {
          if (correction.id === this.correctionId) {
            this.categoryId = correction.category_id;
          }
        }
      }
    );
    this.getCorrectionCategory$.subscribe(categories => {
      if (categories) {
        const temp = categories.find(category => category.surveyCategoryId === this.categoryId);
        this.categoryTitle = temp ? temp.surveyCategoryTitleTranslation.surveyCategoryTranslatableTitle : null;
      }
    });
  }

}
