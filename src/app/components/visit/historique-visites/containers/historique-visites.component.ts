import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../store/app.state';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-historique-visites',
  templateUrl: './historique-visites.component.html'
})
export class HistoriqueVisitesComponent implements OnInit {
  results: any;
  id = 0;
  clients = [];
  dates = [];
  places = [];
  status = [];
  historyNum = 0;
  constructor(
    private surveyService: SurveyService,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.surveyService.getResults();
    this.handleHistoryData();
  }

  handleHistoryData() {
    this.store.skip(2).pipe(
      select('survey')
    ).subscribe(survey => {
      this.results = survey.results;
      const keys = Object.keys(this.results);
      this.historyNum = keys.length;
    });
  }
}
