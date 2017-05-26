import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/security/auth.service';
import { UserService } from '../shared/service/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'favorite-component',
  templateUrl: './favorite.component.html'
})
export class FavoriteComponent implements OnInit, OnDestroy {
  error: string;
  isConnected = false;
  movies = [];
  baseUrl = 'https://www.youtube.com/embed/';
  url: any;
  sub: Subscription;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private userService: UserService, private snackbar: MdSnackBar) { }

  seeTrailer(id: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  deleteMovie(key: any) {
    this.userService.deleteMovies('FavoriteMovie', key);
  }

  ngOnInit() {
    this.sub = this.userService.getMovies('FavoriteMovie').subscribe(data => {
      this.movies = data;
    });

    return this.authService.authenticated$.subscribe(
      authenticated => {
        if (authenticated === true) {
          return this.isConnected = true;
        } else {
          return this.isConnected = false;
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
