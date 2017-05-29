import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/security/auth.service';
import { MovieService } from './shared/service/movie.service';

@Component({
  selector: 'our-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MovieService, AuthService, MdSnackBar, TranslateService]
})
export class AppComponent implements OnInit {
  movieSearching: any[];
  isConnected = false;
  color = 'primary';
  language = 'en';

  constructor(
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService,
    private snackbar: MdSnackBar,
    private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);

    return this.authService.authenticated$
      .take(1)
      .do(authenticated => {
        console.log('connected:', authenticated)
        if (!authenticated) {
          return this.isConnected = false;
        } else {
          return this.isConnected = false;
        }
      });
  }

  changeLanguage(value) {
    if (value) {
      this.translate.use('en');
    } else {
      this.translate.use('fr');
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
