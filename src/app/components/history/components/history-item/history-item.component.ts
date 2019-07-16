import { Component, Input } from '@angular/core';
import { Result } from '../../../visit/interfaces/result.interface';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
})
export class HistoryItemComponent {
  @Input() result: Result;
}