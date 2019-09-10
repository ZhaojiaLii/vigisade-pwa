import { Component } from '@angular/core';
import { LayoutService } from '../../../../../services/layout.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../../../login/services/login.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MenuOptions } from '../interfaces/menu-options.interface';
import { MenuService } from '../services/menu.service';
import { ActionCorrectiveService } from '../../../../action-corrective/services/action-corrective.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  isMenuOpen$: Observable<boolean> = this.layoutService.isMenuOpen();
  isLogged$: Observable<boolean> = this.loginService.isLogged();
  route$: Observable<string> = this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url),
  );

  menuOptions$: Observable<MenuOptions> = this.menuService.getOptions();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private loginService: LoginService,
    private menuService: MenuService,
    private actionCorrectiveService: ActionCorrectiveService,
  ) {}

  toggleMenu(): void {
    this.layoutService.toggleMenu();
  }

  goBack(): void {
    window.history.back();
  }

  navigateHomepage() {
    this.router.navigate(['/home']);
    this.layoutService.redirectTotHome();
  }

  navigateAtraiter() {
    this.router.navigate(['/atraiter']);
    this.actionCorrectiveService.fromMenu();
  }

  navigateProfile() {
    this.router.navigate(['/profile']);
  }

  navigateTutorial() {
    this.router.navigate(['/tutorial']);
  }

  navigateHistory() {
    this.router.navigate(['/history']);
  }
}
