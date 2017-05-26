import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/service/movie.service';

@Component({
  selector: 'discover-component',
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements OnInit {
  movies: any[];
  totalPages: number;
  pager: any = {}
  currentPage: number;

  constructor(private movieService: MovieService) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.movieService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    this.movieService.getDiscover(this.currentPage).subscribe(response => {
      this.movies = response;
    });
  }

  ngOnInit() {
    this.movieService.getDiscover(1).subscribe(response => {
      this.totalPages = response.total_pages;
      this.setPage(1);
    });
  }
}
