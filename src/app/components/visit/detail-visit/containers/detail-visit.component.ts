import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-visit',
  templateUrl: './detail-visit.component.html',
})
export class DetailVisitComponent implements OnInit {
  fakeData = [
    {
      id: 0,
      client: 'Jean',
      place: '33 Rue des 3 Bornes, 75011 Paris',
      date: '12/05/2019',
      status: 'en cours',
      entity: 'Agence lorem ipsum',
      team: [
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
      ],
    },
    {
      id: 1,
      client: 'Tom',
      place: '32 Rue Ponthieu, 75008 Paris',
      date: '13/05/2019',
      status: 'en cours',
      entity: 'Agence lorem ipsum',
      team: [
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
      ],
    },
    {
      id: 2,
      client: 'John',
      place: '33 Rue des 3 Bornes, 75011 Paris',
      date: '14/05/2019',
      status: 'en cours',
      entity: 'Agence lorem ipsum',
      team: [
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
      ],
    },
    {
      id: 3,
      client: 'Tim',
      place: '33 Rue des 3 Bornes, Paris',
      date: '15/05/2019',
      status: 'en cours',
      entity: 'Agence lorem ipsum',
      team: [
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
        {
          firstName: 'Jean-Pierre',
          lastName: 'Nomdefamille',
          role: 'admin',
        },
      ],
    },
  ];
  selectedId: number;
  nextResultId: number;
  selectedResult: any;
  isCollapsed = false;
  entity: string;
  place: string;
  client: string;
  date: string;
  team = [];
  firstName = [];
  lastName = [];
  role = [];
  memberNum: number;
  resultNum: number;
  i = 0;
  index = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('id');
      this.resultNum = this.fakeData.length;
      this.selectedResult = this.fakeData.find(x => x.id === this.selectedId);
      this.entity = this.selectedResult.entity;
      this.place = this.selectedResult.place;
      this.client = this.selectedResult.client;
      this.date = this.selectedResult.date;
      this.team = this.selectedResult.team;
      this.memberNum = this.team.length;
      this.team.forEach((data) => {
        this.index.push(this.i);
        this.firstName.push(data.firstName);
        this.lastName.push(data.lastName);
        this.role.push(data.role);
        this.i++;
      });
    });
  }

  nextResult() {
    this.team = [];
    this.firstName = [];
    this.lastName = [];
    this.role = [];
    this.index = [];
    this.i = 0;
    this.nextResultId = this.selectedId + 1;
    if (this.nextResultId > this.resultNum - 1) {
      // if the result is the last one, navigate to the first result
      this.nextResultId = 0;
      this.router.navigate(['/history', this.nextResultId]);
      window.scroll(0, 0);
      this.toastrService.success('Retourner à la première', 'Visite: ' + this.nextResultId);
    } else {
      this.router.navigate(['/history', this.nextResultId]);
      window.scroll(0, 0);
      this.toastrService.success('Succèss', 'Visite: ' + this.nextResultId);
    }
  }

}
