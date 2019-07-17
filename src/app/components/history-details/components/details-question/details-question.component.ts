import { Component, Input } from '@angular/core';
import { ResultQuestion } from '../../../history/interfaces/result-question.interface';

@Component({
  selector: 'app-details-question',
  templateUrl: './details-question.component.html',
})
export class DetailsQuestionComponent {

  @Input() question: ResultQuestion;

  constructor() {}
}
