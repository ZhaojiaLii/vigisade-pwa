import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-element',
  templateUrl: './history-element.component.html',
})
export class HistoryElementComponent implements OnInit {
  @Input() place;
  @Input() date;
  @Input() client;
  @Input() status;
  isCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
