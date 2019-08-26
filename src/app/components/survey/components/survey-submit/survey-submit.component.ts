import { Component, Input } from '@angular/core';
import { Survey, TEAM_MODE } from '../../interfaces/getSurveys/survey.interface';
import { ResultTeamMember } from '../../interfaces/results/result-team-member.interface';
import { Result } from '../../interfaces/results/result.interface';
import { FormGroup } from '@angular/forms';
import { Category } from '../../interfaces/getSurveys/category.interface';
import { SurveyService } from '../../services/survey.service';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ProfileService } from '../../../profile/services/profile.service';
import { Question } from '../../interfaces/getSurveys/question.interface';
import { ToastrService } from 'ngx-toastr';
import { DraftService } from '../../../../services/draft.service';
import { User } from '../../../profile/interfaces/user';
import { ResultQuestion } from '../../interfaces/results/result-question.interface';
import { TranslateService } from '@ngx-translate/core';
import { HistoryService } from '../../../history/services/history.service';

@Component({
  selector: 'app-survey-submit',
  templateUrl: './survey-submit.component.html',
})
export class SurveySubmitComponent {

  @Input() isFormValid = false;

  @Input() user: User;
  @Input() surveyId: number;

  @Input() mainForm: FormGroup;
  @Input() teamMembersForms: FormGroup[];
  @Input() questionsForms: {group: FormGroup, question: Question}[];
  @Input() bestPracticeForm: FormGroup;

  constructor(
    private draftService: DraftService,
    private surveyService: SurveyService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private historyService: HistoryService,
  ) {}

  save() {
    this.draftService.saveSurveyDraft({
      ids: {
        survey: this.surveyId,
        user: this.user.id,
        direction: this.user.directionId,
      },
      main: this.mainForm.value,
      teamMembers: this.teamMembersForms.map(group => group.value),
      questions: this.questionsForms.map(form => form.group.value),
      bestPractice: this.bestPracticeForm.value,
    });

    this.toastr.success(this.translateService.instant('Visite.Brouillon enregistré.'));
  }

  private getNextCategory(currentCategory: Category): Observable<Category> {
    return this.surveyService.getSurveyOfUser().pipe(
      switchMap((survey: Survey) => {
        if (!currentCategory) {
          return of(survey.surveyCategories[0]);
        }

        const currentCategoryIndex = survey.surveyCategories.findIndex(category => {
          return category.surveyCategoryId === currentCategory.surveyCategoryId;
        });

        return (survey.surveyCategories.length <= (currentCategoryIndex + 1))
          ? of(null)
          : of(survey.surveyCategories[currentCategoryIndex + 1]);
      }),
    );
  }

  sendForm() {
    combineLatest([
      this.surveyService.getSurveyOfUser(),
      this.profileService.getUser(),
    ]).pipe(take(1)).subscribe(([survey, user]) => {
      const questions: ResultQuestion[] = this.questionsForms.map(form => {
        return {
          resultQuestionId: null,
          resultQuestionResultId: null,
          resultQuestionResultQuestionId: Number(form.group.value.id),
          resultQuestionResultNotation: Number(form.group.value.selection),
          resultQuestionResultComment: form.group.value.comment,
          resultQuestionResultPhoto: form.group.value.photo,
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
        resultEntityId: this.mainForm.get('entity').value,
        resultDate: this.mainForm.get('date').value,
        resultPlace: this.mainForm.get('place').value,
        resultClient: this.mainForm.get('client').value,
        resultValidated: true,
        resultTeamMember: teamMembers,
        resultQuestion: questions,
        resultBestPracticeTypeId: this.bestPracticeForm.value.type,
        resultBestPracticeDone: this.bestPracticeForm.value.selection,
        resultBestPracticeComment: this.bestPracticeForm.value.comment,
        resultBestPracticePhoto: this.bestPracticeForm.value.photo,
      };
      this.surveyService.setLoadingState(true);
      this.surveyService.createResult(result);
      this.surveyService.loadSurveys();
      this.historyService.loadHistory();
    });
  }
}
