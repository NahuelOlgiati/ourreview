import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../shared/service/movie.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  movies: any[];
  totalPages: number;
  pager: any = {}
  currentPage: number;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private location: Location, private snackbar: MdSnackBar) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.movieService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    this.route.params
      .switchMap((params: Params) => this.movieService.getSearch(params['term'], this.currentPage))
      .subscribe(data => {
        if (data.total_results > 0) {
          this.movies = data;
        } else {
          this.movies == null;
          this.snackbar.open('No results found', 'hide', { duration: 10000 });
        }
      })
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.movieService.getSearch(params['term'], 1))
      .subscribe(data => {
        if (data.total_results > 0) {
          this.totalPages = data.total_pages;
          this.setPage(1);
        } else {
          this.movies == null;
        }
      })
  }
}
