import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { ProfileApiService } from '../services/profile-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  test$: object;
  options: FormGroup;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private test12: ProfileApiService,
  ) {
    this.options = fb.group({
      color: 'French',
    });
  }

  getUser() {
    this.profileService.getUser();
    console.log('clicked');
  }

  test() {
    this.test12.Test().subscribe((data) => {
      console.log('data', data);
      this.test$ = {...data};
      console.log(this.test$);
    });
  }

}
