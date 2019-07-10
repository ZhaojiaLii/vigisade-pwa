import { Injectable } from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { SurveyService } from '../../visit/services/survey.service';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {

  constructor(
    private profileService: ProfileService,
    private surveyService: SurveyService,
  ) {}

  /**
   * Load all data which are required for the application.
   * Then the app will work on offline mode.
   */
  loadRequiredData() {
    this.profileService.loadUser();
    this.surveyService.loadSurvey();
  }
}
