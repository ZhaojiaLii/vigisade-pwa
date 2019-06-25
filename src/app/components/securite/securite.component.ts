import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
})
export class SecuriteComponent implements OnInit {

  options: FormGroup;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'French',
    });
  }

  ngOnInit() {
  }

}
