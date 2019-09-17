import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Survey } from '../../interfaces/getSurveys/survey.interface';
import { compress } from '../../../../data/image.helpers';

@Component({
  selector: 'app-survey-best-practice',
  templateUrl: './survey-best-practice.component.html',
})
export class SurveyBestPracticeComponent {

  @Input() group: FormGroup;

  @Input() survey: Survey;

  showError = false;
  isCollapsed = true;
  imageloading = false;
  hide = true;

  encode(event: any) {
    if (event.target.files && event.target.files[0]) {
      compress(event, {maxSizeMB: 0.07}).subscribe(dataUrl => {
        this.group.patchValue({photo: dataUrl});
      });
    }
    this.imageloading = true;
  }
  imageLoaded() {
    this.imageloading = false;
  }

  updateValidators(required: boolean): void {
    if (required) {
      this.hide = true;
      this.group.get('type').setValidators([Validators.required]);
      this.group.get('comment').setValidators([Validators.required, Validators.minLength(1)]);
      this.group.get('type').updateValueAndValidity();
      this.group.get('comment').updateValueAndValidity();
      this.group.get('photo').updateValueAndValidity();
    } else {
      this.hide = false;
      this.group.get('type').clearValidators();
      this.group.get('comment').clearValidators();
      this.group.get('type').updateValueAndValidity();
      this.group.get('comment').updateValueAndValidity();
      this.group.get('photo').updateValueAndValidity();
    }
  }
}
