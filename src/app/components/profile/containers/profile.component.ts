import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  options: FormGroup;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'French',
    });
  }

}
