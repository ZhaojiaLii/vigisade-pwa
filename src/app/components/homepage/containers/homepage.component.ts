import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Header } from '../../../interfaces/header.interface';
import { Router } from '@angular/router';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { MatDialog } from '@angular/material/dialog';
import { Direction } from '../../shared/interfaces/direction.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../login/services/login.service';
import { LoginApiService } from '../../login/services/login-api.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

  user$: Observable<User> = this.profileService.getUser();
  header$: Observable<Header> = this.dataService.getHeader();
  google$: Observable<boolean> = this.loginService.isGoogleAccount();
  isGoogleConnection = false;
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private router: Router,
    private actionCorrectiveService: ActionCorrectiveService,
    private loginService: LoginService,
    private loginApiService: LoginApiService,
    public dialog: MatDialog,
  ) {}
  loading = false;
  clickAtraiter() {
   this.router.navigate(['/atraiter']);
   this.actionCorrectiveService.fromHomepage();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DZESelectComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if (result) {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } else {
        this.loginApiService.logout();
        setTimeout(() => {
          this.loading = false;
          window.location.reload();
        }, 500);
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.google$.subscribe(google => {
      this.isGoogleConnection = google;
    });
    setTimeout(() => {
      this.loading = false;
    }, 3500);
    if (this.isGoogleConnection) {
      this.openDialog();
    }
  }
}

@Component({
  selector: 'app-dze-select',
  templateUrl: './profile-complete-select.component.html',
})
export class DZESelectComponent {
  direction$: Observable<Direction[]> = this.dataService.getDirections();
  area$: Observable<Area[]> = this.profileService.getUserAreas();
  entity$: Observable<Entity[]> = this.profileService.getUserEntities();
  profileCompleteForm = new FormGroup({
    directionId: new FormControl(''),
    areaId: new FormControl(''),
    entityId: new FormControl(''),
  });
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
  ) {}

  sendForm() {
    const formData: Partial<User> = {
      directionId: Number(this.profileCompleteForm.get('directionId').value),
      areaId: Number(this.profileCompleteForm.get('areaId').value),
      entityId: Number(this.profileCompleteForm.get('entityId').value),
    };
    // this.profileService.updateUser(formData);
  }
}
