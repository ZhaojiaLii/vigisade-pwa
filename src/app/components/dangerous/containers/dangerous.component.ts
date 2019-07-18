import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DangerousService } from '../services/dangerous.service';
import { DangerousType } from '../interfaces/dangerous-type.interface';
import { DangerousSituation } from '../interfaces/dangerous-situation.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangerous',
  templateUrl: './dangerous.component.html',
})
export class DangerousComponent implements OnInit {
  imgURL: any;
  date = new Date();
  postDangerous = new FormGroup({
    dangerousType: new FormControl(''),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  typeSelected: number;
  comment: string;
  photo: string;
  type = [];
  dangerousType$: Observable<DangerousType[]> = this.dangerousService.getDangerousTypes();

  constructor(
    private dangerousService: DangerousService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dangerousType$.subscribe(types => {
      for (const type of types) {
        // @ts-ignore
        for (const typeDetail of type) {
          this.type.push(typeDetail);
        }
      }
    });
    this.onValueChanged();
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

  onValueChanged() {
    this.postDangerous.valueChanges.subscribe(val => {
      this.typeSelected = val.dangerousType;
      this.comment = val.comment;
      this.photo = val.photo;
    });
  }

  createDangerous() {
    const dangerousPayload: DangerousSituation = {
      typeSituationDangerousID: this.typeSelected,
      dangerousSituationComment: this.comment,
      dangerousSituationPhoto: this.photo,
    };
    this.dangerousService.createDangerousSituation(dangerousPayload);
    this.toastrService.success('Succès');
    this.router.navigate(['/home']);
  }
}
