import { Component } from '@angular/core';

@Component({
  selector: 'app-dangerous',
  templateUrl: './dangerous.component.html',
  styleUrls: ['./dangerous.component.scss'],
})
export class DangerousComponent {

  TypeSelectElements = [
    {
      id: 0,
      type: 'type 1'
    },
    {
      id: 1,
      type: 'type 2'
    }
  ];

  constructor() { }

}
