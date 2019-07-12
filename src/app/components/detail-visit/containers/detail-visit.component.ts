import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SurveyService } from '../../visit/services/survey.service';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { Direction } from '../../shared/interfaces/direction.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-detail-visit',
  templateUrl: './detail-visit.component.html',
})
export class DetailVisitComponent implements OnInit {
  selectedId: number;
  nextResultId: number;
  isCollapsed = false;
  resultDirectionId: number;
  resultDirection: string;
  resultEntityId: number;
  resultEntity: string;
  resultsNum: any;
  result$: Observable<GetResult> = this.surveyService.getResult();
  teamMembers$: Observable<any> = this.surveyService.getTeamMembers();
  resultsNum$: Observable<number> = this.surveyService.getResultsCount();
  direction$: Observable<Direction[]> = this.dataService.getDirections();
  entity$: Observable<Entity[]> = this.dataService.getEntities();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private surveyService: SurveyService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('id');
      this.surveyService.loadResult(this.selectedId);
      console.log('selected', this.selectedId);
      this.result$.skip(1).subscribe(result => {
        this.resultDirectionId = result.directionId;
        this.resultEntityId = result.entityId;
        this.direction$.subscribe(directions => {
          for (const direction of directions) {
            if (direction.id === this.resultDirectionId) {
              this.resultDirection = direction.name;
            }
          }
        });
        this.entity$.subscribe(entities => {
          for (const entity of entities) {
            if (entity.id === this.resultEntityId) {
              this.resultEntity = entity.name;
            }
          }
        });
      });
    });
    this.resultsNum$.subscribe(num => { this.resultsNum = num; });
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

}
