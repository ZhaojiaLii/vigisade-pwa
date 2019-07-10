import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userFirstName: string;
  userLastName: string;
  userMail: string;
  userDirectionId: number;
  userZoneId: number;
  userEntityId: number;
  userLanguage: string;
  userPhoto: string;
  countCurrentMonthVisits: number;
  countLastMonthVisits: number;
  countRemainingActions: number;
  userProfile = new FormGroup({
    language: new FormControl(''),
    direction: new FormControl(''),
    zone: new FormControl(''),
    entity: new FormControl(''),
  });

  user$: Observable<User> = this.profileService.getUser();
  constructor(
    private profileService: ProfileService,
    private store: Store<State>,
  ) {
  }

  ngOnInit(): void {
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
