import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { compress } from '../data/image.helpers';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ImageCheckEncodeService {

  imageLoading = false;

  constructor(
    private toastService: ToastrService,
    private translateService: TranslateService,
  ) { }

  encode(event: any, formGroup: FormGroup): boolean {
    if (event.target.files && event.target.files[0]) {
      const fileType = event.target.files[0].type.split('/')[0];
      if (fileType === 'image') {
        compress(event, {maxSizeMB: 0.07}).subscribe(dataUrl => {
          formGroup.patchValue({photo: dataUrl});
        });
        this.imageLoading = true;
        return this.imageLoading;
      } else {
        this.toastService.error(this.translateService.instant('Visite.ImageInputError'));
        this.imageLoading = false;
        return this.imageLoading;
      }
    }
  }
}
