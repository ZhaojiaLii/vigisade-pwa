import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  index = [];
  i = 0;
  historyNum = 0;
  fakeData = [
    {
      client: 'Jean',
      place: '33 Rue des 3 Bornes, 75011 Paris',
      date: '12/05/2019',
      status: 'en cours'
    },
    {
      client: 'Tom',
      place: '32 Rue Ponthieu, 75008 Paris',
      date: '13/05/2019',
      status: 'en cours'
    },
    {
      client: 'John',
      place: '33 Rue des 3 Bornes, 75011 Paris',
      date: '14/05/2019',
      status: 'en cours'
    },
    {
      client: 'Tim',
      place: '33 Rue des 3 Bornes, Paris',
      date: '15/05/2019',
      status: 'en cours'
    },
  ];
  constructor(
    private surveyService: SurveyService,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.surveyService.getResults();
    this.test();
    // this.handleHistoryData();
  }

  // handleHistoryData() {
  //   this.store.skip(2).pipe(
  //     select('survey')
  //   ).subscribe(survey => {
  //     this.results = survey.results;
  //     const keys = Object.keys(this.results);
  //     this.historyNum = keys.length;
  //   });
  // }

  test() {
    this.fakeData.forEach((data) => {
      this.index.push(this.i);
      this.places.push(data.place);
      this.status.push(data.status);
      this.dates.push(data.date);
      this.clients.push(data.client);
      this.i++;
    });
    this.historyNum = this.places.length;
  }
}
