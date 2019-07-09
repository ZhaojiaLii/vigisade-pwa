import { Component } from '@angular/core';
import { LayoutService } from '../../../../../services/layout.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../../../login/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  isMenuOpen$: Observable<boolean> = this.layoutService.isMenuOpen();

  isLogged$: Observable<boolean> = this.loginService.isLogged();

  constructor(
    private layoutService: LayoutService,
    private loginService: LoginService,
  ) {}

  toggleMenu(): void {
    this.layoutService.toggleMenu();
  }
}
