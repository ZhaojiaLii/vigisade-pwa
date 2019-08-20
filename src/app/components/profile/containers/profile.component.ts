import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take, map, filter, pairwise, startWith, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Direction } from '../../shared/interfaces/direction.interface';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { ToastrService } from 'ngx-toastr';
import { languages } from '../../../data/language.helpers';
import { getDefaultFromAreaId, getDefaultFromDirectionId } from '../../../data/directions.helpers';
import { IMAGE_PATH } from '../../../data/image.helpers';
import { TranslateService } from '@ngx-translate/core';
import { BsLocaleService } from 'ngx-bootstrap';

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

  photo = '../../../../assets/images/profile/brocelia.jpeg';

  constructor(
    private profileService: ProfileService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private BsDatepickerlocaleService: BsLocaleService,
  ) {}

  ngOnInit(): void {
    this.profileService.getUser().pipe(
      filter(user => !!user),
      take(1),
    ).subscribe(user => {

      const defaultValue: Partial<User> = {
        language: user.language,
        directionId: user.directionId,
        areaId: user.areaId,
        entityId: user.entityId,
      };

      if (user.photo) {
        this.photo = IMAGE_PATH.profile + user.photo;
      }

      this.setDefaultValues(defaultValue);
      this.listenChanges(defaultValue);
    });
  }

  private setDefaultValues(user: Partial<User>): void {
    this.userForm.patchValue(user);
  }

  private listenChanges(user: Partial<User>): void {
    this.userForm.valueChanges.pipe(
      startWith(user),
      pairwise(),
      // Values are sent to API on change.
      switchMap(([prev, changes]: [Partial<User>, Partial<User>]) => {
        if (
          (prev.directionId === null && changes.directionId !== null)
          || (prev.directionId.toString() !== changes.directionId.toString())
        ) {
          return this.dataService.getDirections().pipe(
            take(1),
            map((directions: Direction[]) => ({
              ...changes,
              ...getDefaultFromDirectionId(directions, Number(changes.directionId)),
            })),
          );
        } else if (
          (prev.areaId === null && changes.areaId !== null)
          || (prev.areaId.toString() !== changes.areaId.toString())
        ) {
          return this.dataService.getAreas().pipe(
            take(1),
            map((areas: Area[]) => ({
              ...changes,
              ...getDefaultFromAreaId(areas, Number(changes.areaId)),
            })),
          );
        }

        return of(changes);
      }),
      // We must cast form's string to numbers.
      map(changes => ({
        ...changes,
        directionId: changes.directionId ? Number(changes.directionId) : null,
        areaId: changes.areaId ? Number(changes.areaId) : null,
        entityId: changes.entityId ? Number(changes.entityId) : null,
      })),
    ).subscribe((changes) => {
      this.profileService.updateUser(changes);

      const language = changes.language || 'fr';
      this.translateService.setDefaultLang(language);
      moment.locale(language + '-' + language);
      this.BsDatepickerlocaleService.use(language);
    });
  }
}
