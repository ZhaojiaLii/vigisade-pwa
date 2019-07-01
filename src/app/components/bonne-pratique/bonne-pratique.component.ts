import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bonne-pratique',
  templateUrl: './bonne-pratique.component.html'
})
export class BonnePratiqueComponent implements OnInit {

  options: FormGroup;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'French',
    });
  }


  ngOnInit() {
  }

}
