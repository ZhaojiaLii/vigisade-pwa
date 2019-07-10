import { Component } from '@angular/core';
import { HomepageService } from '../services/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {

  actionsToHandle = 33;
  visitsThisMonth = 3;
  visitsLastMonth = 4;

  constructor(
    private homepageService: HomepageService,
  ) {
    this.homepageService.loadRequiredData();
  }
}
