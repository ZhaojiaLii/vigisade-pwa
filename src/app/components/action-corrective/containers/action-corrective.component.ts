import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SurveyService } from '../../visit/services/survey.service';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { HistoryService } from '../../history/services/history.service';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import 'rxjs-compat/add/operator/filter';
import {IMAGE_PATH} from '../../../data/image.helpers';


@Component({
  selector: 'app-action-corrective',
  templateUrl: './action-corrective.component.html',
})
export class ActionCorrectiveComponent implements OnInit {
  correction = new FormGroup({
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  thisCorrection: any;
  resultId: number;
  questionId: number;
  categoryId: number;
  categoryTitle: string;
  question: any;
  resultQuestion: any;
  userId: number;
  result: any;
  correctionID: number;
  history$: Observable<GetResult> = this.historyService.getHistory();
  correction$: Observable<any> = this.correctionService.getCorrection();
  user$: Observable<User> = this.profileService.getUser();
  getCorrectionCategory$: Observable<any> = this.correctionService.getCorrectionCategory();
  correctionQuestions$: Observable<any> = this.correctionService.getCorrectionQuestion();
  getCorrectionResult$: Observable<Result> = this.correctionService.getCorrectionResult();

  imagePath = IMAGE_PATH.result;

  constructor(
    private correctionService: ActionCorrectiveService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.router.events.filter((event: any) => event instanceof NavigationEnd)
      .subscribe(event => {
        this.correctionID = Number(event.url.slice(10, event.url.length));
      });
  }

  ngOnInit() {
    this.correctionService.loadCorrection();
    this.correction$.subscribe(
      corrections => {
        for (const correction of corrections) {
          if (correction.id === this.correctionID) {
            this.thisCorrection = correction;
            this.resultId = correction.result_id;
            this.questionId = correction.question_id;
            this.categoryId = correction.category_id;
            this.historyService.selectResult(this.resultId);
            this.historyService.loadResult(this.resultId);
          }
        }
      }
    );
    this.historyService.getSelectedResult();
    this.getCorrectionResult$.subscribe(result => {
      if (result === null || result === undefined) {
        return;
      } else {
        const resultQuestions = result.resultQuestion;
        for (const question of resultQuestions) {
          if (question.resultQuestionResultId === this.resultId && question.resultQuestionResultQuestionId === this.questionId) {
            this.resultQuestion = question;
          }
        }
      }
    });
    this.getCorrectionCategory$.subscribe(categories => {
      this.categoryTitle = categories.find(category =>
        category.surveyCategoryId === this.categoryId).surveyCategoryTitleTranslation.surveyCategoryTranslatableTitle;
    });
    this.history$.subscribe(histories => {
      this.result = histories.result.find(result => result.resultId === this.resultId);
    });
    this.correctionQuestions$.subscribe(questions => {
      for (const question of questions) {
        if (question.surveyQuestionId === Number(this.questionId)) {
          this.question = question;
        }
      }
    });
    this.user$.subscribe(user => {
      this.userId = user.id;
    });
  }
  encode(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.correction.patchValue({photo: Event.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  validForm() {
    if (this.correction.value.comment === '' || this.correction.value.photo === '') {
      this.toastrService.error('champs vide');
    } else {
      const correctionPayload: CreateCorrection = {
        id: this.thisCorrection.id,
        user_id: this.userId,
        survey_id: this.thisCorrection.survey_id,
        category_id: this.thisCorrection.category_id,
        question_id: this.thisCorrection.question_id,
        result_id: this.thisCorrection.result_id,
        status: 'Validé',
        comment_question: this.correction.value.comment,
        image: this.correction.value.photo,
      };
      // console.log(correctionPayload);
      this.correctionService.updateCorrection(correctionPayload);
      this.toastrService.success('maj succèss');
      this.router.navigate(['/atraiter']);
      window.scroll(0, 0);
    }
  }

}
