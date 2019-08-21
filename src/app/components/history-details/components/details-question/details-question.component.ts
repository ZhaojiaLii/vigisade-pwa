import { Component, Input } from '@angular/core';
import { IMAGE_PATH } from '../../../../data/image.helpers';
import { QuestionResult } from '../../../history/interfaces/question-result.interface';

@Component({
  selector: 'app-details-question',
  templateUrl: './details-question.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {class : 'card card-full-width mb-10 shadow-none'},
})
export class DetailsQuestionComponent {

  @Input() questionResult: QuestionResult;
  @Input() diameter: number;

  loading = true;
  color = 'primary';
  isCollapsed = true;
  imagePath = IMAGE_PATH.result;

  loadingImage() {
    this.loading = false;
  }
  error() {
    this.loading = false;
  }
}
