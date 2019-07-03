import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../store/app.state';
import 'rxjs-compat/add/operator/skip';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveyApiService } from '../../services/survey-api.service';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
})

export class SecuriteComponent implements OnInit {
  loadingPage = true;
  survey: any;
  surveyTitle = '';
  surveyBestPracticeLabel = '';
  surveyBestPracticeHelp = '';
  surveyCategories = [];
  categoryNum = 0;
  questionNum = 0;
  questionsNum = 0;
  categoryTitle = [];
  categoryQuestions = [];
  questionLabel = [];
  questionHelp = [];
  separateQuestions = [];
  tempTable = [];
  data = [];

  visitForm = new FormGroup({
    selection: new FormControl(''),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });

  constructor(
      private surveyService: SurveyService,
      private surveyApiService: SurveyApiService,
      private store: Store<State>,
      ) {
  }

  idQuestion = 0;
  ngOnInit() {
    // this.data = this.surveyApiService.getFormData();
    this.surveyService.getSurvey();
    this.store.pipe(select('survey')).skip(2).subscribe(survey => {
      this.survey = survey.survey;
      this.surveyTitle = this.survey.title;
      this.surveyBestPracticeLabel = this.survey.best_practice_label;
      this.surveyBestPracticeHelp = this.survey.best_practice_help;
      this.surveyCategories = this.survey.categories;

      this.categoryNum = this.surveyCategories.length;
      this.categoryTitle = [];
      this.categoryQuestions = [];
      this.questionLabel = [];
      this.questionHelp = [];
      this.idQuestion = 0;
      for (const category of this.surveyCategories) {
        this.categoryTitle.push(category.title);
        this.categoryQuestions.push(category.questions);
        this.questionNum = category.questions.length;
        this.questionsNum = this.questionsNum + this.questionNum;
        this.separateQuestions.push(this.questionNum);
        for (const question of category.questions) {
          this.questionLabel.push(question.label);
          this.questionHelp.push(question.help);
          this.data.push({label: question.label, selection: '', comment: '', photo: ''});
        }
      }
      for (let i = 0; i < this.questionsNum; i++) {
        this.tempTable.push(i);
      }
      this.loadingPage = false;
    });
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

