import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DangerousService } from '../services/dangerous.service';
import { DangerousSituationType } from '../interfaces/dangerous-situation-type.interface';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { ImageEncoderService } from '../../../services/image-encoder.service';

@Component({
  selector: 'app-dangerous',
  templateUrl: './dangerous-situation.component.html',
})
export class DangerousSituationComponent {

  types$: Observable<DangerousSituationType[]> = this.dataService.getDangerousSituationTypes();

  dangerousSituationGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9_]+/)]),
    photo: new FormControl(''),
  });

  imageLoading = false;

  constructor(
    private dataService: DataService,
    private dangerousService: DangerousService,
    private router: Router,
    private imageEncoder: ImageEncoderService,
  ) {}

  encode(event: any) {
    this.imageLoading = this.imageEncoder.encode(event, this.dangerousSituationGroup);
  }

  stopImageLoading() {
    this.imageLoading = false;
  }

  createDangerous() {
    const formValues = {
      typeSituationDangerousID: Number(this.dangerousSituationGroup.value.type),
      dangerousSituationComment: this.dangerousSituationGroup.value.comment,
      dangerousSituationPhoto: this.dangerousSituationGroup.value.photo,
    };

    if (navigator.onLine) {
      this.dangerousService.createDangerousSituation(formValues);
    } else {
      this.router.navigate(['/home']);
      this.dangerousService.createDangerousSituation(formValues);
    }
  }
}
