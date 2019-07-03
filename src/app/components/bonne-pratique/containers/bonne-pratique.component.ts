import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bonne-pratique',
  templateUrl: './bonne-pratique.component.html'
})
export class BonnePratiqueComponent {
  isCollapsed = false;
  bonnePratique = new FormGroup({
    selection: new FormControl(''),
  });
  constructor() {
  }

}
