import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/security/auth.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

  myForm: FormGroup;
  error: string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.myForm.valid) {
      this.authService.signUp(this.myForm.value.email, this.myForm.value.password, (error) => {
        if (error) {
          this.error = error;
          this.snackbar.open(this.error, 'hide', { duration: 10000 });
        } else {
          this.authService.readUser().subscribe(authData => {
            if (authData) {
              this.snackbar.open('✓ Welcome ' + authData.displayName, 'Your account was been created', { duration: 5000 });
              this.router.navigate(['/index']);
            }
          });
        }
      });
    }
  }
}
