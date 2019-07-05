import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-security-template',
  templateUrl: './security-template.component.html',
})
export class SecurityTemplateComponent implements OnChanges {
  @Input() questionLabel;
  @Input() questionHelp;
  @Output() Selection = new EventEmitter<object>();
  @Output() Comment = new EventEmitter<object>();
  @Output() Photo = new EventEmitter<object>();
  isCollapsed = false;
  imgURL: any;
  constructor() {
  }
  visitForm = new FormGroup({
    selection: new FormControl(''),
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
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

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
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
}
