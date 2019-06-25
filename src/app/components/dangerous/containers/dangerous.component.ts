import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dangerous',
  templateUrl: './dangerous.component.html',
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

  options: FormGroup;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'French',
    });
  }


}
