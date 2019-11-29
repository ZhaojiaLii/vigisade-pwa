import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { combineLatest, Observable } from 'rxjs';
import { Correction } from '../../action-corrective/interfaces/getCorrection/correction.interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormControl, FormGroup } from '@angular/forms';
import { Area } from '../../shared/interfaces/area.interface';
import { ProfileService } from '../../profile/services/profile.service';
import { Entity } from '../../shared/interfaces/entity.interface';
import { map } from 'rxjs/operators';
import { HistorySearch } from '../../history/interfaces/history-search.interface';
import { User } from '../../profile/interfaces/user';
import { ROLES } from '../../../data/user.helpers';
import { ATraiterSearch } from '../interfaces/a-traiter.search';
import { HistoryService } from '../../history/services/history.service';
import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  correction$: Observable<Correction[]>;
  countCorrection$: Observable<number>;
  routingState$: Observable<boolean> = this.correctionService.getRoutingState();
  loading = false;
  isFromHomepage = false;
  isDesktop = false;
  roles = ROLES;
  status: string;
  entityToken = true;
  today = new Date();
  startDateDefault = new Date('2019-1-1');
  startDateSelected = new Date('2019-1-1');
  searchForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl(''),
    areaId: new FormControl(''),
    entityId: new FormControl(''),
    responsible: new FormControl(''),
  });

  user$: Observable<User> = this.profileService.getUser();
  areas$: Observable<Area[]> = this.profileService.getUserAreas();
  entities$: Observable<Entity[]> = combineLatest([
    this.profileService.getUserAreas(),
    this.searchForm.valueChanges,
  ]).pipe(
    map(([areas, changes]: [Area[], HistorySearch]) => {
      if (!areas || areas.length === 0 || !changes || !changes.areaId) {
        return [];
      }
      this.entityToken = false;
      const selectedArea = areas.find(area => area.id === Number(changes.areaId));
      return selectedArea ? selectedArea.entity : [];
    }),
  );
  creators$: Observable<{id: number, name: string, email: string}[]> = combineLatest(
    [
      this.correctionService.getCorrection(),
      this.correctionService.getAllUsers(),
      this.correctionService.getDangerousCorrection(),
      this.searchForm.valueChanges,
      this.historyService.getHistory(),
    ]).pipe(
    map(([corrections, users, dangerous, searchParam, history]: [Correction[], User[], Correction[], ATraiterSearch, GetResult]) => {
      if ((corrections || dangerous) && users && history && searchParam) {
        // if startDate selected, set as minDate of end date
        if (searchParam.startDate) {
          this.startDateSelected = new Date(searchParam.startDate);
        }
        if (searchParam.areaId && !searchParam.entityId) {
          // get corrections filtered by selected areaId
          const correctionToHandle =  corrections.filter(correction => {
            return history.result.find(result => result.resultId === correction.result_id).resultArea === Number(searchParam.areaId);
          });
          return this.getCreators(correctionToHandle, users, []);
        } else if (searchParam.entityId) {
          // get corrections filtered by selected entityId
          const correctionToHandle =  corrections.filter(correction => {
            return history.result.find(result => result.resultId === correction.result_id).resultEntity === Number(searchParam.entityId);
          });
          return this.getCreators(correctionToHandle, users, []);
        } else {
          // get corrections and dangerous situations
          return this.getCreators(corrections, users, dangerous);
        }
       }
    }),
  );
  constructor(
    private correctionService: ActionCorrectiveService,
    private deviceService: DeviceDetectorService,
    private profileService: ProfileService,
    private historyService: HistoryService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      if (!this.isFromHomepage) {
        this.resetSearch();
      } else {
        this.searchForm.patchValue({
          areaId: null,
          endDate: null,
          entityId: null,
          responsible: null,
          startDate: null,
          status: 'A traiter',
        });
        this.search();
      }
      this.correctionService.fromHomepageNavigated();
      }, 2000);
    this.status = null;
    this.correctionService.loadCorrection();
    this.entityToken = true;
    this.isDesktop = this.deviceService.isDesktop();
    if (this.deviceService.isDesktop()) {
      this.correction$ = this.correctionService.getDesktopCorrectionByDate();
      this.countCorrection$ = this.correctionService.countCorrection();
    } else {
      this.correction$ = this.correctionService.getMobileCorrectionByDate();
      this.countCorrection$ = this.correctionService.countMobileCorrection();
    }
    this.routingState$.subscribe(state => { this.isFromHomepage  = state; });
  }

  getCreators( corrections, users, dangerous) {
    if (corrections && dangerous) {
      const uniqueCorrectionId = [];
      const allCorrection = [...corrections, ...dangerous];
      return allCorrection.map(correction => ({
        id: correction.user_id,
        name: correction.resultUserfirstName + ' ' + correction.resultUserlastName,
        email: users.find(user => user.id === correction.user_id).mail,
      })).filter(creator => {
        if (uniqueCorrectionId.includes(creator.id)) {
          return false;
        }
        uniqueCorrectionId.push(creator.id);
        return true;
      });
    }
  }

  search(): void {
    this.status = this.searchForm.get('status').value;
    this.correctionService.setSearch(this.searchForm.value);
  }

  resetSearch(): void {
    this.status = null;
    this.searchForm.reset();
    this.entityToken = true;
    this.search();
  }
}
