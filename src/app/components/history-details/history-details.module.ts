import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HistoryDetailsComponent } from './containers/history-details.component';
import { DetailsTeamMemberComponent } from './components/details-team-member/details-team-member.component';
import { DetailsQuestionComponent } from './components/details-question/details-question.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HistoryDetailsComponent,
    DetailsTeamMemberComponent,
    DetailsQuestionComponent,
  ],
})
export class HistoryDetailsModule {}
