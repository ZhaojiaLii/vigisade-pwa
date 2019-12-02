import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DangerousService } from '../services/dangerous.service';
import { DangerousSituationType } from '../interfaces/dangerous-situation-type.interface';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { ImageCheckEncodeService } from '../../../services/image-check-encode.service';

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
  imageLoading = false;

  constructor(
    private dataService: DataService,
    private dangerousService: DangerousService,
    private router: Router,
    private imageCompressService: ImageCheckEncodeService,
  ) {}

  encode(event: any) {
    this.imageLoading = this.imageCompressService.encode(event, this.dangerousSituationGroup);
  }

  createDangerous() {
    const POST = {
      typeSituationDangerousID: Number(this.dangerousSituationGroup.value.type),
      dangerousSituationComment: this.dangerousSituationGroup.value.comment,
      dangerousSituationPhoto: this.dangerousSituationGroup.value.photo,
    };
    if (navigator.onLine) {
      this.dangerousService.createDangerousSituation(POST);
    } else {
      this.router.navigate(['/home']);
      // save the POST payload into indexedDB and get the payload in Service worker to POST
      // msg = {POSTdata: POST, token: this.cookie.get('vigisade-tkn')};
      // console.log(msg);
      // if (navigator.serviceWorker.controller) {
      //   navigator.serviceWorker.controller.postMessage(msg);
      //   navigator.serviceWorker.ready
      //     .then(registration => {
      //       const syncTag = 'syncDangerousPOST';
      //       registration.sync.register(syncTag);
      //     })
      //     .then(() => {
      //       console.log('Registered background sync for dangerous situation');
      //       this.dangerousService.createDangerousSituation(POST);
      //     })
      //     .catch(err => console.error('Error registering background sync', err));
      // }
      this.dangerousService.createDangerousSituation(POST);
    }
  }

  imageLoaded() {
    this.imageLoading = false;
  }

  error() {
    this.imageLoading = false;
  }
}
