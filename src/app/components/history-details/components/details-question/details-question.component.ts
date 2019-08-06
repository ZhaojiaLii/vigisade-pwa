import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ResultQuestion } from '../../../visit/interfaces/results/result-question.interface';
import { Observable, combineLatest } from 'rxjs';
import { HistoryService } from '../../../history/services/history.service';
import { filter, map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveyQuestion } from '../../../history/interfaces/surveyQuestion.interface';
import { IMAGE_PATH } from '../../../../data/image.helpers';
import { Result } from '../../../visit/interfaces/results/result.interface';

@Component({
  selector: 'app-details-question',
  templateUrl: './details-question.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {class : 'card card-full-width mb-10 shadow-none'},
})
export class DetailsQuestionComponent implements OnInit, OnDestroy {

  @Input() question: SurveyQuestion;
  @Input() resultId: number;

  isCollapsed = true;
  thisQuestion: any;
  questionNotation: number;

  radioGroup = new FormGroup({
    radio1: new FormControl(''),
    radio2: new FormControl(''),
    radio3: new FormControl(''),
    radio4: new FormControl(''),
  });

  imagePath = IMAGE_PATH.result;

  getResult$: Observable<Result> = this.historyService.getSelectedResult();
  selectedQuestions$: Observable<ResultQuestion[]> = this.historyService.getSelectedQuestions();
  getResultQuestion$: Observable<any> = combineLatest(
    [this.historyService.getSelectedResult()]
  ).pipe(
    filter(([result]) => {
      if (result) {
        const questions = result.resultQuestion;
        this.thisQuestion = questions.find(question => question.resultQuestionResultQuestionId === this.question.surveyQuestionId);
        return true;
      }
    }),
    map(() => this.thisQuestion),
  );
  constructor(
    private historyService: HistoryService,
  ) {}

  ngOnInit(): void {
    // console.log(this.resultId); // 31
    this.getResultQuestion$.subscribe(question => {
      this.questionNotation = question.resultQuestionResultNotation;
      switch (this.questionNotation) {
        case 1: this.radioGroup.get('radio1').setValue('1'); break;
        case 2: this.radioGroup.get('radio2').setValue('2'); break;
        case 3: this.radioGroup.get('radio3').setValue('3'); break;
        case 4: this.radioGroup.get('radio4').setValue('4'); break;
      }
    });
  }

  ngOnDestroy(): void {
  }
}
