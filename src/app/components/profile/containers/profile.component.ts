import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Direction } from '../../shared/interfaces/direction.interface';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userDirectionId: number;
  userDirection: string;
  userAreaId: number;
  userArea: string;
  userEntityId: number;
  userEntity: string;
  userProfile = new FormGroup({
    language: new FormControl(''),
    direction: new FormControl(''),
    zone: new FormControl(''),
    entity: new FormControl(''),
  });

  user$: Observable<User> = this.profileService.getUser();
  direction$: Observable<Direction[]> = this.dataService.getDirections();
  area$: Observable<Area[]> = this.dataService.getAreas();
  entity$: Observable<Entity[]> = this.dataService.getEntities();
  constructor(
    private profileService: ProfileService,
    private dataService: DataService,
    private store: Store<State>,
  ) {
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
        this.userDirectionId = user.directionId;
        this.userAreaId = user.areaId;
        this.userEntityId = user.entityId;
    });
    this.direction$.subscribe(directions => {
      for (const direction of directions) {
        if (direction.id === this.userDirectionId) {
          this.userDirection = direction.name;
        }
      }
    });
    this.area$.subscribe(areas => {
      for (const area of areas) {
        if (area.id === this.userAreaId) {
          this.userArea = area.name;
        }
      }
    });
    this.entity$.subscribe(entities => {
      for (const entity of entities) {
        if (entity.id === this.userEntityId) {
          this.userEntity = entity.name;
        }
      }
    });
    // this.profileService.loadUser();
    // this.user$.pipe(
    // ).subscribe(user => {
    //   console.log(user);
    //   this.userFirstName = user.firstName;
    //   this.userLastName = user.lastName;
    //   this.userMail = user.mail;
    //   this.userPhoto = user.photo;
    //   this.userDirectionId = user.directionId;
    //   this.userZoneId = user.zoneId;
    //   this.userEntityId = user.entityId;
    //   this.userLanguage = user.language;
    //   this.countCurrentMonthVisits = user.countCurrentMonthVisits;
    //   this.countLastMonthVisits = user.countLastMonthVisits;
    //   this.countRemainingActions = user.countRemainingActions;
    // });
  }

  onSelectionChanged() {
    console.log(this.userProfile.value);
  }

}
