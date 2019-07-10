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
  user: any;
  userFirstName = '';
  userLastName = '';
  userMail = '';
  userDirection = '';
  userZone = '';
  userEntity = '';
  userLanguage = '';
  userPhoto = '';
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
    // this.profileService.getUser();
    // this.store.select('profile').skip(2).subscribe(
    //   profile => {
    //     this.user = profile.user;
    //     this.userFirstName = this.user.firstName;
    //     this.userLastName = this.user.lastName;
    //     this.userMail = this.user.mail;
    //     this.userPhoto = this.user.photo;
    //     this.userDirection = this.user.direction;
    //     this.userZone = this.user.zone;
    //     this.userEntity = this.user.entity;
    //     this.userLanguage = this.user.language;
    //   }
    // );
  }

  onSelectionChanged() {
    console.log(this.userProfile.value);
  }

}
