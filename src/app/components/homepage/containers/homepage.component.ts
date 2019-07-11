import { Component } from '@angular/core';
import { HomepageService } from '../services/homepage.service';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {

  user$: Observable<User> = this.profileService.getUser();
  constructor(
    private homepageService: HomepageService,
    private profileService: ProfileService,
  ) {
    this.homepageService.loadRequiredData();
  }
}
