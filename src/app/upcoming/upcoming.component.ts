import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/service/movie.service';

@Component({
  selector: 'upcoming-component',
  templateUrl: './upcoming.component.html'
})
export class UpcomingComponent implements OnInit {
  movies: any[];
  totalPages: number;
  pager: any = {};
  currentPage: number;

  constructor(private movieService: MovieService) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.movieService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    this.movieService.getUpComing(this.currentPage).subscribe(response => {
      this.movies = response;
    })
  }

  ngOnInit() {
    this.movieService.getUpComing(1).subscribe(response => {
      this.totalPages = response.total_pages;
      this.setPage(1);
    })
  }
}
