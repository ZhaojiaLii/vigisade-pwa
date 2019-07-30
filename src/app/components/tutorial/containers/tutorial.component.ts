import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
})
export class TutorialComponent {
  isMenuOpen$: Observable<boolean> = this.layoutService.isMenuOpen();
  constructor(
    private layoutService: LayoutService,
  ) { }

  toggleMenu(): void {
    this.layoutService.toggleMenu();
  }
}
