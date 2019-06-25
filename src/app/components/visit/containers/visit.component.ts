import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
})
export class VisitComponent {
  selected = 'option2';
  refresh: number;
  options: FormGroup;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'French',
    });
  }

  public inputVal: any;
  public updateInput() {
    this.inputVal = Math.random();
  }

}
