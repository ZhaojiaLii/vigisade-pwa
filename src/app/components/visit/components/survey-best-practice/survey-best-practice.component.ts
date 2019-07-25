import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
