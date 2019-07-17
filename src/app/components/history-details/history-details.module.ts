import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HistoryDetailsComponent } from './containers/history-details.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HistoryDetailsComponent,
  ],
})
export class HistoryDetailsModule {}
