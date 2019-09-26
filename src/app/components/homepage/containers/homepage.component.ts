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
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../login/services/login.service';
import { LoginApiService } from '../../login/services/login-api.service';
import { map } from 'rxjs/operators';
import { ProfileComplete } from '../interfaces/profileComplete.interface';
import { TOKEN_KEY } from '../../../data/auth.const';
import { CookieServices } from '../../../services/cookie-services.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  user$: Observable<User> = this.profileService.getUser();
  header$: Observable<Header> = this.dataService.getHeader();
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private router: Router,
    private actionCorrectiveService: ActionCorrectiveService,
    private loginService: LoginService,
    private loginApiService: LoginApiService,
    public dialog: MatDialog,
    private cookie: CookieServices,
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
    if (this.cookie.get(TOKEN_KEY)) {
      this.loginService.setToken(this.cookie.get(TOKEN_KEY));
    }
    this.loading = true;
    this.user$.subscribe(user => {
      if (user) {
        if (!user.directionId || !user.areaId || !user.entityId) {
          // this.openDialog();
        }
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}

@Component({
  selector: 'app-dze-select',
  templateUrl: './profile-complete-select.component.html',
})
export class DZESelectComponent {
  profileCompleteForm = new FormGroup({
    directionId: new FormControl(''),
    areaId: new FormControl(''),
    entityId: new FormControl(''),
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
    };
    this.profileService.updateUser(formData);
  }
}
