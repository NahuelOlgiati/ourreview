import { Component } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'sign-in-component',
  templateUrl: './signin.component.html'
})
export class SignInComponent {
  error: string;

  constructor(private router: Router, private authService: AuthService, private snackbar: MdSnackBar) { }

  onSubmit(formData) {
    if (formData.valid) {
      this.authService.signIn(formData.value.email, formData.value.password, (error) => {
        if (error) {
          this.error = error;
          this.snackbar.open(this.error, 'hide', { duration: 10000 });
        } else {
          this.authService.readUser().subscribe(authData => {
            if (authData) {
              this.snackbar.open('Welcome ' + authData.auth.displayName + ' !', '', { duration: 5000 });
              this.router.navigate(['/index']);
            }
          });
        }
      });
    }
  }

  login(name: string) {
    this.authService.signInAccount(name, (error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.authService.readUser.subscribe(authData => {
          if (authData) {
            this.snackbar.open('Welcome ' + authData.auth.displayName + ' !', '', { duration: 5000 });
            this.router.navigate(['/index']);
          }
        });
      }
    });
  }

}
