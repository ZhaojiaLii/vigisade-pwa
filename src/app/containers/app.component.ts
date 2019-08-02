import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { LayoutService } from '../services/layout.service';
import { LoginService } from '../components/login/services/login.service';
import { DataService } from '../services/data.service';
import { ProfileService } from '../components/profile/services/profile.service';
import { HistoryService } from '../components/history/services/history.service';
import { SurveyService } from '../components/visit/services/survey.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private loginService: LoginService,
    private dataService: DataService,
    private profileService: ProfileService,
    private historyService: HistoryService,
    private surveyService: SurveyService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {

    this.translateService.addLangs(['fr', 'en', 'es']);
    this.translateService.setDefaultLang('fr');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.layoutService.closeMenu());

    this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
      take(1),
    ).subscribe(() => {
      this.surveyService.loadSurveys();
      this.dataService.loadData();
      this.dataService.loadHeader();
      this.profileService.loadUser();
      this.historyService.loadHistory();
    });
  }
}
