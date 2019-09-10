import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Header } from '../../../interfaces/header.interface';
import { Router } from '@angular/router';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { LayoutService } from '../../../services/layout.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

  user$: Observable<User> = this.profileService.getUser();
  header$: Observable<Header> = this.dataService.getHeader();
  redirect$: Observable<boolean> = this.layoutService.getStateRouteHome();
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private router: Router,
    private actionCorrectiveService: ActionCorrectiveService,
    private layoutService: LayoutService,
  ) {}

  clickAtraiter() {
   this.router.navigate(['/atraiter']);
   this.actionCorrectiveService.fromHomepage();
  }

  ngOnInit(): void {
    this.redirect$.subscribe(state => {
      if (state) {
        window.location.reload();
      }
    });
  }
}
