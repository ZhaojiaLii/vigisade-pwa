import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { HistoryService } from '../services/history.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  deviceInfo = null;
  priority = [];
  userId: number;
  userDirectionId: number;
  userEntityId: number;
  results = [];
  userHistoryDesktop$: Observable<any> = combineLatest(
    this.historyService.getHistory(),
    this.profileService.getUser(),
  ).pipe(
    filter(([result, user]) => {
        // console.log(result);
        if (user.roles.includes('ROLE_ADMIN')) {
          this.results = [];
          for (const element of result.result) {
            if (element.resultDirection === user.directionId) {
              this.results.push(element);
            }
          }
        }
        if (user.roles.includes('ROLE_MANAGER') && !user.roles.includes('ROLE_ADMIN')) {
          this.results = [];
          for (const element of result.result) {
            if (element.resultEntity === user.entityId) {
              this.results.push(element);
            }
          }
        }
        if (!user.roles.includes('ROLE_MANAGER') && !user.roles.includes('ROLE_ADMIN')) {
          this.results = [];
          for (const element of result.result) {
            if (element.resultUserId === user.id) {
              this.results.push(element);
            }
          }
        }
        return true;
      }
    ),
    map(() => this.results),
  );

  userHistoryMobile$: Observable<any> = combineLatest(
    this.historyService.getHistory(),
    this.profileService.getUser(),
  ).pipe(
    filter(([result, user]) => {
      this.results = [];
      for (const element of result.result) {
        if (element.resultUserId === user.id) {
          this.results.push(element);
        }
      }
      return true;
      }
    ),
    map(() => this.results),
    );
  user$: Observable<User> = this.profileService.getUser();

  constructor(
    private historyService: HistoryService,
    private deviceService: DeviceDetectorService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.historyService.loadHistory();
    this.deviceDetection();
  }

  deviceDetection() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    this.user$.subscribe(user => {
      this.userId = user.id;
      this.userDirectionId = user.directionId;
      this.userEntityId = user.entityId;
      this.priority = user.roles;
    });
    if (isMobile) {
      console.log('MOBILE');
      this.userHistoryMobile$.subscribe();
    }
    if (isDesktopDevice) {
      console.log('PC');
      this.userHistoryDesktop$.subscribe();
    }
  }
}
