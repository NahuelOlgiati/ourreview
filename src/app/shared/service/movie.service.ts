import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { LanguageService } from './language.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  private language: string;
  private url = 'https://api.themoviedb.org/3/';
  private partner = '431bc17da732dfb3be082e58f7a5cf27';

  constructor(private http: Http, private languageService: LanguageService) {
    this.languageService.languageChanged.subscribe(language => this.language = language);
  }

  getSearch(name: string, page: number) {
    return this.http.get(this.url + 'search/movie?api_key=' + this.partner + '&language=' + this.language + '&query=' + name + '&page=' + page)
      .map((res: Response) => res.json());
  }

  getNowPlaying(page: number) {
    return this.http.get(this.url + 'movie/now_playing?api_key=' + this.partner + '&language=' + this.language + '&page=' + page)
      .map((res: Response) => res.json());
  }


  getDetails(code: number) {
    return this.http.get(this.url + 'movie/' + code + '?api_key=' + this.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getDiscover(page: number) {
    return this.http.get(this.url + 'discover/movie?api_key=' + this.partner + '&language=' + this.language + '&sort_by=popularity.desc&include_video=false&page=' + page)
      .map((res: Response) => res.json());
  }

  getVideo(code: number) {
    return this.http.get(this.url + 'movie/' + code + '/videos?api_key=' + this.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getSimilarMovies(code: number) {
    return this.http.get(this.url + 'movie/' + code + '/similar?api_key=' + this.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getUpComing(page: number) {
    return this.http.get(this.url + 'movie/upcoming?api_key=' + this.partner + '&language=' + this.language + '&page=' + page)
      .map((res: Response) => res.json());
  }

  getPager(totalItems: number, currentPage: number = 1) {
    const totalPages = totalItems;
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = new Array(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }

}
