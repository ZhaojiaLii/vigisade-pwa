import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetCorrection } from '../interfaces/getCorrection/getCorrection.interface';
import { Observable } from 'rxjs';
import { SurveyService } from '../../visit/services/survey.service';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { HistoryService } from '../../history/services/history.service';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { ResultQuestion } from '../../history/interfaces/result-question.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';


@Component({
  selector: 'app-action-corrective',
  templateUrl: './action-corrective.component.html',
})
export class ActionCorrectiveComponent implements OnInit {
  imgURL: any;
  correctionId: number;
  correction = new FormGroup({
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  corrections = [];
  thisCorrection: any;
  resultId: number;
  questionId: number;
  correction$: Observable<GetCorrection> = this.correctionService.getCorrection();
  result$: Observable<Result> = this.historyService.getResult();
  getCorrectionSurvey$: Observable<Survey> = this.correctionService.getCorrectionSurvey();
  getCorrectionCategory: Observable<Category> = this.correctionService.getCorrectionCategory();
  getCorrectionQuestion$: Observable<any> = this.correctionService.getCorrectionQuestion();
  selectedCategory$: Observable<Category> = this.historyService.getSelectedCategory();
  selectedQuestions$: Observable<ResultQuestion[]> = this.historyService.getSelectedQuestions();
  constructor(
    private correctionService: ActionCorrectiveService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.correctionService.loadCorrection();
    this.route.paramMap.subscribe(params => {
      this.correctionId = +params.get('id');
    });
    this.correction$.subscribe(
      corrections => {
        // @ts-ignore
        for (const correction of corrections) {
          if (correction.id === this.correctionId) {
            this.thisCorrection = correction;
            this.resultId = correction.result_id;
            this.questionId = correction.question_id;
          }
        }
      }
    );
    this.historyService.selectResult(this.resultId);
    this.historyService.loadResult(this.resultId);
    this.getCorrectionQuestion$.subscribe(question => {
      console.log(question);
    });
  }

  // clickBack() {
  //   history.go(-1);
  // }

  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.imgURL = Event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // this.photoChanged();
    }
  }

  validForm() {
    if (this.correction.value.comment === '' || this.correction.value.photo === '') {
      this.toastrService.error('champs vide');
    } else {
      const correctionPayload: CreateCorrection = {
        id: this.thisCorrection.id,
        user_id: 2,
        survey_id: this.thisCorrection.survey_id,
        category_id: this.thisCorrection.category_id,
        question_id: this.thisCorrection.question_id,
        result_id: this.thisCorrection.result_id,
        status: 'Validé',
        comment_question: this.correction.value.comment,
        image: 'photo path',
      };
      console.log(correctionPayload);
      this.correctionService.updateCorrection(correctionPayload);
      this.toastrService.success('maj succèss');
      this.router.navigate(['/atraiter']);
      window.scroll(0, 0);
    }
    console.log(this.correction.value);
  }

}
