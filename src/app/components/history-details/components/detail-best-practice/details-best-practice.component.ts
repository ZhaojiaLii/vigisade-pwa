import { Component, Input } from '@angular/core';
import { Survey } from '../../../visit/interfaces/getSurveys/survey.interface';
import { Result } from '../../../visit/interfaces/results/result.interface';

@Component({
  selector: 'app-details-best-practice',
  templateUrl: './details-best-practice.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {class : 'card card-full-width mb-10 shadow-none'},
})
export class DetailsBestPracticeComponent {

  @Input() survey: Survey;
  @Input() result: Result;

  isCollapsed = true;
}
