import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SurveyBestPracticeComponent } from './components/survey-best-practice/survey-best-practice.component';
import { SurveyQuestionComponent } from './components/survey-question/survey-question.component';
import { SurveyTeamMemberComponent } from './components/survey-team-member/survey-team-member.component';
import { VisitComponent } from './containers/visit.component';
import { SurveySubmitComponent } from './components/survey-submit/survey-submit.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SurveyBestPracticeComponent,
    SurveyQuestionComponent,
    SurveySubmitComponent,
    SurveyTeamMemberComponent,
    VisitComponent,
  ],
})
export class SurveyModule {}
