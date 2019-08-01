import { SurveyService } from '../services/survey.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey, TEAM_MODE } from '../interfaces/getSurveys/survey.interface';
import { Observable, combineLatest } from 'rxjs';
import { ProfileService } from '../../profile/services/profile.service';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { Category } from '../interfaces/getSurveys/category.interface';
import { BEST_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';
import { filter, take } from 'rxjs/operators';
import { Question, TYPE_GENERAL, TYPE_TEAM } from '../interfaces/getSurveys/question.interface';
import { buildQuestionForm, buildTeamMemberForm } from '../data/form.helpers';
import { ResultDraft } from '../interfaces/result-draft.interface';
import { DraftService } from '../../../services/draft.service';
import { Area } from '../../shared/interfaces/area.interface';
import { TeamMemberType } from '../interfaces/form/team-member-type.interface';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
})
export class VisitComponent implements OnInit {

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

  /** Data */
  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  surveyArea$: Observable<Area> = this.surveyService.getSurveyArea();
  userEntities$: Observable<Entity[]> = this.profileService.getUserEntities();

  teamMode = TEAM_MODE;
  surveyTeamMode = this.teamMode.no;

  selectedCategory$: Observable<Category> = this.surveyService.getSurveySelectedCategory();
  isBestPracticeSelected$: Observable<boolean> = this.surveyService.isBestPracticedSelected();

  bestPracticeId = BEST_PRACTICE_CATEGORY_ID;

  loading$: Observable<boolean> = this.surveyService.isLoading();

  constructor(
    private draftService: DraftService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    // Initialize questions forms.
    combineLatest([
      this.surveyService.getSurveyOfUser(),
      this.draftService.getSurveyDraft(),
    ]).pipe(
      filter(([survey, draft]) => !!survey),
      take(1),
    ).subscribe(([survey, draft]) => {

      // Merge questions in a single array to make initialization easier.
      survey.surveyCategories.forEach((category: Category) => {
        category.surveyQuestion.forEach((question: Question) => {
          this.questions.push(question);
        });
      });

      if (draft) {
        this.initFormFromDraft(draft);
      } else {
        this.initFormFromScratch();
      }

      this.surveyTeamMode = survey.surveyTeam;
    });
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

    console.log(this.questionsForms, this.teamMembersForms);
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

  getQuestionMember(teamMemberId: string): TeamMemberType {
    const teamMemberForm = this.teamMembersForms
      .find(group => group.value.id === teamMemberId);

    return teamMemberForm
      ? teamMemberForm.value
      : null;
  }

  selectSurveyCategory(id: number): void {
    this.isCollapsed = false;
    this.surveyService.selectSurveyCategory(id);
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

  initFormFromScratch(): void {
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
      questionGroup.patchValue(questionDraft);
      this.questionsForms.push({question, group: questionGroup});
    });
    this.bestPracticeForm.patchValue(draft.bestPractice);
  }
}

