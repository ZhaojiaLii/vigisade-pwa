import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SurveyService } from '../../visit/services/survey.service';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { HistoryService } from '../../history/services/history.service';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';


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
  thisCorrection: any;
  resultId: number;
  questionId: number;
  question: any;
  userId: number;
  correction$: Observable<Correction[]> = this.correctionService.getCorrection();
  result$: Observable<Result> = this.historyService.getResult();
  user$: Observable<User> = this.profileService.getUser();
  correctionQuestions$: Observable<any> = this.correctionService.getCorrectionQuestion();
  constructor(
    private correctionService: ActionCorrectiveService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
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
        for (const correction of corrections) {
          if (correction.id === this.correctionId) {
            this.thisCorrection = correction;
            this.resultId = correction.result_id;
            this.questionId = correction.question_id;
          }
        }
        console.log(this.questionId);
      }
    );
    this.historyService.selectResult(this.resultId);
    this.historyService.loadResult(this.resultId);
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
        user_id: this.userId,
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
