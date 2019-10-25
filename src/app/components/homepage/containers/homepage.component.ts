import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { combineLatest, Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Header } from '../../../interfaces/header.interface';
import { Router } from '@angular/router';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { MatDialog } from '@angular/material/dialog';
import { Direction } from '../../shared/interfaces/direction.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login/services/login.service';
import { LoginApiService } from '../../login/services/login-api.service';
import { map } from 'rxjs/operators';
import { ProfileComplete } from '../interfaces/profileComplete.interface';
import { SurveyService } from '../../survey/services/survey.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  user$: Observable<User> = this.profileService.getUser();
  userHasDirection$: Observable<boolean> = this.profileService.getUser().pipe(
    map((user) => { if (user) { return !!user.directionId; }})
  );
  header$: Observable<Header> = this.dataService.getHeader();
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private surveyService: SurveyService,
    private router: Router,
    private loginService: LoginService,
    private loginApiService: LoginApiService,
    private correctionService: ActionCorrectiveService,
    public dialog: MatDialog,
  ) {}
  loading = false;
  clickAtraiter() {
   this.router.navigate(['/atraiter']);
   this.correctionService.fromHomepage();
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

  openRedirectDialog() {
    const dialogRef = this.dialog.open(RedirectDangerousComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
    });
    // dialogRef.updatePosition({ top: `30px`, right: `40px`});
  }

  ngOnInit(): void {
    this.loading = true;
    this.user$.subscribe(user => {
      if (user) {
        if (!user.directionId || !user.areaId || !user.entityId) {
          this.openDialog();
        }
      }
    });
    if (localStorage.getItem('redirect')) {
      this.openRedirectDialog();
      localStorage.removeItem('redirect');
    }
    this.userHasDirection$.subscribe(status => {
      if (status && navigator.onLine) { this.surveyService.loadSurveys(); }
    });
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}

@Component({
  selector: 'app-redirect-dangerous',
  templateUrl: './redirect-dangerous-popin.html',
})
export class RedirectDangerousComponent {
  constructor(
    private router: Router,
  ) {}
  redirect() {
    this.router.navigate(['/dangerous']);
  }

}

@Component({
  selector: 'app-dze-select',
  templateUrl: './profile-complete-select.component.html',
})
export class DZESelectComponent {
  profileCompleteForm = new FormGroup({
    directionId: new FormControl('', [Validators.required]),
    areaId: new FormControl('', [Validators.required]),
    entityId: new FormControl('', [Validators.required]),
  });
  direction$: Observable<Direction[]> = this.dataService.getDirections();
  area$: Observable<Area[]> = combineLatest([this.profileCompleteForm.valueChanges, this.direction$]).pipe(
    map(([changes, directions]: [ProfileComplete, Direction[]]) => {
      if (!directions || directions.length === 0 || !changes || !changes.directionId) {
        return [];
      }
      const selectedDirection = directions.find(direction => direction.id === Number(changes.directionId));
      return selectedDirection ? selectedDirection.area : [];
    }),
  );
  entity$: Observable<Entity[]> = combineLatest([this.profileCompleteForm.valueChanges, this.area$]).pipe(
    map(([changes, areas]: [ProfileComplete, Area[]]) => {
      if (!areas || areas.length === 0 || !changes || !changes.areaId) {
        return [];
      }
      const selectedArea = areas.find(area => area.id === Number(changes.areaId));
      return selectedArea ? selectedArea.entity : [];
    })
  );

  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
  ) {}

  sendForm() {
    const formData: Partial<User> = {
      directionId: Number(this.profileCompleteForm.get('directionId').value),
      areaId: Number(this.profileCompleteForm.get('areaId').value),
      entityId: Number(this.profileCompleteForm.get('entityId').value),
      language: 'fr',
    };
    this.profileService.updateUser(formData);
  }
}
