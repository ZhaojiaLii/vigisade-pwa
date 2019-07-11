import { Injectable } from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { SurveyService } from '../../visit/services/survey.service';
import { DataService } from '../../../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {

  constructor(
    private profileService: ProfileService,
    private surveyService: SurveyService,
    private dataService: DataService,
  ) {}

  /**
   * Load all data which are required for the application.
   * Then the app will work on offline mode.
   */
  loadRequiredData() {
    this.dataService.loadData();
    this.dataService.loadHeader();
    this.profileService.loadUser();
    this.surveyService.loadSurvey();
  }
}
