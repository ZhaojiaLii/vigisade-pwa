import { Component, Input, OnInit} from '@angular/core';
import { Survey } from '../../../survey/interfaces/getSurveys/survey.interface';
import { Result } from '../../../survey/interfaces/results/result.interface';
import { BestPracticeType } from '../../../survey/interfaces/getSurveys/best-practice-type.interface';

@Component({
  selector: 'app-details-best-practice',
  templateUrl: './details-best-practice.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {class : 'card card-full-width mb-10 shadow-none'},
})
export class DetailsBestPracticeComponent implements OnInit {

  @Input() survey: Survey;
  @Input() result: Result;

  public currentTypeBestPracticeSurvey: BestPracticeType = null;

  isCollapsed = true;

  ngOnInit(): void {
    this.currentTypeBestPracticeSurvey = this.survey.typeBestPractice.find((el) => {
      return el.typeBestPracticeId === Number(this.result.resultBestPracticeTypeId);
    });
  }

}
