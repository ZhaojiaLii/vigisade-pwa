import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../services/layout.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../../../login/services/login.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MenuOptions } from '../interfaces/menu-options.interface';
import { MenuService } from '../services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  isDesktop = false;
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
    private deviceService: DeviceDetectorService,
  ) {}

  toggleMenu(): void {
    this.layoutService.toggleMenu();
  }

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    this.isDesktop = this.deviceService.isDesktop();
  }
}
