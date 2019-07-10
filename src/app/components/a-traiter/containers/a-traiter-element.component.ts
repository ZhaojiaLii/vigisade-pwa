import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-traiter-element',
  templateUrl: './a-traiter-element.component.html',
})
export class ATraiterElementComponent implements OnInit {
  @Input() place;
  @Input() date;
  @Input() client;
  constructor() { }

  ngOnInit() {
  }

}
