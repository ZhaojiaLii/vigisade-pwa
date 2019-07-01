import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SecurityDataForm } from '../../interfaces/securityDataForm';

@Component({
  selector: 'app-security-template',
  templateUrl: './security-template.component.html',
})
export class SecurityTemplateComponent implements SecurityDataForm {
  @Input() data: any;
  constructor(
  ) { }
  visitForm = new FormGroup({
    choice: new FormGroup({
      good: new FormControl(''),
      no_object: new FormControl(''),
      bad: new FormControl(''),
      action_corrective: new FormControl(''),
    }),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  onFileChanged(event) {
    console.log(event);
  }
}
