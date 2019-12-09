import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { getDataUrlFromFile, isImageFile } from '../data/image.helpers';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ImageEncoderService {

  private MAX_SIZE = 0.07;

  constructor(
    private toastService: ToastrService,
    private translateService: TranslateService,
  ) {}

  /**
   * Converts the given form data into a base64 image.
   *
   * This function is poorly designed and can't be reused:
   *  - it should returns an observable of the encoded value.
   *  - it should not display a message.
   *
   * @return true if an image is loading.
   */
  encode(fileInput: any, formGroup: FormGroup): boolean {
    if (!fileInput.target.files || !fileInput.target.files[0]) {
      return false;
    }

    if (isImageFile(fileInput)) {
      getDataUrlFromFile(fileInput, {maxSizeMB: this.MAX_SIZE}).subscribe(dataUrl => {
        formGroup.patchValue({photo: dataUrl});
      });
      return true;
    } else {
      this.toastService.error(this.translateService.instant('Visite.ImageInputError'));
      return false;
    }
  }
}
