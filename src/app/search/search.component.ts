import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Util } from '../shared/util';
import { MovieResponse, BookResponse, MusicResponse, Pager } from '../shared/model';
import { MovieService } from '../shared/service/movie.service';
import { BookService } from '../shared/service/book.service';
import { MusicService } from '../shared/service/music.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  movieReponse: MovieResponse;
  movieTotalPages: number;
  moviePager: Pager = <Pager>{};
  movieCurrentPage: number;

  bookReponse: BookResponse;
  bookTotalPages: number;
  bookPager: Pager = <Pager>{};
  bookCurrentPage: number;

  musicReponse: MusicResponse;
  musicTotalPages: number;
  musicPager: Pager = <Pager>{};
  musicCurrentPage: number;

  constructor(private movieService: MovieService, private bookService: BookService, private musicService: MusicService, private route: ActivatedRoute, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.movieService.getSearch(params['term'], 1))
      .subscribe(data => {
        if (data.total_results > 0) {
          this.movieTotalPages = data.total_pages;
          this.setMoviePage(1);
        } else {
          this.movieReponse = null;
        }
      });

    this.route.params
      .switchMap((params: Params) => this.bookService.getSearch(params['term'], 1))
      .subscribe(data => {
        if (data.totalItems > 0) {
          this.bookTotalPages = data.totalItems;
          this.setBookPage(1);
        } else {
          this.bookReponse = null;
        }
      });

    this.route.params
      .switchMap((params: Params) => this.musicService.getSearch(params['term'], 1))
      .subscribe(data => {
        if (data.tracks.total > 0) {
          this.musicTotalPages = data.tracks.total;
          this.setMusicPage(1);
        } else {
          this.musicReponse = null;
        }
      });
  }

  setMoviePage(page: number) {
    if (page < 1 || page > this.moviePager.totalPages) {
      return;
    }
    this.moviePager = Util.getPager(this.movieTotalPages, page);
    this.movieCurrentPage = this.moviePager.currentPage;
    this.route.params
      .switchMap((params: Params) => this.movieService.getSearch(params['term'], this.movieCurrentPage))
      .subscribe(data => {
        if (data.total_results > 0) {
          this.movieReponse = data;
        } else {
          this.movieReponse = null;
          this.snackbar.open('No results found', 'hide', { duration: 10000 });
        }
      });
  }

  setBookPage(page: number) {
    if (page < 1 || page > this.bookPager.totalPages) {
      return;
    }
    this.bookPager = Util.getPager(this.bookTotalPages, page);
    this.bookCurrentPage = this.bookPager.currentPage;
    this.route.params
      .switchMap((params: Params) => this.bookService.getSearch(params['term'], this.bookCurrentPage))
      .subscribe(data => {
        if (data.totalItems > 0) {
          this.bookReponse = data;
        } else {
          this.bookReponse = null;
          this.snackbar.open('No results found', 'hide', { duration: 10000 });
        }
      });
  }

  setMusicPage(page: number) {
    if (page < 1 || page > this.musicPager.totalPages) {
      return;
    }
    this.musicPager = Util.getPager(this.musicTotalPages, page);
    this.musicCurrentPage = this.musicPager.currentPage;
    this.route.params
      .switchMap((params: Params) => this.musicService.getSearch(params['term'], this.musicCurrentPage))
      .subscribe(data => {
        if (data.tracks.total > 0) {
          this.musicReponse = data;
        } else {
          this.musicReponse = null;
          this.snackbar.open('No results found', 'hide', { duration: 10000 });
        }
      });
  }
}
