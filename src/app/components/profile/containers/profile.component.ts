import { ProfileService } from '../services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  options: FormGroup;

  user$: Observable<User> = this.profileService.getUser();

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) {
    this.options = fb.group({
      color: 'French',
    });
  }
}
