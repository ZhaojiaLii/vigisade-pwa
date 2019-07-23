import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../../interfaces/getSurveys/question.interface';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
})
export class SurveyQuestionComponent implements OnChanges {

  @Input() question: Question;
  @Input() group: FormGroup;

  isCollapsed = false;
  imgURL: any;

  showError = false;

  ngOnChanges(changes: SimpleChanges): void {

    this.group.valueChanges.subscribe((values) => {

      console.log('changes', values);
      this.showError = false;

      Object.keys(values).forEach((key: string) => {
        const control = this.group.get(key);

        if (control && control.dirty && !control.valid) {
          this.showError = true;
        }
      });
    });
  }

  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.imgURL = Event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
