import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { HistoryComponent } from './containers/history.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HistoryComponent,
    HistoryItemComponent,
  ],
})
export class HistoryModule {}
