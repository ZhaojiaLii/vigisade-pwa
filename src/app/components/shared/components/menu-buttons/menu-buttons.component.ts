import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyService } from '../../../survey/services/survey.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
})
export class MenuButtonsComponent {

  hasSurvey$: Observable<boolean> = this.surveyService.getSurveyOfUser().pipe(
    map(survey => !!survey),
  );
  hasDangerousType$: Observable<boolean> = this.dataService.getDangerousSituationTypes().pipe(
    map(types => !!types),
  );

  constructor(
    private surveyService: SurveyService,
    private dataService: DataService,
  ) {}
}
