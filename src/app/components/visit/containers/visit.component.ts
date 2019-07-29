import { SurveyService } from '../services/survey.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey, TEAM_MODE } from '../interfaces/getSurveys/survey.interface';
import { Observable } from 'rxjs';
import { ProfileService } from '../../profile/services/profile.service';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { Category } from '../interfaces/getSurveys/category.interface';
import { BEST_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';
import { Direction } from '../../shared/interfaces/direction.interface';
import { filter, take } from 'rxjs/operators';
import { Question } from '../interfaces/getSurveys/question.interface';

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
  teamMembersForms: FormGroup[] = [new FormGroup({
    id: new FormControl(this.getRandomId(), [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  })];
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
  userDirection$: Observable<Direction> = this.profileService.getUserDirection();
  userEntities$: Observable<Entity[]> = this.profileService.getUserEntities();

  teamMode = TEAM_MODE;
  surveyTeamMode = this.teamMode.no;

  selectedCategory$: Observable<Category> = this.surveyService.getSurveySelectedCategory();
  isBestPracticeSelected$: Observable<boolean> = this.surveyService.isBestPracticedSelected();

  bestPracticeId = BEST_PRACTICE_CATEGORY_ID;

  loading$: Observable<boolean> = this.surveyService.isLoading();

  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private profileService: ProfileService,
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

      this.surveyTeamMode = survey.surveyTeam;
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

