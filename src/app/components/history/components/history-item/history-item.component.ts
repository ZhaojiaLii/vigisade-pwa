import { Component, Input } from '@angular/core';
import { HistoryResult } from '../../../visit/interfaces/getResultInterface/history-result.interface';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
})
export class HistoryItemComponent {
  @Input() result: HistoryResult;
}
