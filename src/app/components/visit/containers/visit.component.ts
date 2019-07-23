import { SurveyService } from '../services/survey.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey, TEAM_MODE } from '../interfaces/getSurveys/survey.interface';
import { Observable } from 'rxjs';
import { Result } from '../interfaces/create/result.interface';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { TeamMember } from '../interfaces/getSurveys/team-member.interface';
import { Category } from '../interfaces/getSurveys/category.interface';
import { BEST_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';
import { Direction } from '../../shared/interfaces/direction.interface';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { filter, tap, take } from 'rxjs/operators';
import { Question } from '../interfaces/getSurveys/question.interface';
import { ResultQuestion } from '../interfaces/create/result-question.interface';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
})
export class VisitComponent implements OnInit {

  isCollapsed = false;
  updateResultPayload: UpdateResult;
  questionDone = 0;

  /** Forms */
  mainForm = new FormGroup({
    entity: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });
  teamMembers: TeamMember[] = [{}];
  questionsForms: FormGroup[] = [];

  /** Data */
  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  user$: Observable<User> = this.profileService.getUser();
  userDirection$: Observable<Direction> = this.profileService.getUserDirection();
  userEntities$: Observable<Entity[]> = this.profileService.getUserEntities();

  teamMode = TEAM_MODE;

  questionNum = 0;
  data = [];

  selectedCategory$: Observable<Category> = this.surveyService.getSurveySelectedCategory();

  bestPracticeId = BEST_PRACTICE_CATEGORY_ID;

  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private profileService: ProfileService,
    private dataService: DataService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    // Initialize questions forms.
    this.surveyService.getSurveyOfUser().pipe(
      filter((survey: Survey) => !!survey),
      take(1),
    ).subscribe((survey: Survey) => {
      survey.surveyCategories.forEach((category: Category) => {
        category.surveyQuestion.forEach((question: Question) => {
          this.questionsForms.push(new FormGroup({
            id: new FormControl(question.surveyQuestionId.toString()),
            selection: new FormControl('', [Validators.required]),
            comment: new FormControl('', [Validators.required, Validators.minLength(1)]),
            photo: new FormControl('', [Validators.required]),
          }));
        });
      });
    });
  }
  getMemberIndexes(): number[] {
    return this.teamMembers.map((m, i) => i);
  }

  updateTeamMember(updatedMember: TeamMember, updatedMemberIndex: number): void {
    this.teamMembers = this.teamMembers.map((member, index) => {
      return index === updatedMemberIndex ? updatedMember : member;
    });
  }

  addTeamMember(): void {
    this.teamMembers = this.teamMembers.concat({});
  }

  removeTeamMember(removedMemberIndex: number): void {
    console.log([...this.teamMembers], removedMemberIndex);
    this.teamMembers = this.teamMembers.filter((member, index) => {
      return index !== removedMemberIndex;
    });
  }

  getQuestionForm(questionId: number): FormGroup {
    return this.questionsForms.find(form => form.value.id === questionId.toString());
  }

  selectSurveyCategory(id: number): void {
    this.isCollapsed = false;
    this.surveyService.selectSurveyCategory(id);
  }

  post() {
    if (this.mainForm.status !== 'VALID') {
      this.toastrService.error('Les informations de visite sont obligatoires.');
      return;
    }

    combineLatest(
      this.survey$,
      this.user$,
    ).pipe(take(1)).subscribe(([survey, user]) => {
      const questions: ResultQuestion[] = this.questionsForms.map((form: FormGroup) => {
        return {
          resultQuestionId: null,
          resultQuestionResultId: null,
          resultQuestionResultQuestionId: form.value.id,
          resultQuestionResultNotation: form.value.selection,
          resultQuestionResultComment: form.value.comment,
          resultQuestionResultPhoto: null,
        };
      });
      const result: Result = {
        resultId: null,
        resultSurveyId: survey.surveyId,
        resultUserId: user.id,
        resultDirectionId: user.directionId,
        resultAreaId: user.areaId,
        resultEntityId: user.entityId,
        resultDate: this.mainForm.get('date').value,
        resultPlace: this.mainForm.get('place').value,
        resultClient: this.mainForm.get('client').value,
        resultValidated: true,
        resultTeamMember: [],
        resultQuestion: questions,
        resultBestPracticeDone: 'todo',
        resultBestPracticeComment: 'todo',
        resultBestPracticePhoto: 'todo',
      };

      this.surveyService.createResult(result);
      this.toastrService.success('success');
    });
  }
}

