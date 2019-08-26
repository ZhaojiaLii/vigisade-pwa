import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DangerousService } from '../services/dangerous.service';
import { DangerousSituationType } from '../interfaces/dangerous-situation-type.interface';
import { DataService } from '../../../services/data.service';
import { compress } from '../../../data/image.helpers';

@Component({
  selector: 'app-dangerous',
  templateUrl: './dangerous-situation.component.html',
})
export class DangerousSituationComponent {

  types$: Observable<DangerousSituationType[]> = this.dataService.getDangerousSituationTypes();
  dangerousSituationGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(1)]),
    photo: new FormControl(''),
  });
  loading = false;

  constructor(
    private dataService: DataService,
    private dangerousService: DangerousService,
  ) {}

  updateImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      compress(event, {maxSizeMB: 0.07}).subscribe(dataUrl => {
        this.dangerousSituationGroup.patchValue({photo: dataUrl});
      });
    }
    this.loading = true;
  }

  createDangerous() {
    this.dangerousService.createDangerousSituation({
      typeSituationDangerousID: Number(this.dangerousSituationGroup.value.type),
      dangerousSituationComment: this.dangerousSituationGroup.value.comment,
      dangerousSituationPhoto: this.dangerousSituationGroup.value.photo,
    });
  }

  loadingImage() {
    this.loading = false;
  }

  error() {
    this.loading = false;
  }
}
