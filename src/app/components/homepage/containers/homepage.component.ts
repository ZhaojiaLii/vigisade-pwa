import {Component, OnInit} from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DataService } from '../../../services/data.service';
import { Header } from '../../../interfaces/header.interface';
import { TranslateService } from '@ngx-translate/core';

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
  ) {}

  ngOnInit(): void {
    this.user$.pipe(
      filter(user => !!user)
    ).subscribe(user => {
        this.translateService.setDefaultLang(user.language);
    });
  }
}
