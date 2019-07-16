import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DangerousService } from '../services/dangerous.service';
import { formatDate } from '@angular/common';
import { DangerousType } from '../interfaces/dangerous-type.interface';
import { DangerousSituation } from '../interfaces/dangerous-situation.interface';

@Component({
  selector: 'app-dangerous',
  templateUrl: './dangerous.component.html',
})
export class DangerousComponent {

  imgURL: any;
  date = new Date();
  postDangerous = new FormGroup({
    dangerousType: new FormControl(''),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });

  dangerousType$: Observable<DangerousType[]> = this.dangerousService.getDangerousTypes();

  constructor(
    private dangerousService: DangerousService,
  ) {}

  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.imgURL = Event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // this.photoChanged();
    }
  }

  createDangerous() {
    const time = formatDate(this.date, 'dd-MM-yyyy hh:mm:ss a', 'fr-FR');
    const dangerousPayload: DangerousSituation = {
      dangerousSituationTypeId: this.postDangerous.value.dangerousType,
      comment: this.postDangerous.value.comment,
      photo: this.postDangerous.value.photo,
      date: time,
    };

    this.dangerousService.createDangerousSituation(dangerousPayload);
  }


}
