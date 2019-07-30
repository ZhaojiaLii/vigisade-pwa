import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HistoryDetailsComponent } from './containers/history-details.component';
import { DetailsTeamMemberComponent } from './components/details-team-member/details-team-member.component';
import { DetailsQuestionComponent } from './components/details-question/details-question.component';
import { FormsModule } from '@angular/forms';
import { DetailsBestPracticeComponent } from './components/detail-best-practice/details-best-practice.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
  ],
  declarations: [
    HistoryDetailsComponent,
    DetailsTeamMemberComponent,
    DetailsQuestionComponent,
    DetailsBestPracticeComponent,
  ],
})
export class HistoryDetailsModule {}
