import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-best-practice',
  templateUrl: './details-best-practice.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {class : 'card card-full-width mb-10 shadow-none'},
})
export class DetailsBestPracticeComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  @Input() bestPractice;
  radioGroup = new FormGroup({
    radioGood: new FormControl(''),
    radioBad: new FormControl(''),
  });
  constructor(
  ) {}

  ngOnInit(): void {
    switch (this.bestPractice.resultBestPracticeDone) {
      case true: this.radioGroup.get('radioGood').setValue('good'); break;
      case false: this.radioGroup.get('radioBad').setValue('bad'); break;
    }
  }

  ngOnDestroy(): void {
  }
}
