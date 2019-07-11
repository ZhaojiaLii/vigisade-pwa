import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-member',
  templateUrl: './member.component.html',
})
export class DetailMemberComponent implements OnInit {
  @Input() firstName;
  @Input() lastName;
  @Input() role;
  constructor() { }

  ngOnInit() {
  }

}
