import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Direction } from '../../shared/interfaces/direction.interface';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userDirectionId: number; userAreaId: number; userEntityId: number;
  userDirection: string; userArea: string; userEntity: string;
  Directions = []; Areas = []; Entities = [];
  currentLanguage = 'Français';
  Languages = ['Français', 'Anglais', 'Espagnol'];
  userMail: string; userFirstName: string; userLastName: string; userPhoto: string;
  userCountRemainingActions: number; userCountCurrentMonthVisits: number; usercountLastMonthVisits: number;
  language = new FormGroup({
    language: new FormControl(''),
  });
  postForm = new FormGroup({
    direction: new FormControl(''),
    area: new FormControl(''),
    entity: new FormControl(''),
  });
  changedDirectionId: number; changedAreaId: number; changedEntityId: number; changedLanguage: string;
  user$: Observable<User> = this.profileService.getUser();
  direction$: Observable<Direction[]> = this.dataService.getDirections();
  area$: Observable<Area[]> = this.dataService.getAreas();
  entity$: Observable<Entity[]> = this.dataService.getEntities();
  constructor(
    private profileService: ProfileService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.language = this.fb.group({
      language: this.currentLanguage
    });
    this.Languages.forEach(language => {
      if (language === this.currentLanguage) {
        this.Languages.splice(this.Languages.indexOf(language), 1);
      }
    });
    this.user$.subscribe(user => {
        this.userDirectionId = user.directionId;
        this.userAreaId = user.areaId;
        this.userEntityId = user.entityId;
        this.userMail = user.mail;
        this.userLastName = user.lastName;
        this.userFirstName = user.firstName;
        this.userPhoto = user.photo;
        this.userCountCurrentMonthVisits = user.countCurrentMonthVisits;
        this.userCountRemainingActions = user.countRemainingActions;
        this.usercountLastMonthVisits = user.countLastMonthVisits;
    });
    this.direction$.subscribe(directions => {
      this.Directions = [];
      for (const direction of directions) {
        if (direction.id === this.userDirectionId) {
          this.userDirection = direction.name;
        } else {
          this.Directions.push(direction);
        }
      }
    });
    this.area$.subscribe(areas => {
      this.Areas = [];
      for (const area of areas) {
        if (area.id === this.userAreaId) {
          this.userArea = area.name;
        } else {
          this.Areas.push(area);
        }
      }
    });
    this.entity$.subscribe(entities => {
      this.Entities = [];
      for (const entity of entities) {
        if (entity.id === this.userEntityId) {
          this.userEntity = entity.name;
        } else {
          this.Entities.push(entity);
        }
      }
    });
    this.onUserDataChanged();
  }
  onUserDataChanged() {
    this.postForm.valueChanges.subscribe(
      val => {
        if (val.direction !== '') {
          this.changedDirectionId = Number(val.direction);
        } else {
          this.changedDirectionId = this.userDirectionId;
        }
        if (val.area !== '') {
          this.changedAreaId = Number(val.area);
        } else {
          this.changedAreaId = this.userAreaId;
        }
        if (val.entity !== '') {
          this.changedEntityId = Number(val.entity);
        } else {
          this.changedEntityId = this.userEntityId;
        }
        const POST: User = {
          mail: this.userMail,
          directionId: this.changedDirectionId as number,
          areaId: this.changedAreaId,
          entityId: this.changedEntityId,
          firstName: this.userFirstName,
          lastName: this.userLastName,
          photo: this.userPhoto,
          countRemainingActions: this.userCountRemainingActions,
          countCurrentMonthVisits: this.userCountCurrentMonthVisits,
          countLastMonthVisits: this.usercountLastMonthVisits,
        };
        console.log('POST data is: ', POST);
        this.profileService.updateUser(POST);
        this.toastrService.success('Màj votre Profile', 'Succès');
      }
    );

    this.language.valueChanges.subscribe(
      val => {
        console.log(val.language);
        this.Languages = ['Français', 'Anglais', 'Espagnol'];
        if (val.language !== this.currentLanguage) {
          this.toastrService.success('Votre langue a changé à ' + val.language , 'Succès');
          this.currentLanguage = val.language;
        }
        this.Languages.forEach(language => {
          if (language === this.currentLanguage) {
            this.Languages.splice(this.Languages.indexOf(language), 1);
          }
        });
      }
    );
  }
}
