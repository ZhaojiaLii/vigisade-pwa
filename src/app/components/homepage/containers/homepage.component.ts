import {Component, OnInit} from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DataService } from '../../../services/data.service';
import { Header } from '../../../interfaces/header.interface';
import { TranslateService } from '@ngx-translate/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { frLocale, esLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';


import * as moment from 'moment';
import 'moment/min/locales';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

  user$: Observable<User> = this.profileService.getUser();
  header$: Observable<Header> = this.dataService.getHeader();

  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private translateService: TranslateService,
    private BsDatepickerlocaleService: BsLocaleService
  ) {}

  ngOnInit(): void {
    this.user$.pipe(
      filter(user => !!user)
    ).subscribe(user => {
        /* Define moment locale */
        moment.locale(user.language + '-' + user.language);
        this.translateService.setDefaultLang(user.language);

        /* Bootstrap DatePicker */
        defineLocale('es', esLocale);
        defineLocale('en', enGbLocale);
        defineLocale('fr', frLocale);
        this.BsDatepickerlocaleService.use(user.language);

    });
  }
}
