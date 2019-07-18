import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Direction } from '../../shared/interfaces/direction.interface';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { ToastrService } from 'ngx-toastr';
import { UpdateUser } from '../interfaces/updateUser.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userDirectionId: number; userAreaId: number; userEntityId: number; userId: number;
  userDirection: string; userArea: string; userEntity: string;
  Directions = []; Areas = []; Entities = [];
  currentLanguage = 'Français';
  Languages = ['Français', 'Anglais', 'Espagnol'];
  userMail: string; userFirstName: string; userLastName: string; userPhoto: string;
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
  ) {}

  ngOnInit(): void {
    this.Languages.forEach(language => {
      if (language === this.currentLanguage) {
        this.Languages.splice(this.Languages.indexOf(language), 1);
      }
    });
    this.user$.subscribe(user => {
      console.log(user);
      this.userId = user.id;
      this.userDirectionId = user.directionId;
      this.userAreaId = user.areaId;
      this.userEntityId = user.entityId;
      this.userMail = user.mail;
      this.userLastName = user.lastName;
      this.userFirstName = user.firstName;
      this.userPhoto = user.photo;
    });
    this.direction$.subscribe(directions => {
      console.log(directions);
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
        // console.log(area);
        // @ts-ignore
        for (const singleArea of area) {
          if (singleArea.id === this.userAreaId) {
            this.userArea = singleArea.name;
          } else {
            this.Areas.push(singleArea);
          }
        }
      }
    });
    this.entity$.subscribe(entities => {
      // console.log(entities);
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
        const POST: UpdateUser = {
          firstname: this.userFirstName,
          lastname: this.userLastName,
          direction_id: this.changedDirectionId as number,
          area_id: this.changedAreaId,
          entity_id: this.changedEntityId,
          image: this.userPhoto,
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
