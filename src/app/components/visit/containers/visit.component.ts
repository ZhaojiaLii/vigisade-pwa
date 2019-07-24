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
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { Category } from '../interfaces/getSurveys/category.interface';
import { BEST_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';
import { Direction } from '../../shared/interfaces/direction.interface';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Question } from '../interfaces/getSurveys/question.interface';
import { ResultQuestion } from '../interfaces/create/result-question.interface';
import { ResultTeamMember } from '../interfaces/create/result-team-member.interface';

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
  teamMembersForms: FormGroup[] = [new FormGroup({
    id: new FormControl(this.getRandomId(), [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  })];
  questionsForms: {group: FormGroup, question: Question}[] = [];
  // Keep questions to ease form updates.
  questions: Question[] = [];

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
          this.questionsForms.push({
            group: this.buildQuestionForm(question, this.teamMembersForms[0].get('id').value),
            question,
          });

          this.questions.push(question);
        });
      });
    });
  }

  addTeamMember(): void {
    const memberId = this.getRandomId();
    this.teamMembersForms = this.teamMembersForms.concat(new FormGroup({
      id: new FormControl(memberId, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    }));

    this.questions.forEach(question => {
      this.questionsForms.push({
        group: this.buildQuestionForm(question, memberId),
        question,
      });
    });
  }

  removeTeamMember(id: string): void {
    this.teamMembersForms = this.teamMembersForms.filter(form => {
      return form.value.id !== id;
    });

    this.questionsForms = this.questionsForms.filter(questionForm => {
      return questionForm.group.get('teamMemberId').value !== id;
    });
  }

  getQuestionForms(categoryId: number): {group: FormGroup, question: Question}[] {
    return this.questionsForms.filter(questionForm => {
      return questionForm.question.surveyQuestionCategoryId === categoryId;
    });

    // @todo: sort
  }

  selectSurveyCategory(id: number): void {
    this.isCollapsed = false;
    this.surveyService.selectSurveyCategory(id);
  }

  countSurveyFields(): number {
    return 4 + this.teamMembersForms.length;
  }

  countValidSurveyFields(): number {
    return (+this.mainForm.get('entity').valid)
      + (+this.mainForm.get('place').valid)
      + (+this.mainForm.get('client').valid)
      + (+this.mainForm.get('date').valid)
      + this.teamMembersForms.reduce((sum, form) => {
        return sum + (form.status === 'VALID' ? 1 : 0);
      }, 0);
  }

  countValidQuestions(categoryId: number): number {
    return this.questionsForms
      .filter(form => form.question.surveyQuestionCategoryId === categoryId)
      .reduce((sum, form) => {
        return sum + (+(form.group.status === 'VALID'));
      }, 0);
  }

  countQuestions(categoryId: number): number {
    return this.questionsForms
      .filter(form => form.question.surveyQuestionCategoryId === categoryId)
      .length;
  }

  canPost(): boolean {
    if (this.countSurveyFields() !== this.countValidSurveyFields()) {
      return false;
    }

    let allQuestionsValid = true;

    this.questionsForms.forEach(questionForm => {
      console.log(questionForm.group.status);
      if (questionForm.group.status !== 'VALID') {
        allQuestionsValid = false;
        return;
      }
    });

    return allQuestionsValid;
  }

  post() {
    if (this.mainForm.status !== 'VALID') {
      this.toastrService.error('Les informations de visite sont obligatoires.');
      return;
    }

    // @todo: check members + questions

    combineLatest(
      this.survey$,
      this.user$,
    ).pipe(take(1)).subscribe(([survey, user]) => {
      const questions: ResultQuestion[] = this.questionsForms.map(form => {
        return {
          resultQuestionId: null,
          resultQuestionResultId: null,
          resultQuestionResultQuestionId: form.group.value.id,
          resultQuestionResultNotation: form.group.value.selection,
          resultQuestionResultComment: form.group.value.comment,
          resultQuestionResultPhoto: null, // @todo
          teamMemberId: survey.surveyTeam === TEAM_MODE.no
            ? null
            : form.group.value.teamMemberId,
        };
      });
      const teamMembers: ResultTeamMember[] = survey.surveyTeam === TEAM_MODE.no
        ? []
        : this.teamMembersForms.map(form => ({
          resultTeamMemberId: form.value.id,
          resultTeamMemberFirstName: form.value.firstName,
          resultTeamMemberLastName: form.value.lastName,
          resultTeamMemberRole: form.value.role,
        }));
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
        resultTeamMember: teamMembers,
        resultQuestion: questions,
        resultBestPracticeDone: 'todo',
        resultBestPracticeComment: 'todo',
        resultBestPracticePhoto: 'todo',
      };

      this.surveyService.createResult(result);
      this.toastrService.success('success');
    });
  }

  private getRandomId(): string {
    return Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15);
  }

  private buildQuestionForm(question: Question, teamMemberId: string) {
    return new FormGroup({
      id: new FormControl(question.surveyQuestionId.toString()),
      teamMemberId: new FormControl(teamMemberId),
      selection: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required, Validators.minLength(1)]),
      photo: new FormControl(''),
    });
  }
}

