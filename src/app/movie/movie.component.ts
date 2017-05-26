import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
import { UserService } from '../shared/service/user.service';
import { MovieService } from '../shared/service/movie.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'movie-component',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  movie: any[];
  movieVideo: any[];
  similarMovies: any[];
  error: string;
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  url: any;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private userService: UserService, private movieService: MovieService, private route: ActivatedRoute, private location: Location, private snackbar: MdSnackBar) { }

  saveMovie(movie: any, category: string) {
    this.userService.setMovies(movie, category, (error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.snackbar.open('Your movie was been save', '', { duration: 5000 });
      }
    })
  }

  seeTrailer(id: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.movieService.getDetails(+params['id']))
      .subscribe(response => {
        this.movie = response;
      });

    this.route.params
      .switchMap((params: Params) => this.movieService.getVideo(+params['id']))
      .subscribe(response => {
        this.movieVideo = response;
      });

    this.route.params
      .switchMap((params: Params) => this.movieService.getSimilarMovies(+params['id']))
      .subscribe(response => {
        this.similarMovies = response;
      })

    return this.authService.authenticated$.subscribe(
      authenticated => {
        if (authenticated === true) {
          return this.isConnected = true;
        } else {
          return this.isConnected = false;
        }
      })
  }
}
