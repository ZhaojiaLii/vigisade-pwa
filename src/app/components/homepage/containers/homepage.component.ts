import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Header } from '../../../interfaces/header.interface';
import { Router } from '@angular/router';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { MatDialog } from '@angular/material/dialog';


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
    public dialog: MatDialog,
  ) {}

  clickAtraiter() {
   this.router.navigate(['/atraiter']);
   this.actionCorrectiveService.fromHomepage();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DZESelectComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.openDialog();
  }
}

@Component({
  selector: 'app-dze-select',
  templateUrl: './dze-select.component.html',
})
export class DZESelectComponent {}
