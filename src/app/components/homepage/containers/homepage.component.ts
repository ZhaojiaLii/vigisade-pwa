import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {

  actionsToHandle = 33;
  visitsThisMonth = 3;
  visitsLastMonth = 4;

  constructor() { }

}
