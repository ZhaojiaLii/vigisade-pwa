import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SurveyService } from '../../survey/services/survey.service';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { Survey } from '../../survey/interfaces/getSurveys/survey.interface';
import { Category } from '../../survey/interfaces/getSurveys/category.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { Result } from '../../survey/interfaces/results/result.interface';
import { GOOD_PRACTICE_CATEGORY_ID } from '../../survey/interfaces/getResultInterface/bestPractice.interface';
import { QuestionResult } from '../../history/interfaces/question-result.interface';

@Component({
  selector: 'app-detail-visit',
  templateUrl: './history-details.component.html',
})
export class HistoryDetailsComponent implements OnInit, OnDestroy {

  isCollapsed = false;

  result$: Observable<Result> = this.historyService.getSelectedResult();
  resultArea$: Observable<Area> = this.historyService.getSelectedResultArea();
  resultEntity$: Observable<Entity> = this.historyService.getSelectedResultEntity();

  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();

  selectedCategory$: Observable<Category> = this.historyService.getSelectedCategory();
  selectedQuestions$: Observable<QuestionResult[]> = this.historyService.getSelectedQuestions();
  isGoodPracticeSelected$: Observable<boolean> = this.historyService.isGoodPracticeSelected();

  goodPracticeId = GOOD_PRACTICE_CATEGORY_ID;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.historyService.selectResultCategory(null);

    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'), 10);
      this.historyService.selectResult(id);
      this.historyService.loadResult(id);
    });
  }

  ngOnDestroy(): void {
    this.historyService.selectResult(null);
    this.historyService.selectResultCategory(null);
  }

  selectCategory(id: number): void {
    this.historyService.selectResultCategory(id);
    this.isCollapsed = !this.isCollapsed;
    window.scroll(0, 0);
  }

  goToNextCategory() {
    this.historyService.goToNextResultCategory();
    window.scroll(0, 0);
  }
}
