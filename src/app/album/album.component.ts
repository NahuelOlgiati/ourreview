import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { BookResponse, Album } from '../shared/model';
import { AuthService } from '../shared/security/auth.service';
import { UserService } from '../shared/service/user.service';
import { AlbumService } from '../shared/service/album.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'album-component',
  templateUrl: './album.component.html',
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
export class AlbumComponent implements OnInit {
  album: Album;
  albumVideo: any[];
  //similarAlbums: AlbumResponse;
  error: string;
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  url: any;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private userService: UserService, private albumService: AlbumService, private route: ActivatedRoute, private location: Location, private snackbar: MdSnackBar) { }

  saveBook(album: any, category: string) {
    this.userService.setAlbums(album, category, (error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.snackbar.open('Your album was been save', '', { duration: 5000 });
      }
    });
  }

  seeTrailer(id: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.albumService.getDetails(params['id']))
      .subscribe(response => {
        this.album = response;
      });

    /*
        this.route.params
          .switchMap((params: Params) => this.albumService.getSimilarAlbums(+params['id']))
          .subscribe(response => {
            this.similarAlbums = response;
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
