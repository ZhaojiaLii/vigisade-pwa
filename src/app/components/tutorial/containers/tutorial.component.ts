import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
})
export class TutorialComponent {

  constructor(private location: Location) { }

  clickBack() {
    this.location.back();
  }

}
