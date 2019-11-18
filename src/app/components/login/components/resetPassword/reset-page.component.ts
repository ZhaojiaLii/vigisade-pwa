import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
})
export class ResetPageComponent implements OnInit {
  passwordForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    usernameRepeat: new FormControl('', [Validators.required]),
  });
  token: string;
  disablePasswordFormBtn = true;
  constructor(
    private toast: ToastrService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  reset(username: string, usernameRepeat: string): void {
    // check password
    const pattern = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?()]).*$/;
    if (username && usernameRepeat) {
      if (username.match(pattern)) {
        // send request here
        this.loginService.updatePassword(username, this.token);
      } else {
        this.toast.error(this.translateService.instant('Login.password incorrect'));
      }
    }
  }

  ngOnInit(): void {
    // check password
    this.passwordForm.valueChanges.subscribe(val => {
      this.disablePasswordFormBtn = !((val.username === val.usernameRepeat) && val.username !== '');
    });
    const urlParse = this.router.url.split('/');
    this.token = urlParse[urlParse.length - 1];
    if (this.token !== 'resetPassword') {
      localStorage.setItem('vigisade-reset', this.token);
      this.router.navigate(['/resetPassword']);
    } else {
      this.token = localStorage.getItem('vigisade-reset');
    }
  }

}
