import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-action-corrective',
  templateUrl: './action-corrective.component.html',
})
export class ActionCorrectiveComponent implements OnInit {

  options: FormGroup;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'French',
    });
  }

  ngOnInit() {
  }

  clickBack() {
    history.go(-1);
  }

}
