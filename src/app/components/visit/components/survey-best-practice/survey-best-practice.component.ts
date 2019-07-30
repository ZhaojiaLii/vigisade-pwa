import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Survey } from '../../interfaces/getSurveys/survey.interface';

@Component({
  selector: 'app-survey-best-practice',
  templateUrl: './survey-best-practice.component.html',
})
export class SurveyBestPracticeComponent {

  @Input() group: FormGroup;

  @Input() survey: Survey;

  showError = false;

  isCollapsed = true;

  imgUrl: string;

  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.imgUrl = Event.target.result;
        this.group.patchValue({photo: Event.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  updateValidators(required: boolean): void {
    if (required) {
      this.group.get('type').setValidators([Validators.required]);
      this.group.get('comment').setValidators([Validators.required, Validators.minLength(1)]);
      this.group.get('type').updateValueAndValidity();
      this.group.get('comment').updateValueAndValidity();
    } else {
      this.group.get('type').clearValidators();
      this.group.get('comment').clearValidators();
      this.group.get('type').updateValueAndValidity();
      this.group.get('comment').updateValueAndValidity();
    }
  }
}
