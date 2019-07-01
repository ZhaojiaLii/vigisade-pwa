import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../store/app.state';
import 'rxjs-compat/add/operator/skip';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { AddSecurityDirective } from '../../../shared/directives/addSecirity.directive';
import { SecurityTemplateComponent } from './security-template.component';
import { SecurityDataForm } from '../../interfaces/securityDataForm';
import { AddData } from './addData';
import { SurveyApiService } from '../../services/survey-api.service';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
})

export class SecuriteComponent implements OnInit {
  @Input() data: AddData;
  @ViewChild(AddSecurityDirective, {static: true}) appAddSecurityDirective: AddSecurityDirective;

  survey: any;
  surveyTitle = '';
  surveyBestPracticeLabel = '';
  surveyBestPracticeHelp = '';
  surveyCategories = [];
  categoryNum = 0;
  questionNum = 0;
  categoryTitle = [];
  categoryQuestions = [];
  questionLabel = [];
  questionHelp = [];
  separateQuestions = [];

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
  constructor(
      private surveyService: SurveyService,
      private surveyApiService: SurveyApiService,
      private store: Store<State>,
      public dialog: MatDialog,
      private componentFactoryResolver: ComponentFactoryResolver,
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
        this.separateQuestions.push(this.questionNum);
        for (const question of category.questions) {
          this.questionLabel.push(question.label);
          this.questionHelp.push(question.help);
          this.data = new AddData(SecurityTemplateComponent, {label: question.label, help: question.help});
          // add visit form blocks
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SecurityTemplateComponent);
          const componentRef = this.appAddSecurityDirective.viewContainerRef.createComponent(componentFactory);
          componentRef.instance.data = this.data.data;
          componentRef.changeDetectorRef.detectChanges();
        }
      }
      // console.log('question number is: ' + this.separateQuestions);
    });
  }

  openHelp() {
    this.dialog.open(DialogComponent, {
      data: {
        help: this.questionHelp[0]
      }
    });
  }


  onFileChanged(event) {
    console.log(event);
  }

}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  constructor() {}
}
