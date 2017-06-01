import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { LanguageService } from './language.service';
import { MovieResponse, Movie } from '../model';
import 'rxjs/add/operator/map';


@Injectable()
export class MovieService {

  private language: string;
  private url = 'https://api.themoviedb.org/3/';
  private partner = '431bc17da732dfb3be082e58f7a5cf27';

  constructor(private http: Http, private languageService: LanguageService) {
    this.languageService.languageChanged.subscribe(language => this.language = language);
  }

  getSearch(name: string, page: number): Observable<MovieResponse> {
    return this.http.get(this.url + 'search/movie?api_key=' + this.partner + '&language=' + this.language + '&query=' + name + '&page=' + page)
      .map((res: Response) => res.json());
  }

  getNowPlaying(page: number): Observable<MovieResponse> {
    return this.http.get(this.url + 'movie/now_playing?api_key=' + this.partner + '&language=' + this.language + '&page=' + page)
      .map((res: Response) => res.json());
  }

  getDetails(code: number): Observable<Movie> {
    return this.http.get(this.url + 'movie/' + code + '?api_key=' + this.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getDiscover(page: number): Observable<MovieResponse> {
    return this.http.get(this.url + 'discover/movie?api_key=' + this.partner + '&language=' + this.language + '&sort_by=popularity.desc&include_video=false&page=' + page)
      .map((res: Response) => res.json());
  }

  getVideo(code: number): Observable<any[]> {
    return this.http.get(this.url + 'movie/' + code + '/videos?api_key=' + this.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getSimilarMovies(code: number): Observable<MovieResponse> {
    return this.http.get(this.url + 'movie/' + code + '/similar?api_key=' + this.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getUpComing(page: number): Observable<MovieResponse> {
    return this.http.get(this.url + 'movie/upcoming?api_key=' + this.partner + '&language=' + this.language + '&page=' + page)
      .map((res: Response) => res.json());
  }
}
