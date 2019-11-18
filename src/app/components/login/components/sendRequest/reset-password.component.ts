import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {

  resetForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  resetClicked = false;
  // check if mail has been sent
  mailSent$: Observable<string> = this.loginService.mailSent();
  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) { }

  reset(username: string): void {
    // check email
    const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (username.match(pattern)) {
      this.loginService.askUpdatePassword(username);
      this.resetClicked = true;
    } else {
      this.toastrService.error(this.translateService.instant('Login.wrong email'));
    }
  }

}
