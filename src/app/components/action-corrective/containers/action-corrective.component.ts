import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SurveyService } from '../../survey/services/survey.service';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { HistoryService } from '../../history/services/history.service';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';
import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';
import 'rxjs-compat/add/operator/filter';
import { compress, IMAGE_PATH } from '../../../data/image.helpers';
import { Result } from '../../survey/interfaces/results/result.interface';
import { TranslateService } from '@ngx-translate/core';
import {ROLES} from '../../../data/user.helpers';
import {DeviceDetectorService} from 'ngx-device-detector';
import {STATUS} from '../../../data/status.const';
import {Correction} from '../interfaces/getCorrection/correction.interface';

@Component({
  selector: 'app-action-corrective',
  templateUrl: './action-corrective.component.html',
})
export class ActionCorrectiveComponent implements OnInit {
  correction = new FormGroup({
    comment: new FormControl(''),
    photo: new FormControl(''),
    user_id: new FormControl(''),
    status: new FormControl(''),
  });
  isAdminOrManager = false;
  thisCorrection: Correction;
  resultId: number;
  questionId: number;
  categoryId: number;
  categoryTitle: string;
  question: any;
  resultQuestion: any;
  userId: number;
  responsibleId: number;
  result: any;
  actionStatus: string;
  correctionID: number;
  history$: Observable<GetResult> = this.historyService.getHistory();
  correction$: Observable<any> = this.correctionService.getCorrection();
  allUsers$: Observable<User[]> = this.correctionService.getAllUsers();
  user$: Observable<User> = this.profileService.getUser();
  getCorrectionCategory$: Observable<any> = this.correctionService.getCorrectionCategory();
  correctionQuestions$: Observable<any> = this.correctionService.getCorrectionQuestion();
  getCorrectionResult$: Observable<Result> = this.correctionService.getCorrectionResult();

  imagePath = IMAGE_PATH.result;
  imagePathAC = IMAGE_PATH.action_corrective;

  isDesktop = false;

  public status = {};

  loading = false;
  constructor(
    private correctionService: ActionCorrectiveService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router,
    private translateService: TranslateService,
    private deviceService: DeviceDetectorService,
  ) {
    this.router.events.filter((event: any) => event instanceof NavigationEnd)
      .subscribe(event => {
        this.correctionID = Number(event.url.slice(10, event.url.length));
      });
  }

  ngOnInit() {

    this.status = Object.keys(STATUS);

    this.isDesktop = this.deviceService.isDesktop();

    this.correctionService.loadCorrection();


    /**
     * If is Admin or Manager !
     */
    this.correctionService.loadAllUsers();

    this.correction$.subscribe(
      corrections => {
        for (const correction of corrections) {
          if (correction.id === this.correctionID) {
            this.thisCorrection = correction;
            this.resultId = correction.result_id;
            this.questionId = correction.question_id;
            this.categoryId = correction.category_id;
            this.responsibleId = correction.user_id;
            this.historyService.selectResult(this.resultId);
            this.historyService.loadResult(this.resultId);
            this.actionStatus = correction.status;
            this.correction.patchValue({status: this.thisCorrection.status});
            this.correction.patchValue({user_id: this.thisCorrection.user_id});
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
      // this.correction.patchValue({user_id: this.userId});
      this.isAdminOrManager = user.roles.includes(ROLES.admin) || user.roles.includes(ROLES.manager);
    });



  }
  encode(event: any) {
    if (event.target.files && event.target.files[0]) {
      compress(event, {maxSizeMB: 0.07}).subscribe(dataUrl => {
        this.correction.patchValue({photo: dataUrl});
      });
    }
    this.loading = true;
    setTimeout(() => { this.loading = false; }, 5000);
  }
  validForm() {
    if (this.actionStatus !== this.correction.value.status) {
      // tslint:disable-next-line:max-line-length
      if ( (this.correction.value.comment === '') && (this.correction.value.photo === '')) {
        this.toastrService.error(this.translateService.instant('Aucune autre modification des autres champs.'));
      } else {
        this.sendActionCorrective();
      }
    } else if (Number(this.correction.value.user_id) !== this.responsibleId) {
      if (this.correction.value.comment !== '' || this.correction.value.photo !== '') {
        this.toastrService.error(this.translateService.instant('Commentaire et photo doit être vide.'));
      } else {
        this.sendActionCorrective();
      }
    } else if (this.correction.value.comment === '' || this.correction.value.photo === '') {
      this.toastrService.error(this.translateService.instant('Tous les champs sont obligatoires.'));
    } else {
      this.sendActionCorrective();
    }
  }

  sendActionCorrective() {
    const correctionPayload: CreateCorrection = {
      id: this.thisCorrection.id,
      user_id: Number(this.correction.value.user_id),
      survey_id: this.thisCorrection.survey_id,
      category_id: this.thisCorrection.category_id,
      question_id: this.thisCorrection.question_id,
      result_id: this.thisCorrection.result_id,
      status: this.correction.value.status,
      comment_question: this.correction.value.comment,
      image: this.correction.value.photo,
    };
    this.correctionService.updateCorrection(correctionPayload);
    this.toastrService.success(this.translateService.instant('Action corrective mise à jour'));
    this.router.navigate(['/atraiter']);
    window.scroll(0, 0);
  }

  loadingImage() {
    this.loading = false;
  }

  error() {
    this.loading = false;
  }
}
