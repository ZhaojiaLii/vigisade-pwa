import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_PATH } from '../../../../data/image.helpers';
import { Observable } from 'rxjs';
import { DangerousSituationType } from '../../../dangerous/interfaces/dangerous-situation-type.interface';
import { DangerousService } from '../../../dangerous/services/dangerous.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-history-dangerous-item',
  templateUrl: './history-dangerous-item.component.html',
})
export class HistoryDangerousItemComponent implements OnInit {

  @Input() responsible: string;
  @Input() date: string;
  @Input() photo: string;
  @Input() comment: string;
  @Input() dangerousType: number;
  dangerousTypeName: string;
  imagePATH = IMAGE_PATH.dangerous_situation;
  dangerousTypes$: Observable<DangerousSituationType[]> = this.dataService.getDangerousSituationTypes();
  constructor(
    private dangerousService: DangerousService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dangerousTypes$.subscribe(types => {
      if (types) {
        const TYPE = types.find(type => type.typeDangerousSituationsId === this.dangerousType);
        this.dangerousTypeName = TYPE.typeDangerousSituationTranslation.typeDangerousSituationTranslationType;
      }
    });
  }

}
