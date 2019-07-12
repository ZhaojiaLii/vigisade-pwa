import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-template',
  templateUrl: './security-template.component.html',
})
export class SecurityTemplateComponent implements OnInit {
  @Input() questionLabel;
  @Input() questionHelp;
  @Output() Selection = new EventEmitter<object>();
  @Output() Comment = new EventEmitter<object>();
  @Output() Photo = new EventEmitter<object>();
  isCollapsed = false;
  imgURL: any;
  visitForm: FormGroup;
  formErrors = {
    selection: '',
    comment: '',
    photo: '',
  };
  validationMessage = {
    selection: {
      required: 'Cette question est obligatoire',
    },
    comment: {
      minlength: 'length minimum 1',
      required: 'Cette question est obligatoire',
    },
    photo: {
      required: 'Cette question est obligatoire',
    },
  };
  showError = false;
  constructor() {
    this.buildForm();
  }
  ngOnInit(): void {
    if (this.questionHelp === '') {
      this.questionHelp = 'Pas d\'aide ici';
    }
  }

  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.imgURL = Event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.photoChanged();
    }
  }

  selectionChanged(event: any) {
    this.Selection.emit({label: this.questionLabel, selection: event.target.id});
  }
  commentChanged() {
    this.Comment.emit({label: this.questionLabel, comment: this.visitForm.value.comment});
  }
  photoChanged() {
    this.Photo.emit({label: this.questionLabel, photo: this.visitForm.value.photo});
  }

  buildForm() {
    this.visitForm = new FormGroup({
      selection: new FormControl(
        '',
        [Validators.required],
      ),
      comment: new FormControl(
        '',
        [Validators.required, Validators.minLength(1)],
      ),
      photo: new FormControl(
        '',
        [Validators.required],
      ),
    });
    this.visitForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.visitForm) { return; }
    const form = this.visitForm;
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      // have control && control not been modified && control is invalided
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessage[field];
        for (const key of Object.keys(control.errors)) {
          // combine all error mistakes
          this.formErrors[field] += messages[key] + '\n';
        }
      }
    }
    this.showErrorMessage();
    console.log(this.showError);
  }

  showErrorMessage() {
    this.showError = !(this.formErrors.comment === '' && this.formErrors.photo === '' && this.formErrors.selection === '');
  }

}
