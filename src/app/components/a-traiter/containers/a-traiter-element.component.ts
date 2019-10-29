import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from '../../survey/services/survey.service';
import { Observable } from 'rxjs';
import { HistoryService } from '../../history/services/history.service';
import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';
import { Correction } from '../../action-corrective/interfaces/getCorrection/correction.interface';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map } from 'rxjs/operators';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-a-traiter-element',
  templateUrl: './a-traiter-element.component.html',
})
export class ATraiterElementComponent implements OnInit {
  @Input() resultId;
  @Input() correctionId;
  @Input() dangerousId;
  @Input() isDesktop: boolean;
  result: any;
  categoryId: number;
  categoryTitle: string;
  correctionDate: string;
  userName: string;
  history$: Observable<GetResult> = this.historyService.getHistory();
  correction$: Observable<Correction[]>;
  getCorrectionCategory$: Observable<any> = this.correctionService.getCorrectionCategory();
  getDangerousType$: Observable<string> = this.dataService.getDangerousSituationTypes().pipe(
    map(types => {
      const getType = types.find(type => type.typeDangerousSituationsId === this.dangerousId);
      return getType.typeDangerousSituationTranslation.typeDangerousSituationTranslationType;
    }));
  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private correctionService: ActionCorrectiveService,
    private deviceService: DeviceDetectorService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    if (this.deviceService.isDesktop()) {
      this.correction$ = this.correctionService.getDesktopCorrectionByDate();
    } else {
      this.correction$ = this.correctionService.getMobileCorrectionByDate();
    }
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
            this.correctionDate = moment(correction.date).format('DD-MM-YYYY');
            this.userName = correction.resultUserfirstName + ' ' + correction.resultUserlastName;
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
