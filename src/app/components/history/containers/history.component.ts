import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryService } from '../services/history.service';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';

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
  userResult = [];
  history$: Observable<GetResult> = this.historyService.getHistory();
  countHistory$: Observable<number> = this.historyService.countHistory();
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
      console.log(this.priority);
    });
    if (isMobile) {
      this.history$.subscribe(results => {
        this.userResult = [];
        for (const result of results.result) {
          if (result.resultUserId === this.userId) {
            this.userResult.push(result);
          }
        }
      });
    }
    if (isDesktopDevice) {
      this.history$.subscribe(results => {
        this.userResult = [];
        for (const result of results.result) {
          if (result.resultUserId === this.userId) {
            this.userResult.push(result);
          } else {
            if (this.priority.includes('ROLE_MANAGER') && !this.priority.includes('ROLE_ADMIN')) {
              // user is manager but not admin
              if (result.resultEntity === this.userEntityId) {
                this.userResult.push(result);
              }
              this.userResult.push();
            }
            if (!this.priority.includes('ROLE_CONDUCTEUR') && !this.priority.includes('ROLE_MANAGER')) {
              // user is admin
              if (result.resultDirection === this.userDirectionId) {
                this.userResult.push(result);
              }
            }
          }
        }
      });
    }
  }
}
