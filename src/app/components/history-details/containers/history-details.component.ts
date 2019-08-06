import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SurveyService } from '../../visit/services/survey.service';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';
import { ResultQuestion } from '../../visit/interfaces/results/result-question.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { Result } from '../../visit/interfaces/results/result.interface';

@Component({
  selector: 'app-detail-visit',
  templateUrl: './history-details.component.html',
})
export class HistoryDetailsComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  resultIds = [];
  questionNum = 0;
  thisResultId: number;
  showCategories = false;
  thisCategoryIndex = 0;
  arriveLastCategory = false;
  surveyCategoryIds = [];

  history$: Observable<GetResult> = this.historyService.getHistory();
  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  result$: Observable<Result> = this.historyService.getSelectedResult();
  resultSurvey$: Observable<Survey> = this.historyService.getSelectedResultSurvey();
  resultEntity$: Observable<Entity> = this.historyService.getSelectedResultEntity();
  resultArea$: Observable<Area> = this.historyService.getSelectedResultArea();
  selectedCategory$: Observable<Category> = this.historyService.getSelectedCategory();
  selectedQuestions$: Observable<ResultQuestion[]> = this.historyService.getSelectedQuestions();
  getSelectedResultBestPractice$: Observable<any> = this.historyService.getSelectedResultBestPractice();

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
    this.resultSurvey$.subscribe(survey => {
      if (survey) {
        for (const category of survey.surveyCategories) {
          this.surveyCategoryIds.push(category.surveyCategoryId);
        }
      }
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

  nextCategory() {
    const categoryNum = this.surveyCategoryIds.length;
    if (this.thisCategoryIndex < categoryNum) {
      this.selectResult(this.surveyCategoryIds[this.thisCategoryIndex]);
      this.thisCategoryIndex++;
      this.arriveLastCategory = false;
      this.toastrService.success('Catégorie suivante');
    } else {
      this.selectBestPractice();
      this.thisCategoryIndex = 0;
      this.arriveLastCategory = true;
      this.toastrService.success('bonne pratique');
    }
    window.scroll(0, 0);
  }

  selectResult(id: number) {
    this.thisCategoryIndex = this.surveyCategoryIds.findIndex(categoryId => categoryId === id);
    this.historyService.selectResultCategory(id);
    this.showCategories = true;
    this.arriveLastCategory = false;
    this.isCollapsed = false;
  }

  selectBestPractice() {
    this.showCategories = false;
    this.isCollapsed = false;
    this.arriveLastCategory = true;
  }
}
