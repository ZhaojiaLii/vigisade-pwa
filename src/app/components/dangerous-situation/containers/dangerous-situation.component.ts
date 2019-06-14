import { Component } from '@angular/core';

@Component({
  selector: 'app-dangerous-situation',
  templateUrl: './dangerous-situation.component.html',
  styleUrls: ['./dangerous-situation.component.scss'],
})
export class DangerousSituationComponent {
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
}
