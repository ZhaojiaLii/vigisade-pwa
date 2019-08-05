import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { HistoryService } from '../services/history.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProfileService } from '../../profile/services/profile.service';
import { User } from '../../profile/interfaces/user';
import { filter, map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { DataService } from '../../../services/data.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  deviceInfo = null;
  isDesktop = false;
  countResult: number;
  results = [];
  areas = [];
  entities = [];
  creators = [];
  userHistoryDesktop$: Observable<any> = combineLatest(
    [this.historyService.getHistory(), this.profileService.getUser()]
  ).pipe(
    filter(([result, user]) => {
        // console.log(result);
        if (user.roles.includes('ROLE_ADMIN')) {
          this.results = [];
          for (const element of result.result) {
            if (element.resultDirection === user.directionId) {
              this.results.push({
                result: element,
                status: true
              });
            }
          }
        }
        if (user.roles.includes('ROLE_MANAGER') && !user.roles.includes('ROLE_ADMIN')) {
          this.results = [];
          for (const element of result.result) {
            if (element.resultEntity === user.entityId) {
              this.results.push({
                result: element,
                status: true
              });
            }
          }
        }
        if (!user.roles.includes('ROLE_MANAGER') && !user.roles.includes('ROLE_ADMIN')) {
          this.results = [];
          for (const element of result.result) {
            if (element.resultUserId === user.id) {
              this.results.push({
                result: element,
                status: true
              });
            }
          }
        }
        return true;
      }
    ),
    map(() => this.results),
  );

  userHistoryMobile$: Observable<any> = combineLatest([
    this.historyService.getHistory(),
    this.profileService.getUser(),
  ]).pipe(
    filter(([result, user]) => {
      this.results = [];
      for (const element of result.result) {
        if (element.resultUserId === user.id) {
          this.results.push({
            result: element,
            status: true
          });
        }
      }
      return true;
      }
    ),
    map(() => this.results),
    );
  user$: Observable<User> = this.profileService.getUser();
  area$: Observable<Area[]> = this.dataService.getAreas();
  entity$: Observable<Entity[]> = this.dataService.getEntities();
  userAreas$: Observable<any> = combineLatest(
    [this.user$, this.area$]
  ).pipe(
    filter(([user, area]) => {
      this.areas = [];
      for (const areaUnit of area) {
        if (areaUnit.direction === user.directionId) {
          this.areas.push(areaUnit);
        }
      }
      return true;
    }),
    map(() => this.areas),
  );
  userEntities$: Observable<any> = combineLatest(
    [this.entity$, this.userAreas$]
  ).pipe(
    filter(([entity, area]) => {
      this.entities = [];
      for (const entityUnit of entity) {
        for (const areaUnit of area) {
          if (areaUnit.id === entityUnit.area_id) {
            this.entities.push(entityUnit);
          }
        }
      }
      return true;
    }),
    map(() => this.entities),
  );
  creators$: Observable<any> = combineLatest(
    [this.userHistoryDesktop$]
  ).pipe(
    filter(([results]) => {
      for (const result of results) {
        const creatorName = result.result.resultUserfirstName + ' ' + result.result.resultUserlastName;
        const creatorId = result.result.resultUserId;
        const creator = {
          name: creatorName,
          id: creatorId,
        };
        const data = this.creators.find(cre => cre.name === creator.name);
        if (!data) {
          this.creators.push(creator);
        }
      }
      return true;
    }),
    map(() => this.creators),
  );

  filterForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    areaId: new FormControl(''),
    entityId: new FormControl(''),
    creator: new FormControl(''),
});

  constructor(
    private historyService: HistoryService,
    private deviceService: DeviceDetectorService,
    private profileService: ProfileService,
    private dataService: DataService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.historyService.loadHistory();
    this.deviceDetection();
    this.userAreas$.subscribe();
    this.userEntities$.subscribe();
    this.countResultNum(this.results);
    this.creators$.subscribe();
  }

  deviceDetection() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isMobile) {
      // console.log('MOBILE MODE');
      this.userHistoryMobile$.subscribe();
      this.isDesktop = false;
    }
    if (isDesktopDevice) {
      // console.log('PC MODE');
      this.userHistoryDesktop$.subscribe();
      this.isDesktop = true;
    }
  }

  filter() {
    if (this.filterForm.value.startDate && this.filterForm.value.endDate) {
      // filtering by date
      const start = formatDate(this.filterForm.value.startDate, 'dd/MM/yyyy', 'fr');
      const startYear = start.slice(start.length - 4, start.length);
      const startMonth = start.slice(3, 5);
      const startDay = start.slice(0, 2);
      const end = formatDate(this.filterForm.value.endDate, 'dd/MM/yyyy', 'fr');
      const endYear = end.slice(end.length - 4, end.length);
      const endMonth = end.slice(3, 5);
      const endDay = end.slice(0, 2);
      for (const result of this.results) {
        const resultDate = formatDate(result.result.resultDate, 'dd/MM/yyyy', 'fr');
        const resultYear = resultDate.slice(resultDate.length - 4, resultDate.length);
        const resultMonth = resultDate.slice(3, 5);
        const resultDay = resultDate.slice(0, 2);
        if (resultYear <= endYear && resultYear >= startYear) {
          if (resultMonth <= endMonth && resultMonth >= startMonth) {
            result.status = resultDay <= endDay && resultDay >= startDay;
          } else {
            result.status = false;
          }
        } else {
          result.status = false;
        }
      }
    } else {
      for (const result of this.results) {
        result.status = true;
      }
    }
    if (this.filterForm.value.area !== '' && this.filterForm.value.area !== null) {
      // filtering by area
      for (const result of this.results) {
        if (result.status === true) {
          result.status = Number(result.result.resultArea) === Number(this.filterForm.value.area);
        }
      }
    }
    if (this.filterForm.value.entity !== '' && this.filterForm.value.entity !== null) {
      // filtering by entity
      for (const result of this.results) {
        if (result.status === true) {
          result.status = Number(result.result.resultEntity) === Number(this.filterForm.value.entity);
        }
      }
    }
    if (this.filterForm.value.creator !== '' && this.filterForm.value.creator !== null) {
      // filtering by creator
      for (const result of this.results) {
        if (result.status === true) {
          result.status = Number(result.result.resultUserId) === Number(this.filterForm.value.creator);
        }
      }
    }
    // console.log(this.results);
    this.countResultNum(this.results);
    if (this.countResult === 0) {
      this.toastrService.error('Aucun Résultat');
    } else {
      this.toastrService.success(this.countResult + ' résultat(s) trouvé(s)');
    }
  }

  reInitFilter() {
    this.filterForm.reset();
    for (const result of this.results) {
      result.status = true;
    }
    this.countResultNum(this.results);
  }

  countResultNum(results: any) {
    this.countResult = 0;
    for (const result of results) {
      if (result.status === true) {
        this.countResult++;
      }
    }
  }
}
