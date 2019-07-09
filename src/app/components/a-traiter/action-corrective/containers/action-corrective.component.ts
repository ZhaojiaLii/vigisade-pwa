import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-action-corrective',
  templateUrl: './action-corrective.component.html',
})
export class ActionCorrectiveComponent implements OnInit {
  imgURL: any;
  selectedId: number;
  fakeData: CreateCorrection = {
    id: 0,
    user_id: 0,
    survey_id: 0,
    category_id: 0,
    question_id: 0,
    dateControl: '2019',
    place: 'Paris',
    status: 'finish',
  };
  correction = new FormGroup({
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  constructor(
    private actionCorrectionService: ActionCorrectiveService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('id');
    });
  }

  clickBack() {
    history.go(-1);
  }

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

  validForm() {
    if (this.correction.value.comment === '' || this.correction.value.photo === '') {
      this.toastrService.error('champs vide');
    } else {
      this.actionCorrectionService.createCorrection(this.fakeData);
      this.toastrService.success('maj succèss');
      this.router.navigate(['/atraiter']);
      window.scroll(0, 0);
    }
    console.log(this.correction.value);
  }

}
