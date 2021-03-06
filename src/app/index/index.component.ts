import { Component, OnInit } from '@angular/core';
import { Util } from '../shared/util';
import { MovieResponse, Pager } from '../shared/model';
import { MovieService } from '../shared/service/movie.service';

@Component({
  selector: 'index-component',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  movies: MovieResponse;
  totalPages: number;
  pager: Pager = <Pager>{};
  currentPage: number;

  constructor(private movieService: MovieService) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = Util.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    this.movieService.getNowPlaying(this.currentPage).subscribe(response => {
      this.movies = response;
    });
  }

  ngOnInit() {
    this.movieService.getNowPlaying(1).subscribe(response => {
      this.totalPages = response.total_pages;
      this.setPage(1);
    })
  }
}
