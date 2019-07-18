import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TeamMember } from '../../interfaces/getSurveys/team-member.interface';

@Component({
  selector: 'app-survey-team-member',
  templateUrl: './survey-team-member.component.html',
})

export class SurveyTeamMemberComponent implements OnInit {

  @Input() member: TeamMember;

  @Output() updateMember = new EventEmitter<TeamMember>();

  @Output() removeMember = new EventEmitter<boolean>();

  teamMember = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    role: new FormControl(''),
  });

  deleteMember() {
    this.removeMember.emit(true);
  }

  ngOnInit(): void {
    this.teamMember.valueChanges.subscribe((member) => {
      this.updateMember.emit({...member});
    });
  }
}
