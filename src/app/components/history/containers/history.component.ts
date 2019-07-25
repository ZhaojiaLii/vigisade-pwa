import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryService } from '../services/history.service';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  history$: Observable<GetResult> = this.historyService.getHistory();
  countHistory$: Observable<number> = this.historyService.countHistory();

  constructor(
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.historyService.loadHistory();
  }
}
