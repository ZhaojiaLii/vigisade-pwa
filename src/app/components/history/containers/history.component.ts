import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  history$: Observable<Result[]> = this.historyService.getHistory();

  countHistory$: Observable<number> = this.historyService.countHistory();

  constructor(
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.historyService.loadHistory();
  }
}
