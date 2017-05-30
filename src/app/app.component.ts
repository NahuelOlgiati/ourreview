import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { LanguageService } from './shared/service/language.service';
import { AuthService } from './shared/security/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'our-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  movieSearching: any[];
  isConnected = false;
  constructor(
    private router: Router,
    private snackbar: MdSnackBar,
    private languageService: LanguageService,
    private authService: AuthService,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.languageService.languageChanged.subscribe(language => this.translate.use(language));
    this.changeLanguage(false);
    this.translate.setDefaultLang(this.languageService.getLanguage());

    return this.authService.authenticated$
      .take(1)
      .do(authenticated => {
        if (!authenticated) {
          return this.isConnected = false;
        } else {
          return this.isConnected = false;
        }
      });
  }

  changeLanguage(value) {
    if (value) {
      this.languageService.setLanguage('en');
    } else {
      this.languageService.setLanguage('es');
    }
  }

  searchMovie(term: string) {
    if (term === '') {
      this.router.navigate(['/index']);
    } else {
      this.router.navigate(['/search', term]);
    }
  }

  onSignOut() {
    this.authService.signOut();
    this.snackbar.open('Already Gone ? We Hope to see you again soon', '', { duration: 5000 });
    this.router.navigate(['/index']);
  }

  getCurrentLang() {
    return this.translate.currentLang;
  }
}
