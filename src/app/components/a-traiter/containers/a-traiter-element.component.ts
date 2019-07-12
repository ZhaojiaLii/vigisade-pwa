import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from '../../visit/services/survey.service';
import { Observable } from 'rxjs';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { Survey } from '../../visit/interfaces/survey.interface';

@Component({
  selector: 'app-a-traiter-element',
  templateUrl: './a-traiter-element.component.html',
})
export class ATraiterElementComponent implements OnInit {
  @Input() resultId;
  result$: Observable<GetResult> = this.surveyService.getResult();
  survey$: Observable<Survey> = this.surveyService.getSurvey();
  constructor(
    private surveyService: SurveyService,
  ) { }

  ngOnInit() {
    this.surveyService.loadResult(this.resultId) ;
  }

}
