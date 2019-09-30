import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { LayoutService } from '../services/layout.service';
import { LoginService } from '../components/login/services/login.service';
import { DataService } from '../services/data.service';
import { ProfileService } from '../components/profile/services/profile.service';
import { HistoryService } from '../components/history/services/history.service';
import { SurveyService } from '../components/survey/services/survey.service';
import { TranslateService } from '@ngx-translate/core';
import { SwPush } from '@angular/service-worker';
import { BsLocaleService } from 'ngx-bootstrap';
import { enGbLocale, esLocale, frLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

import * as moment from 'moment';
import 'moment/min/locales';
import { ActionCorrectiveService } from '../components/action-corrective/services/action-corrective.service';
import { DangerousService } from '../components/dangerous/services/dangerous.service';
import { CookieServices } from '../services/cookie-services.service';
import { TOKEN_KEY } from '../data/auth.const';

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
    private surveyService: SurveyService,
    private translateService: TranslateService,
    private correctionService: ActionCorrectiveService,
    private historyService: HistoryService,
    private s: SwPush,
    private BsDatepickerlocaleService: BsLocaleService,
    private dangerousService: DangerousService,
    private cookie: CookieServices,
  ) {
    this.setupLanguage();
  }

  ngOnInit(): void {

    this.s.messages.subscribe(m => console.log('PUSH SW', m));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.layoutService.closeMenu());

    const token = this.cookie.get(TOKEN_KEY);
    if (token) {
      this.loginService.setToken(token);
    }
    this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
      take(1),
    ).subscribe(() => {
      this.surveyService.loadSurveys();
      this.dataService.loadData();
      this.dataService.loadHeader();
      this.profileService.loadUser();
      this.historyService.loadHistory();
      this.correctionService.loadAllUsers();
      this.dangerousService.loadDangerousHistory();
    });
  }

  private setupLanguage(): void {

    defineLocale('es', esLocale);
    defineLocale('en', enGbLocale);
    defineLocale('fr', frLocale);

    this.translateService.addLangs(['fr', 'en', 'es']);
    this.translateService.setDefaultLang('fr');

    this.profileService.getUser().pipe(
      filter(user => !!user),
      take(1),
    ).subscribe(user => {

      const language = (user.language !== null) ? user.language : 'fr';
      this.translateService.setDefaultLang(language);

      /* Define moment locale */
      moment.locale(language + '-' + language);

      /* Bootstrap DatePicker */
      this.BsDatepickerlocaleService.use(language);

    });
  }
}
