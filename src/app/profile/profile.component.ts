import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
import { UserService } from '../shared/service/user.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  providers: [MdDialog]
})
export class ProfileComponent implements OnInit {

  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: any;
  selectedOption: string;
  error: string;
  dialogRef: MdDialogRef<DialogDeleteUser>;

  constructor(private authService: AuthService, private userService: UserService, private snackbar: MdSnackBar, private router: Router, private dialog: MdDialog) { }

  ngOnInit() {
    this.authService.readUser().subscribe(authData => {
      if (authData) {
        this.displayName = authData.displayName;
        this.email = authData.email;
        this.emailVerified = authData.emailVerified;
        this.photoURL = authData.photoURL;
      }
    });
  }

  confirmDialog() {
    this.dialogRef = this.dialog.open(DialogDeleteUser, {
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (result === 'yes') {
        this.deleteAccount();
      } else {
        console.log('cancel');
      }
    });
  }

  deleteAccount() {
    this.userService.deleteDatafromUser();
    this.authService.deleteUser((error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.snackbar.open('Good bye ! We hope that our site has pleased you.', '', { duration: 5000 });
        this.router.navigate(['/index']);
      }
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.authService.updateUser(formData, (error) => {
        if (error) {
          this.error = error;
          this.snackbar.open(this.error, 'hide', { duration: 10000 });
        } else {
          this.snackbar.open('Success ! Your modifications was been applicated', '', { duration: 5000 });
          this.router.navigate(['/profile']);
        }
      });
    }
  }
}

@Component({
  selector: 'dialog-delete-user',
  template: `
  <h1 md-dialog-title>{{'profile.title-over' | translate}}</h1>
    <button md-raised-button color="primary" (click)="dialogRef.close('yes')">{{'profile.btn-yes' | translate}}</button>
    <button md-raised-button color="primary" md-dialog-close (click)="dialogRef.close('no')">{{'profile.btn-no' | translate}}</button>
 `
})

export class DialogDeleteUser {
  constructor(private dialogRef: MdDialogRef<DialogDeleteUser>) { }

}
