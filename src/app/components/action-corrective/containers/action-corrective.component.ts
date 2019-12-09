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
import { IMAGE_PATH } from '../../../data/image.helpers';
import { Result } from '../../survey/interfaces/results/result.interface';
import { TranslateService } from '@ngx-translate/core';
import { ROLES } from '../../../data/user.helpers';
import { DeviceDetectorService } from 'ngx-device-detector';
import { STATUS } from '../../../data/status.const';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { DataService } from '../../../services/data.service';
import 'rxjs-compat/add/operator/filter';
import { map } from 'rxjs/operators';
import { ImageEncoderService } from '../../../services/image-encoder.service';

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
  userName: string;
  responsibleId: number;
  result: any;
  actionStatus: string;
  correctionID: number;
  latestComment: string;
  dangerousId: number;
  correctionDate: string;
  isFirstComment: boolean;
  history$: Observable<GetResult> = this.historyService.getHistory();
  correction$: Observable<Correction[]>;
  allUsers$: Observable<User[]> = this.correctionService.getAllUsers();
  user$: Observable<User> = this.profileService.getUser();
  type$: Observable<string>;
  getCorrectionCategory$: Observable<any> = this.correctionService.getCorrectionCategory();
  correctionQuestions$: Observable<any> = this.correctionService.getCorrectionQuestion();
  getCorrectionResult$: Observable<Result> = this.correctionService.getCorrectionResult();

  imagePath = IMAGE_PATH.result;
  imagePathAC = IMAGE_PATH.action_corrective;
  imagePathD = IMAGE_PATH.dangerous_situation;

  isDesktop = false;
  disableResponsible = true;
  disableCommentPhoto = true;
  public status = [];

  imageLoaded = false;
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
    private dataService: DataService,
    private imageCheckCompressService: ImageEncoderService,
  ) {
    this.router.events.filter((event: any) => event instanceof NavigationEnd)
      .subscribe(event => {
        this.correctionID = Number(event.url.slice(10, event.url.length));
      });
  }

  ngOnInit() {

    if (this.deviceService.isDesktop()) {
      this.correction$ = this.correctionService.getDesktopCorrectionByDate();
    } else {
      this.correction$ = this.correctionService.getMobileCorrectionByDate();
    }

    this.status = Object.keys(STATUS);

    this.isDesktop = this.deviceService.isDesktop();

    /**
     * If is Admin or Manager !
     */
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
            this.dangerousId = correction.type_dangerous_id;
            this.correctionDate = correction.date;
          }
        }
      }
    );
    this.type$ = this.dataService.getDangerousSituationTypes().pipe(
      map(types => {
        const getType = types.find(type => type.typeDangerousSituationsId === this.dangerousId);
        return getType.typeDangerousSituationTranslation.typeDangerousSituationTranslationType;
      })
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
      if (categories && !this.dangerousId) {
        this.categoryTitle = categories.find(category => category.surveyCategoryId === this.categoryId)
          .surveyCategoryTitleTranslation.surveyCategoryTranslatableTitle;
      }
    });
    this.history$.subscribe(histories => {
      if (histories && !this.dangerousId) {
        this.result = histories.result.find(result => result.resultId === this.resultId);
      }
    });
    this.correctionQuestions$.subscribe(questions => {
      if (questions && !this.dangerousId) {
        for (const question of questions) {
          if (question.surveyQuestionId === Number(this.questionId)) {
            this.question = question;
          }
        }
      }
    });
    this.user$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.isAdminOrManager = user.roles.includes(ROLES.admin) || user.roles.includes(ROLES.manager);
      }
    });
    this.allUsers$.subscribe(users => {
      const thisUser = users.find(user => user.id === this.userId);
      this.userName = thisUser.firstName + ' ' + thisUser.lastName;
    });

    this.correction.valueChanges.subscribe(val => {
      this.disableResponsible = (val.comment === '' &&  val.photo === '');
    });
    // get latest comment
    if (this.thisCorrection && this.thisCorrection.comment_question) {
      const commentArray = this.thisCorrection.comment_question.split('~');
      const latestCommentElement = commentArray[commentArray.length - 1].split('-');
      this.latestComment = latestCommentElement[latestCommentElement.length - 1];
      this.isFirstComment = this.thisCorrection.comment_question.indexOf('~') === -1;
    }
  }
  encode(event: any) {
    this.imageLoaded = this.imageCheckCompressService.encode(event, this.correction);
  }
  validForm() {
    if (Number(this.correction.value.user_id) === this.responsibleId && this.actionStatus === this.correction.value.status) {
      if (this.correction.value.comment !== '') {
        this.sendActionCorrective();
      } else {
        this.toastrService.error(this.translateService.instant('Tous les champs sont obligatoires.'));
      }
    } else {
      this.sendActionCorrective();
    }
  }
  sendActionCorrective() {
    let correctionPayload: CreateCorrection;
    let  day = (new Date().getDate()).toString();
    day = Number(day) < 10 ? `0${day}` : `${day}`;
    const time = `${day}/${new Date().getMonth() + 1}`;
    const executor = this.userName;
    const previousComment = this.thisCorrection.comment_question;
    const newComment = this.correction.value.comment === ''
      ?
      previousComment
      :
      (previousComment
        ?
      `${previousComment}~${time} - ${executor} - ${this.correction.value.comment}`
        :
      `${time} - ${executor} - ${this.correction.value.comment}`);
    if (this.thisCorrection.status === 'A traiter') {
      // a traiter => post comment and photo
      // role : conductor & manager & admin
      correctionPayload = {
        id: this.thisCorrection.id,
        user_id: Number(this.correction.value.user_id),
        survey_id: this.thisCorrection.survey_id,
        category_id: this.thisCorrection.category_id,
        question_id: this.thisCorrection.question_id,
        result_id: this.thisCorrection.result_id,
        status: 'A valider',
        comment_question: newComment,
        image: this.correction.value.photo,
        type_dangerous_id: this.dangerousId,
      };
    } else if (this.isAdminOrManager) {
      // a valider => modify status, comment
      // role : manager & admin
      correctionPayload = {
        id: this.thisCorrection.id,
        user_id: this.thisCorrection.user_id,
        survey_id: this.thisCorrection.survey_id,
        category_id: this.thisCorrection.category_id,
        question_id: this.thisCorrection.question_id,
        result_id: this.thisCorrection.result_id,
        status: this.correction.value.status,
        comment_question: newComment,
        image: this.thisCorrection.image,
        type_dangerous_id: this.dangerousId,
      };
    } else if (this.isAdminOrManager && Number(this.correction.value.user_id) !== this.responsibleId) {
      // only modify responsible, manager & admin
      correctionPayload = {
        id: this.thisCorrection.id,
        user_id: Number(this.correction.value.user_id),
        survey_id: this.thisCorrection.survey_id,
        category_id: this.thisCorrection.category_id,
        question_id: this.thisCorrection.question_id,
        result_id: this.thisCorrection.result_id,
        status: this.thisCorrection.status,
        comment_question: previousComment,
        image: this.thisCorrection.image,
        type_dangerous_id: this.dangerousId,
      };
    }
    this.correctionService.updateCorrection(correctionPayload);
    this.toastrService.success(this.translateService.instant('Action corrective mise à jour'));
    this.router.navigate(['/atraiter']);
    this.correctionService.fromActionCorrective();
    window.scroll(0, 0);
  }

  loadingImage() {
    this.imageLoaded = false;
  }

  error() {
    this.imageLoaded = false;
  }
}
