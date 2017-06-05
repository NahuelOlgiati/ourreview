import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Util } from '../shared/util';
import { MovieResponse, BookResponse, AlbumResponse, Pager } from '../shared/model';
import { MovieService } from '../shared/service/movie.service';
import { BookService } from '../shared/service/book.service';
import { AlbumService } from '../shared/service/album.service';
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

  albumReponse: AlbumResponse;
  albumTotalPages: number;
  albumPager: Pager = <Pager>{};
  albumCurrentPage: number;

  constructor(private movieService: MovieService, private bookService: BookService, private albumService: AlbumService, private route: ActivatedRoute, private snackbar: MdSnackBar) { }

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
      .switchMap((params: Params) => this.albumService.getSearch(params['term'], 1))
      .subscribe(data => {
        if (data.albums.total > 0) {
          this.albumTotalPages = data.albums.total;
          this.setAlbumPage(1);
        } else {
          this.albumReponse = null;
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

  setAlbumPage(page: number) {
    if (page < 1 || page > this.albumPager.totalPages) {
      return;
    }
    this.albumPager = Util.getPager(this.albumTotalPages, page);
    this.albumCurrentPage = this.albumPager.currentPage;
    this.route.params
      .switchMap((params: Params) => this.albumService.getSearch(params['term'], this.albumCurrentPage))
      .subscribe(data => {
        if (data.albums.total > 0) {
          this.albumReponse = data;
        } else {
          this.albumReponse = null;
          this.snackbar.open('No results found', 'hide', { duration: 10000 });
        }
      });
  }
}
