import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-survey-team-member',
  templateUrl: './survey-team-member.component.html',
})

export class SurveyTeamMemberComponent {

  @Input() form: FormGroup;

  @Input() canRemove = false;

  @Output() removeMember = new EventEmitter<string>();

  deleteMember() {
    this.removeMember.emit(this.form.value.id);
  }
}
