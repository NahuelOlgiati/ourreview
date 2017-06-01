import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { BookResponse, Book } from '../shared/model';
import { AuthService } from '../shared/security/auth.service';
import { UserService } from '../shared/service/user.service';
import { BookService } from '../shared/service/book.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'book-component',
  templateUrl: './book.component.html',
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
export class BookComponent implements OnInit {
  book: Book;
  bookVideo: any[];
  //similarBooks: BookResponse;
  error: string;
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  url: any;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private userService: UserService, private bookService: BookService, private route: ActivatedRoute, private location: Location, private snackbar: MdSnackBar) { }

  saveBook(book: any, category: string) {
    this.userService.setBooks(book, category, (error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.snackbar.open('Your book was been save', '', { duration: 5000 });
      }
    });
  }

  seeTrailer(id: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.bookService.getDetails(params['id']))
      .subscribe(response => {
        this.book = response;
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
