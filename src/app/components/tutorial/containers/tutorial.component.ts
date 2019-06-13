import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {

  ListContent = [
    {
      contents: 'Conform',
      icons: 'thumb_up_alt',
      id: 0
    },
    {
      contents: 'No object / Not viewed',
      icons: 'speaker_notes_off',
      id: 1
    },
    {
      contents: 'Not conform',
      icons: 'thumb_down_alt',
      id: 2
    },
    {
      contents: 'Action corrective',
      icons: 'settings icon',
      id: 3
    },
    {
      contents: 'Dangerous situation',
      icons: 'priority_high',
      id: 4
    }
  ];

  constructor(private location: Location) { }

  ngOnInit() {
  }
  clickBack() {
    this.location.back();
  }

}
