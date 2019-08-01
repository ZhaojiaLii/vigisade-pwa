import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Question } from '../../interfaces/getSurveys/question.interface';
import { TeamMemberType } from '../../interfaces/form/team-member-type.interface';
import { compress } from '../../data/image.helpers';

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

  compress(event: any) {
    if (event.target.files && event.target.files[0]) {
      compress(event, {maxSizeMB: 0.07}).subscribe(dataUrl => {
        this.group.patchValue({photo: dataUrl});
      });
    }
  }

  updateValidators(required: boolean): void {
    if (required) {
      this.group.get('comment').setValidators([Validators.required, Validators.minLength(1)]);
      this.group.get('comment').updateValueAndValidity();
    } else {
      this.group.get('comment').clearValidators();
      this.group.get('comment').updateValueAndValidity();
    }
  }
}
