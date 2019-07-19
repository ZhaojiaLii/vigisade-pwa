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
  userDirectionId: number; userAreaId: number; userEntityId: number;
  userDirection: string; userArea: string; userEntity: string;
  Directions = []; Areas = []; Entities = [];
  allArea = []; allEntity = [];
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

  getTargetChildArea = [];
  getTargetChildEntity = [];
  ngOnInit(): void {
    this.Languages.forEach(language => {
      if (language === this.currentLanguage) {
        this.Languages.splice(this.Languages.indexOf(language), 1);
      }
    });
    this.user$.subscribe(user => {
      console.log(user);
      this.userDirectionId = user.directionId;
      this.userAreaId = user.areaId;
      this.userEntityId = user.entityId;
      this.userMail = user.mail;
      this.userLastName = user.lastName;
      this.userFirstName = user.firstName;
      this.userPhoto = user.photo;
    });
    this.direction$.subscribe(directions => {
      // console.log(directions);
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
      this.getTargetChildArea = [];
      for (const area of areas) {
        this.allArea.push(area);
        if (area.id === this.userAreaId) {
          this.userArea = area.name;
        } else {
          this.Areas.push(area); // all the areas except user current area
          if (area.direction === this.userDirectionId) {
            this.getTargetChildArea.push(area);
          }
        }
      }
      console.log(this.getTargetChildArea);
    });
    this.entity$.subscribe(entities => {
      // bugs need handle
      this.Entities = [];
      this.getTargetChildEntity = [];
      for (const entity of entities) {
        this.allEntity.push(entity);
        if (entity.id === this.userEntityId) {
          this.userEntity = entity.name;
        } else {
          this.Entities.push(entity); // all the entities except user current entity
          if (entity.area_id === this.userAreaId) {
            this.getTargetChildEntity.push(entity);
          }
        }
      }
      console.log(this.getTargetChildEntity);
    });
    this.onUserDataChanged();
  }
  onUserDataChanged() {
    this.postForm.valueChanges.subscribe(
      val => {
        console.log('form control output ', val);
        this.userArea = '';
        this.userAreaId = 0;
        this.userEntityId = 0;
        this.userEntity = '';
        const POST: UpdateUser = {
          firstname: this.userFirstName,
          lastname: this.userLastName,
          direction_id: this.changedDirectionId as number,
          area_id: this.changedAreaId as number,
          entity_id: this.changedEntityId as number,
          image: this.userPhoto,
        };
        // console.log('POST data is: ', POST);
        this.profileService.updateUser(POST);
        this.toastrService.success('Màj votre Profile', 'Succès');
      }
    );

    this.language.valueChanges.subscribe(
      val => {
        // console.log(val.language);
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
    this.postForm.get('direction').valueChanges.subscribe(val => {
        this.getTargetChildArea = [];
        this.getTargetChildEntity = [];
        this.changedDirectionId = Number(val);
        for (const area of this.allArea) {
          if (area.direction === this.changedDirectionId) {
            this.getTargetChildArea.push(area);
          }
        }
        for (const entity of this.allEntity) {
          for (const targetArea of this.getTargetChildArea) {
            if (entity.area_id === targetArea.id) {
              this.getTargetChildEntity.push(entity);
            }
          }
        }
        console.log(this.allArea);
      }
    );
    this.postForm.get('area').valueChanges.subscribe(val => {
        this.getTargetChildEntity = [];
        this.changedAreaId = Number(val);
        for (const entity of this.allEntity) {
          if (entity.area_id === this.changedAreaId) {
            this.getTargetChildEntity.push(entity);
          }
        }
      }
    );
    this.postForm.get('entity').valueChanges.subscribe(val => {
        this.changedEntityId = val;
      }
    );
  }
}
