import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../visit/services/survey.service';
import { Observable } from 'rxjs';
import { Result } from '../../visit/interfaces/result.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  history$: Observable<Result[]> = this.surveyService.getHistory();

  countHistory$: Observable<number> = this.surveyService.countHistory();

  constructor(
    private surveyService: SurveyService,
  ) { }

  ngOnInit() {
    this.surveyService.loadHistory();
  }
}
