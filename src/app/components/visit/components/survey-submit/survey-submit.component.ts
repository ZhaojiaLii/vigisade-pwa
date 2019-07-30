import { Component, Input } from '@angular/core';
import { ResultQuestion } from '../../interfaces/create/result-question.interface';
import { Survey, TEAM_MODE } from '../../interfaces/getSurveys/survey.interface';
import { ResultTeamMember } from '../../interfaces/create/result-team-member.interface';
import { Result } from '../../interfaces/create/result.interface';
import { FormGroup } from '@angular/forms';
import { Category } from '../../interfaces/getSurveys/category.interface';
import { SurveyService } from '../../services/survey.service';
import { Observable, combineLatest, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { ProfileService } from '../../../profile/services/profile.service';
import { Question } from '../../interfaces/getSurveys/question.interface';
import { ToastrService } from 'ngx-toastr';
import { DraftService } from '../../../../services/draft.service';

@Component({
  selector: 'app-survey-submit',
  templateUrl: './survey-submit.component.html',
})
export class SurveySubmitComponent {

  @Input() isFormValid = false;

  @Input() mainForm: FormGroup;
  @Input() teamMembersForms: FormGroup[];
  @Input() questionsForms: {group: FormGroup, question: Question}[];
  @Input() bestPracticeForm: FormGroup;

  constructor(
    private draftService: DraftService,
    private surveyService: SurveyService,
    private profileService: ProfileService,
    private toastr: ToastrService,
  ) {}

  save() {
    this.draftService.saveSurveyDraft({
      main: this.mainForm.value,
      teamMembers: this.teamMembersForms.map(group => group.value),
      questions: this.questionsForms.map(form => form.group.value),
      bestPractice: this.bestPracticeForm.value,
    });
    this.toastr.success('Brouillon enregistré.');
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

  private sendForm() {
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
        resultEntityId: user.entityId,
        resultDate: this.mainForm.get('date').value,
        resultPlace: this.mainForm.get('place').value,
        resultClient: this.mainForm.get('client').value,
        resultValidated: true,
        resultTeamMember: teamMembers,
        resultQuestion: questions,
        resultBestPracticeDone: this.bestPracticeForm.value.selection,
        resultBestPracticeComment: this.bestPracticeForm.value.comment,
        resultBestPracticePhoto: this.bestPracticeForm.value.photo,
      };

      this.surveyService.setLoadingState(true);
      this.surveyService.createResult(result);
    });
  }
}
