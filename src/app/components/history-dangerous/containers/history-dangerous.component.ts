import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { User } from '../../profile/interfaces/user';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { filter, map, pairwise, startWith } from 'rxjs/operators';
import { HistorySearch } from '../../history/interfaces/history-search.interface';
import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';
import { ROLES } from '../../../data/user.helpers';
import { HistoryResult } from '../../survey/interfaces/getResultInterface/history-result.interface';
import { HistoryService } from '../../history/services/history.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProfileService } from '../../profile/services/profile.service';
import { DangerousService } from '../../dangerous/services/dangerous.service';
import { DangerousSituationHistory } from '../../dangerous/interfaces/dangerous-situation-history.interface';

@Component({
  selector: 'app-history-dangerous',
  templateUrl: './history-dangerous.component.html',
})
export class HistoryDangerousComponent implements OnInit {


  isDesktop = false;

  searchForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    areaId: new FormControl(''),
    entityId: new FormControl(''),
    userId: new FormControl(''),
  });
  entityToken = true;
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
  creators$: Observable<{id: number, name: string}[]> = this.historyService.getHistory().pipe(
    filter(history => history && !!history.result),
    map((history: GetResult) => {
      const uniqueHistoryId = [];
      return history.result.map(result => ({
        id: result.resultUserId,
        name: result.resultUserfirstName + ' ' + result.resultUserlastName,
      })).filter(creator => {
        if (uniqueHistoryId.includes(creator.id)) {
          return false;
        }
        uniqueHistoryId.push(creator.id);
        return true;
      });
    }),
  );
  historyDangerous$: Observable<DangerousSituationHistory[]> = this.dangerousService.getDangerousHistory();


  roles = ROLES;

  history$: Observable<HistoryResult[]>;

  constructor(
    private historyService: HistoryService,
    private deviceService: DeviceDetectorService,
    private profileService: ProfileService,
    private dangerousService: DangerousService,
  ) {}

  ngOnInit() {
    // Refresh history when opening them.
    // this.historyService.loadHistory();
    this.historyService.getHistoryOrderedByDate().subscribe();
    this.isDesktop = this.deviceService.isDesktop();
    this.searchForm.valueChanges.pipe(
      startWith(null as HistorySearch),
      pairwise(),
    ).subscribe(([prev, changes]: [HistorySearch, HistorySearch]) => {
      if (prev !== null && prev.areaId !== changes.areaId) {
        this.searchForm.patchValue({entityId: null});
      }
    });

    if (this.deviceService.isDesktop()) {
      this.history$ = this.historyService.getHistoryOrderedByDate();
    } else {
      this.history$ = this.historyService.getUserHistoryOrderedByDate();
    }
    this.entityToken = true;
  }

  search(): void {
    this.historyService.setSearch(this.searchForm.value);
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.search();
    this.entityToken = true;
  }
}
