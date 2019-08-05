import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Direction } from '../../shared/interfaces/direction.interface';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { languages } from '../../../data/language.helpers';
import { SurveyService } from '../../visit/services/survey.service';
import * as moment from 'moment';
import 'moment/min/locales';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  userForm = new FormGroup({
    language: new FormControl(''),
    directionId: new FormControl(''),
    areaId: new FormControl(''),
    entityId: new FormControl(''),
  });

  languages = languages;

  user$: Observable<User> = this.profileService.getUser();
  direction$: Observable<Direction[]> = this.dataService.getDirections();
  area$: Observable<Area[]> = this.profileService.getUserAreas();
  entity$: Observable<Entity[]> = this.profileService.getUserEntities();

  constructor(
    private profileService: ProfileService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private surveyService: SurveyService,
  ) {}

  ngOnInit(): void {
    this.profileService.getUser().pipe(
      filter(user => !!user),
      take(1),
    ).subscribe(user => {

      /* Define moment locale */
      moment.locale(user.language + '-' + user.language);

      this.setDefaultValues(user);
      this.listenChanges();
    });
  }

  private setDefaultValues(user: User): void {
    this.userForm.patchValue({
      language: user.language,
      directionId: user.directionId,
      areaId: user.areaId,
      entityId: user.entityId
    });
  }

  private listenChanges(): void {
    this.userForm.valueChanges.subscribe((changes: Partial<User>) => {
      this.translateService.setDefaultLang(changes.language);
      this.profileService.updateUser(changes);
      this.surveyService.loadSurveys();
    });
  }
}
