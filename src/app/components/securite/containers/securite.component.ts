import { Component, OnInit } from '@angular/core';
import 'rxjs-compat/add/operator/skip';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Survey } from '../../visit/interfaces/survey.interface';
import { SurveyApiService } from '../../visit/services/survey-api.service';
import { SurveyService } from '../../visit/services/survey.service';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
})

export class SecuriteComponent implements OnInit {
  isCollapsed = false;
  loadingPage = true;
  survey: any;
  data = [];

  visitForm = new FormGroup({
    selection: new FormControl(''),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  survey$: Observable<Survey> = this.surveyService.getSurvey();
  constructor(
      private surveyService: SurveyService,
      private surveyApiService: SurveyApiService,
      ) {
  }
  ngOnInit() {
  }

  validVisit() {
    console.log(this.data);
  }

  getSelection(selection) {
    this.data.forEach((data) => {
      if (selection.label === data.label) {
        data.selection = selection.selection;
        // console.log(data);
      }
    });
  }
  getComment(comment) {
    this.data.forEach((data) => {
      if (comment.label === data.label) {
        data.comment = comment.comment;
        // console.log(data);
      }
    });
  }
  getPhoto(photo) {
    this.data.forEach((data) => {
      if (photo.label === data.label) {
        data.photo = photo.photo;
        // console.log(data);
      }
    });
  }

}

