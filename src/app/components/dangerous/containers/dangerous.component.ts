import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetDangerousType } from '../interfaces/getDangerousType.interface';
import { DangerousService } from '../services/dangerous.service';
import { CreateDangerous } from '../interfaces/createDangerous.interface';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dangerous',
  templateUrl: './dangerous.component.html',
})
export class DangerousComponent implements OnInit {

  imgURL: any;
  date = new Date();
  postDangerous = new FormGroup({
    dangerousType: new FormControl(''),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  userDirectionId: number; userAreaId: number; userEntityId: number;
  dangerousType$: Observable<GetDangerousType> = this.dangerousService.getDangerousType();
  user$: Observable<User> = this.profileService.getUser();

  constructor(
    private dangerousService: DangerousService,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.dangerousService.loadDangerousType();
    this.user$.subscribe(user => {
      this.userDirectionId = user.directionId;
      this.userAreaId = user.areaId;
      this.userEntityId = user.entityId;
    });
  }

  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.imgURL = Event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // this.photoChanged();
    }
  }

  createDangerous() {
    const time = formatDate(this.date, 'dd-MM-yyyy hh:mm:ss a', 'fr-FR');
    const dangerousPayload: CreateDangerous = {
      dangerousType: this.postDangerous.value.dangerousType,
      directionId: this.userDirectionId,
      areaId: this.userAreaId,
      entityId: this.userEntityId,
      date: time,
      comment: this.postDangerous.value.comment,
      photo: this.postDangerous.value.photo,
    };
    console.log(time);
    console.log('post dangerous situation with payload: ', dangerousPayload);
    this.dangerousService.createDangerous(dangerousPayload);
  }


}
