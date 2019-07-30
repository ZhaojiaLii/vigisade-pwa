import { Component } from '@angular/core';
import { LayoutService } from '../../../../../services/layout.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../../../login/services/login.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  isMenuOpen$: Observable<boolean> = this.layoutService.isMenuOpen();
  isTutorialOpen$: Observable<boolean> = this.layoutService.isTutorialOpen();
  isLogged$: Observable<boolean> = this.loginService.isLogged();
  route$: Observable<string> = this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url),
  );

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private loginService: LoginService,
  ) {}

  toggleMenu(): void {
    this.layoutService.toggleMenu();
  }

  toggleTutorial(): void {
    this.layoutService.toggleTutorial();
    this.layoutService.toggleMenu();
  }
}
