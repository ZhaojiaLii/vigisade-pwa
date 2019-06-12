import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  ListContent = [
    {
      contents: 'Conform',
      icons: 'thumb_up_alt',
      id: 0
    },
    {
      contents: 'Sans object / Non nv',
      icons: 'speaker_notes_off',
      id: 1
    },
    {
      contents: 'Non conforme',
      icons: 'thumb_down_alt',
      id: 2
    },
    {
      contents: 'Action corrective',
      icons: 'settings icon',
      id: 3
    },
    {
      contents: 'Situation dangeureuse',
      icons: 'priority_high',
      id: 4
    }
  ];

  constructor(private location: Location) { }

  ngOnInit() {
  }
  backClicked() {
    this.location.back();
  }

}
