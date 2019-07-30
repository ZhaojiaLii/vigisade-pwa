import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SurveyService } from '../../visit/services/survey.service';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';
import { ResultQuestion } from '../../history/interfaces/result-question.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';

@Component({
  selector: 'app-detail-visit',
  templateUrl: './history-details.component.html',
})
export class HistoryDetailsComponent implements OnInit, OnDestroy {
  nextResultIdIndex: number;
  isCollapsed = false;
  resultIds = [];
  questionNum = 0;
  thisResultId: number;
  thisResultIdIndex: number;
  showCategories = false;

  history$: Observable<GetResult> = this.historyService.getHistory();
  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  result$: Observable<Result> = this.historyService.getSelectedResult();
  resultSurvey$: Observable<Survey> = this.historyService.getSelectedResultSurvey();
  resultEntity$: Observable<Entity> = this.historyService.getSelectedResultEntity();
  resultArea$: Observable<Area> = this.historyService.getSelectedResultArea();
  selectedCategory$: Observable<Category> = this.historyService.getSelectedCategory();
  selectedQuestions$: Observable<ResultQuestion[]> = this.historyService.getSelectedQuestions();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.historyService.selectResultCategory(null);
    this.showCategories = false;
    this.route.paramMap.subscribe(params => {
      this.thisResultId = parseInt(params.get('id'), 10);
      this.historyService.selectResult(this.thisResultId);
      this.historyService.loadResult(this.thisResultId);
    });
    this.history$.subscribe(results => {
      for (const result of results.result) {
        this.resultIds.push(result.resultId);
      }
    });
    this.survey$.subscribe(survey => {
      const categories = survey.surveyCategories;
      let questionNum;
      for (const category of categories) {
        questionNum = category.surveyQuestion.length;
        this.calculateTotalQuestionNum(questionNum);
      }
    });
  }

  ngOnDestroy(): void {
    this.historyService.selectResult(null);
    this.historyService.selectResultCategory(null);
  }

  calculateTotalQuestionNum(question: number) {
    this.questionNum = this.questionNum + question;
  }
  nextResult() {
    this.thisResultIdIndex = this.resultIds.findIndex(id => id === this.thisResultId);
    // console.log(this.thisResultIdIndex);
    this.nextResultIdIndex = this.thisResultIdIndex + 1;
    if (this.nextResultIdIndex >= this.resultIds.length) {
      // if the result is the last one, navigate to the first result
      this.nextResultIdIndex = 0;
      this.router.navigate(['/history', this.resultIds[this.nextResultIdIndex]]);
      window.scroll(0, 0);
      this.toastrService.success('Retourner à la première', 'Visite: ' + (this.nextResultIdIndex + 1));
    } else {
      this.router.navigate(['/history', this.resultIds[this.nextResultIdIndex]]);
      window.scroll(0, 0);
      this.toastrService.success('La visite prochaine', 'Visite: ' + (this.nextResultIdIndex + 1));
    }
  }

  selectResult(id: number) {
    this.historyService.selectResultCategory(id);
    this.showCategories = true;
    this.isCollapsed = false;
  }
}
