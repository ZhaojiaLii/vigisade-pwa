import { SurveyService } from '../services/survey.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey, TEAM_MODE } from '../interfaces/getSurveys/survey.interface';
import { combineLatest, Observable } from 'rxjs';
import { ProfileService } from '../../profile/services/profile.service';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { Category } from '../interfaces/getSurveys/category.interface';
import { GOOD_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';
import { filter, map, take } from 'rxjs/operators';
import { Question, TYPE_GENERAL, TYPE_TEAM } from '../interfaces/getSurveys/question.interface';
import { buildQuestionForm, buildTeamMemberForm } from '../data/form.helpers';
import { ResultDraft } from '../interfaces/results/result-draft.interface';
import { DraftService } from '../../../services/draft.service';
import { Area } from '../../shared/interfaces/area.interface';
import { TeamMemberType } from '../interfaces/form/team-member-type.interface';
import { User } from '../../profile/interfaces/user';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

  isCollapsed = false;
  updateResultPayload: UpdateResult;
  /** Forms */
  mainForm = new FormGroup({
    entity: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });
  teamMembersForms: FormGroup[] = [buildTeamMemberForm()];
  questionsForms: {group: FormGroup, question: Question}[] = [];
  // Keep questions to ease form updates.
  questions: Question[] = [];
  bestPracticeForm = new FormGroup({
    selection: new FormControl('', [Validators.required]),
    type: new FormControl(''),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  maxDate = this.maxDateCalculate();
  minDate = this.minDateCalculate();

  /** Data */
  user$: Observable<User> = this.profileService.getUser();
  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  surveyArea$: Observable<Area> = this.surveyService.getSurveyArea();
  userEntities$: Observable<Entity[]> = this.profileService.getUserEntities();
  userEntity$: Observable<Entity> = combineLatest([this.user$, this.userEntities$]).pipe(
    map(([user, userEntities]: [User, Entity[]]) => {
      if (!user || !userEntities) {
        return null;
      }
      const userEntity: Entity = userEntities.find(entity => entity.id === user.entityId);
      if (userEntity) {
        return userEntity;
      } else {
        return null;
      }
    }),
  );
  userEntity: Entity;

  teamMode = TEAM_MODE;
  surveyTeamMode = this.teamMode.no;
  defaultValue: object;
  surveyCategoryIds = [];
  categorySelected: number;
  categoryNavigation = false;

  selectedCategory$: Observable<Category> = this.surveyService.getSurveySelectedCategory();
  isBestPracticeSelected$: Observable<boolean> = this.surveyService.isBestPracticedSelected();

  bestPracticeId = GOOD_PRACTICE_CATEGORY_ID;

  loading$: Observable<boolean> = this.surveyService.isLoading();

  constructor(
    private renderer: Renderer2,
    private draftService: DraftService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private profileService: ProfileService,
  ) {}
  toggleCollapse(isCollapsed): void {
    this.isCollapsed = isCollapsed;
    if (this.isCollapsed) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
  ngOnInit(): void {
    this.categoryNavigation = true;
    // Initialize questions forms.
    this.userEntity$.subscribe(val => {
      if (val) {
        this.userEntity = val;
        this.defaultValue = {entity: this.userEntity.id, place: '', client: '', date: ''};
      }
    });
    combineLatest([
      this.profileService.getUser(),
      this.surveyService.getSurveyOfUser(),
      this.draftService.getSurveyDraft(),
    ]).pipe(
      filter(([user, survey, draft]) => !!user && !!survey && draft !== undefined),
      take(1),
    ).subscribe(([user, survey, draft]) => {

      // Merge questions in a single array to make initialization easier.
      survey.surveyCategories.forEach((category: Category) => {
        this.surveyCategoryIds.push(category.surveyCategoryId);
        category.surveyQuestion.forEach((question: Question) => {
          this.questions.push(question);
        });
      });

      if (draft) {
        this.initFormFromDraft(draft);
      } else {
        this.initFormFromScratch(user.entityId);
        this.setDefaultValue(this.defaultValue);
      }

      this.surveyTeamMode = survey.surveyTeam;
    });
  }

  private setDefaultValue(defaultValue): void {
    this.mainForm.patchValue(defaultValue);
  }

  maxDateCalculate() {
    return new Date();
  }

  minDateCalculate() {
    let  day = (new Date().getDate()).toString();
    day = Number(day) < 10 ? `0${day}` : `${day}`;
    const time = `${new Date().getMonth() + 1}/${day}/${new Date().getFullYear() - 1}`;
    return new Date(time);
  }

  addTeamMember(): void {
    const teamMember = buildTeamMemberForm();
    this.teamMembersForms = this.teamMembersForms.concat(teamMember);

    this.questions
      .filter(question => question.surveyQuestionType === TYPE_TEAM)
      .forEach(question => {
        this.questionsForms.push({
          group: buildQuestionForm(question, teamMember.value.id),
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
    return this.questionsForms
      .filter(questionForm => {
        return questionForm.question.surveyQuestionCategoryId === categoryId;
      })
      .sort((a, b) => {
        if (a.question.surveyQuestionOrdonnancement !== b.question.surveyQuestionOrdonnancement) {
          return a.question.surveyQuestionOrdonnancement - b.question.surveyQuestionOrdonnancement;
        }

        return Number(a.group.value.teamMemberId) - Number(b.group.value.teamMemberId);
      });
  }

  getQuestionMember(teamMemberId: string): TeamMemberType {
    const teamMemberForm = this.teamMembersForms
      .find(group => group.value.id === teamMemberId);

    return teamMemberForm
      ? teamMemberForm.value
      : null;
  }

  selectSurveyCategory(id: number): void {
    this.isCollapsed = false;
    this.renderer.removeClass(document.body, 'no-scroll');
    this.surveyService.selectSurveyCategory(id);
    this.categorySelected = id;
    if (id !== -1) { this.categoryNavigation = true; }
    window.scrollTo(0, 0);
  }

  nextCategory() {
    const indexCategory = this.surveyCategoryIds.findIndex(categoryId => categoryId === this.categorySelected);
    const nextCategory = this.surveyCategoryIds[indexCategory + 1];
    this.categorySelected = nextCategory;
    if (indexCategory + 1 < this.surveyCategoryIds.length) {
      this.surveyService.selectSurveyCategory(nextCategory);
      window.scrollTo(0, 0);
      this.categoryNavigation = true;
    } else {
      this.surveyService.selectSurveyCategory(this.bestPracticeId);
      window.scrollTo(0, 0);
      this.categoryNavigation = false;
    }
  }

  countSurveyFields(): number {
    return 4 + (this.surveyTeamMode === this.teamMode.no ? 0 : this.teamMembersForms.length);
  }

  countValidSurveyFields(): number {
    const countTeamMembersForm = this.surveyTeamMode === this.teamMode.no
      ? 0
      : this.teamMembersForms.reduce((sum, form) => {
          return sum + (form.status === 'VALID' ? 1 : 0);
        }, 0);
    return (+this.mainForm.get('entity').valid)
      + (+this.mainForm.get('place').valid)
      + (+this.mainForm.get('client').valid)
      + (+this.mainForm.get('date').valid)
      + countTeamMembersForm;
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

  countTotal(): number {
    // +1 for best practice.
    return this.countSurveyFields() + this.questionsForms.length + 1;
  }

  countValidTotal(): number {
    return this.countValidSurveyFields()
      + this.questionsForms
        .filter(form => form.group.status === 'VALID')
        .length
      + (+(this.bestPracticeForm.status === 'VALID'));
  }

  initFormFromScratch(userEntityId: number): void {
    if (userEntityId) {
      this.mainForm.patchValue({entityId: userEntityId.toString()});
    }

    this.questions.forEach((question: Question) => {
      const teamMemberId = question.surveyQuestionType === TYPE_GENERAL
        ? ''
        : this.teamMembersForms[0].get('id').value;

      this.questionsForms.push({
        group: buildQuestionForm(question, teamMemberId),
        question,
      });
    });
  }

  initFormFromDraft(draft: ResultDraft): void {
    this.mainForm.patchValue(draft.main);
    this.teamMembersForms = [];
    draft.teamMembers.forEach(teamMember => {
      const teamMemberGroup = buildTeamMemberForm();
      teamMemberGroup.patchValue(teamMember);
      this.teamMembersForms.push(teamMemberGroup);
    });
    this.questionsForms = [];
    draft.questions.forEach(questionDraft => {
      const question = this.questions
        .find(q => q.surveyQuestionId.toString() === questionDraft.id);
      const questionGroup = buildQuestionForm(question, questionDraft.teamMemberId);
      // if the comment is '', add a space to make it as ' ' to avoid form patchValue failure
      questionDraft.comment = questionDraft.comment === '' ? ' ' : questionDraft.comment;
      questionGroup.patchValue(questionDraft);
      this.questionsForms.push({question, group: questionGroup});
    });
    draft.bestPractice.comment = draft.bestPractice.comment === '' ? ' ' : draft.bestPractice.comment;
    this.bestPracticeForm.patchValue(draft.bestPractice);
  }
}

