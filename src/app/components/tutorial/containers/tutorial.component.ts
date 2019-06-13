import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent {

  ListContent = [
    {
      contents: 'Proper',
      iconsUrl: '../../../../assets/icons/tutorial/proper.svg',
      id: 'proper'
    },
    {
      contents: 'No object / Not viewed',
      iconsUrl: '../../../../assets/icons/tutorial/noObject.svg',
      id: 'noObject'
    },
    {
      contents: 'Improper',
      iconsUrl: '../../../../assets/icons/tutorial/improper.svg',
      id: 'improper'
    },
    {
      contents: 'Corrective action',
      iconsUrl: '../../../../assets/icons/tutorial/proper.svg',
      id: 'correctiveAction'
    },
    {
      contents: 'Dangerous Situation',
      iconsUrl: '../../../../assets/icons/tutorial/dangerousSituation.svg',
      id: 'dangerousSituation'
    },
  ];

  constructor(private location: Location) { }

  clickBack() {
    this.location.back();
  }

}
