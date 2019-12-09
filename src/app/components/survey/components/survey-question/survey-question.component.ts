import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Question } from '../../interfaces/getSurveys/question.interface';
import { TeamMemberType } from '../../interfaces/form/team-member-type.interface';
import { getDataUrlFromFile } from '../../../../data/image.helpers';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
})
export class SurveyQuestionComponent implements OnChanges {

  @Input() question: Question;
  @Input() group: FormGroup;
  @Input() teamMember: TeamMemberType;

  isCollapsed = false;
  showError = false;
  imageloading = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.group.valueChanges.subscribe((values) => {

      this.showError = false;

      Object.keys(values).forEach((key: string) => {
        const control = this.group.get(key);
        if (control && control.dirty && !control.valid) {
          this.showError = true;
        }
      });
    });
  }

  updateImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      getDataUrlFromFile(event, {maxSizeMB: 0.07}).subscribe(dataUrl => {
        this.group.patchValue({photo: dataUrl});
      });
    }
    this.imageloading = true;
  }

  updateValidators(required: boolean): void {
    if (required) {
      // can not enter just spaces
      this.group.get('comment').setValidators([Validators.required, Validators.pattern(/[a-zA-Z0-9_]+/)]);
      this.group.get('comment').updateValueAndValidity();
    } else {
      this.group.get('comment').clearValidators();
      this.group.get('comment').updateValueAndValidity();
    }
  }

  imageLoaded() {
    this.imageloading = false;
  }
}
