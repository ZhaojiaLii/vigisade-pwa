import { Component, Input } from '@angular/core';
import { ResultQuestion } from '../../../history/interfaces/result-question.interface';

@Component({
  selector: 'app-details-question',
  templateUrl: './details-question.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {class : 'card card-full-width mb-10 shadow-none'},
})
export class DetailsQuestionComponent {

  @Input() question: ResultQuestion;

  isCollapsed = true;

  constructor() {}
}
