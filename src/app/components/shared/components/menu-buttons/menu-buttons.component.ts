import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyService } from '../../../visit/services/survey.service';
import { DangerousService } from '../../../dangerous/services/dangerous.service';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html'
})
export class MenuButtonsComponent {

  hasSurvey$: Observable<boolean> = this.surveyService.getSurveyOfUser().pipe(
    map(survey => !!survey),
  );
  hasDangerousType$: Observable<boolean> = this.dangerousService.getDangerousTypes().pipe(
    map( types => !!types),
  );

  constructor(
    private surveyService: SurveyService,
    private dangerousService: DangerousService,
  ) {}
}
