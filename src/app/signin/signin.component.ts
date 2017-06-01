import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'sign-in-component',
  templateUrl: './signin.component.html',
  styles: [`
    button {
        font-weight: normal !important;
        margin: 10px 0 !important;
    }
    button img {
        margin: 10px;
    }
    @media screen and (max-width: 480px) {
        a {
            display: block;
            margin-bottom: 10px;
        }
    }
  `]
})
export class SignInComponent implements OnInit {

  myForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackbar: MdSnackBar) { }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignin() {
    if (this.myForm.valid) {
      this.authService.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password, (error) => {
        this.signIn(error);
      });
    }
  }

  login(name: string) {
    switch (name) {
      case 'GitHub': this.signInWithGithub(); break;
      case 'Google': this.signInWithGoogle(); break;
      case 'Twitter': this.signInWithTwitter(); break;
      case 'Facebook': this.signInWithFacebook(); break;
    }
  }

  private signInWithGithub(): void {
    this.authService.signInWithGithub((error) => { this.signIn(error); });
  }

  private signInWithGoogle(): void {
    this.authService.signInWithGoogle((error) => { this.signIn(error); });
  }

  private signInWithTwitter(): void {
    this.authService.signInWithTwitter((error) => { this.signIn(error); });
  }

  private signInWithFacebook(): void {
    this.authService.signInWithFacebook((error) => { this.signIn(error); });
  }

  private signIn(error: any) {
    if (error) {
      this.error = error;
      this.snackbar.open(this.error, 'hide', { duration: 10000 });
    } else {
      this.authService.readUser().subscribe(authState => {
        if (authState) {
          this.snackbar.open('Welcome ' + authState.displayName + ' !', '', { duration: 5000 });
          this.postSignIn();
        }
      });
    }
  }

  private postSignIn(): void {
    this.router.navigate(['/index']);
  }

}
