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
import { HistoryService } from '../../history/services/history.service';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  correction$: Observable<Correction[]>;
  countCorrection$: Observable<number>;

  isDesktop = false;
  roles = ROLES;
  status: string;
  entityToken = true;
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
  creators$: Observable<{id: number, name: string}[]> = this.correctionService.getCorrection().pipe(
    map((corrections: Correction[]) => {
      const uniqueCorrectionId = [];
      if (corrections) {
        return corrections.map(correction => ({
          id: correction.user_id,
          name: correction.resultUserfirstName + ' ' + correction.resultUserlastName,
        })).filter(creator => {
          if (uniqueCorrectionId.includes(creator.id)) {
            return false;
          }

          uniqueCorrectionId.push(creator.id);
          return true;
        });
      }
    }),
  );
  constructor(
    private correctionService: ActionCorrectiveService,
    private deviceService: DeviceDetectorService,
    private profileService: ProfileService,
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.status = null;
    this.correctionService.loadCorrection();
    this.entityToken = true;
    this.isDesktop = this.deviceService.isDesktop();
    this.historyService.loadHistory();
    if (this.deviceService.isDesktop()) {
      this.correction$ = this.correctionService.getDesktopCorrectionByDate();
      this.countCorrection$ = this.correctionService.countCorrection();
    } else {
      this.correction$ = this.correctionService.getMobileCorrectionByDate();
      this.countCorrection$ = this.correctionService.countMobileCorrection();
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
