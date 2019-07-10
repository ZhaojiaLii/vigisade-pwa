import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  fakeData = [
    {
      id: 0,
      client: 'Jean',
      place: '33 Rue des 3 Bornes, 75011 Paris',
      date: '12/05/2019',
    },
    {
      id: 1,
      client: 'Tom',
      place: '32 Rue Ponthieu, 75008 Paris',
      date: '13/05/2019',
    },
    {
      id: 2,
      client: 'John',
      place: 'Place Charles de Gaulle, 75008 Paris',
      date: '14/05/2019',
    },
    {
      id: 3,
      client: 'Tim',
      place: '22 Av. des Champs-Élysées, 75008 Paris',
      date: '15/05/2019',
    },
    {
      id: 4,
      client: 'Jimmy',
      place: '23B Rue las Cases, 75007 Paris',
      date: '15/05/2019',
    },
    {
      id: 5,
      client: 'Han',
      place: '3 Place Saint-Germain des Prés, 75006 Paris',
      date: '15/05/2019',
    },
    {
      id: 6,
      client: 'Sarah',
      place: '8 Rue de Montpensier, 75001 Paris',
      date: '15/05/2019',
    },
  ];
  id = [];
  clients = [];
  dates = [];
  places = [];
  index = [];
  i = 0;
  aTraiterNum = 0;
  constructor() { }

  ngOnInit() {
    this.test();
  }

  test() {
    this.fakeData.forEach((data) => {
      this.index.push(this.i);
      this.places.push(data.place);
      this.dates.push(data.date);
      this.clients.push(data.client);
      this.id.push(data.id);
      this.i++;
    });
    this.aTraiterNum = this.places.length;
  }

  ScrollTop() {
    window.scroll(0, 0);
  }

}
