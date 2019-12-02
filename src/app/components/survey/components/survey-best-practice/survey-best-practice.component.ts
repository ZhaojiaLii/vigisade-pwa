import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Survey } from '../../interfaces/getSurveys/survey.interface';
import { ImageCheckEncodeService } from '../../../../services/image-check-encode.service';

@Component({
  selector: 'app-survey-best-practice',
  templateUrl: './survey-best-practice.component.html',
})
export class SurveyBestPracticeComponent implements OnInit {

  @Input() group: FormGroup;

  @Input() survey: Survey;

  showError = false;
  isCollapsed = true;
  imageLoading = false;
  hide = true;

  constructor(
    private imageCompressService: ImageCheckEncodeService,
  ) {}

  encode(event: any) {
    this.imageLoading = this.imageCompressService.encode(event, this.group);
  }

  imageLoaded() {
    this.imageLoading = false;
  }

  updateValidators(required: boolean): void {
    if (required) {
      this.hide = true;
      this.group.get('type').setValidators([Validators.required]);
      this.group.get('comment').setValidators([Validators.required, Validators.minLength(1)]);
      this.group.get('type').updateValueAndValidity();
      this.group.get('comment').updateValueAndValidity();
      this.group.get('photo').updateValueAndValidity();
    } else {
      this.hide = false;
      this.group.get('type').clearValidators();
      this.group.get('comment').clearValidators();
      this.group.get('type').updateValueAndValidity();
      this.group.get('comment').updateValueAndValidity();
      this.group.get('photo').updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    // hide the block of input if 2 selected
    this.hide = this.group.value.selection !== '2';
  }
}
