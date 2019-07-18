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

@Component({
  selector: 'app-detail-visit',
  templateUrl: './history-details.component.html',
})
export class HistoryDetailsComponent implements OnInit, OnDestroy {
  selectedId: number;
  nextResultId: number;
  isCollapsed = false;
  resultsNum: any;

  result$: Observable<Result> = this.historyService.getSelectedResult();
  resultSurvey$: Observable<Survey> = this.historyService.getSelectedResultSurvey();
  resultEntity$: Observable<Entity> = this.historyService.getSelectedResultEntity();
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
    this.route.paramMap.subscribe(params => {
      const resultId = parseInt(params.get('id'), 10);
      this.historyService.selectResult(resultId);
      this.historyService.loadResult(resultId);
    });
  }

  ngOnDestroy(): void {
    this.historyService.selectResult(null);
  }

  nextResult() {
    this.nextResultId = this.selectedId + 1;
    if (this.nextResultId > this.resultsNum) {
      // if the result is the last one, navigate to the first result
      this.nextResultId = 1;
      this.router.navigate(['/history', this.nextResultId]);
      window.scroll(0, 0);
      this.toastrService.success('Retourner à la première', 'Visite: ' + this.nextResultId);
    } else {
      this.router.navigate(['/history', this.nextResultId]);
      window.scroll(0, 0);
      this.toastrService.success('La visite prochaine', 'Visite: ' + this.nextResultId);
    }
  }

  selectCategory(id: number): void {
    this.historyService.selectResultCategory(id);
    this.isCollapsed = false;
  }
}
