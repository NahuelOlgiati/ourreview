import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { BookResponse, Music } from '../shared/model';
import { AuthService } from '../shared/security/auth.service';
import { UserService } from '../shared/service/user.service';
import { MusicService } from '../shared/service/music.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'music-component',
  templateUrl: './music.component.html',
  styles: [`
    .genre {
      display: inline-block;
      padding-right: 5px;
    }
    img {
        width: 100%;
        margin: 30px 0;
    }
    md-icon {
        vertical-align: bottom;
    }
  `]
})
export class MusicComponent implements OnInit {
  music: Music;
  musicVideo: any[];
  //similarBooks: BookResponse;
  error: string;
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  url: any;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private userService: UserService, private musicService: MusicService, private route: ActivatedRoute, private location: Location, private snackbar: MdSnackBar) { }

  saveBook(music: any, category: string) {
    this.userService.setBooks(music, category, (error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.snackbar.open('Your music was been save', '', { duration: 5000 });
      }
    });
  }

  seeTrailer(id: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.musicService.getDetails(params['id']))
      .subscribe(response => {
        this.music = response;
      });

    /*
        this.route.params
          .switchMap((params: Params) => this.bookService.getSimilarBooks(+params['id']))
          .subscribe(response => {
            this.similarBooks = response;
          })
          */

    return this.authService.authenticated$.subscribe(
      authenticated => {
        if (authenticated === true) {
          return this.isConnected = true;
        } else {
          return this.isConnected = false;
        }
      });
  }
}
