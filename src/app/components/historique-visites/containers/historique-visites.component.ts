import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../visit/services/survey.service';
import { Observable } from 'rxjs';
import { Results } from '../../visit/interfaces/getResultsInterface/results.interface';

@Component({
  selector: 'app-historique-visites',
  templateUrl: './historique-visites.component.html'
})
export class HistoriqueVisitesComponent implements OnInit {
  results$: Observable<Results[]> = this.surveyService.getResults();
  resultsNum$: Observable<number> = this.surveyService.getResultsCount();
  constructor(
    private surveyService: SurveyService,
  ) { }

  ngOnInit() {
    this.surveyService.loadResults();
  }
}
