import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  actionsToHandle = 33;
  visitsThisMonth = 3;
  visitsLastMonth = 4;

  constructor() { }

  ngOnInit() {
  }

}
