import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { LanguageService } from './language.service';
import { MovieResponse, Movie } from '../model';
import 'rxjs/add/operator/map';


@Injectable()
export class MovieService {

  private language: string;

  constructor(private http: Http, private languageService: LanguageService) {
    this.languageService.languageChanged.subscribe(language => this.language = language);
  }

  getSearch(name: string, page: number): Observable<MovieResponse> {
    return this.http.get(environment.theMovieDB.url + 'search/movie?api_key=' + environment.theMovieDB.partner + '&language=' + this.language + '&query=' + name + '&page=' + page)
      .map((res: Response) => res.json());
  }

  getNowPlaying(page: number): Observable<MovieResponse> {
    return this.http.get(environment.theMovieDB.url + 'movie/now_playing?api_key=' + environment.theMovieDB.partner + '&language=' + this.language + '&page=' + page)
      .map((res: Response) => res.json());
  }

  getDetails(code: number): Observable<Movie> {
    return this.http.get(environment.theMovieDB.url + 'movie/' + code + '?api_key=' + environment.theMovieDB.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getDiscover(page: number): Observable<MovieResponse> {
    return this.http.get(environment.theMovieDB.url + 'discover/movie?api_key=' + environment.theMovieDB.partner + '&language=' + this.language + '&sort_by=popularity.desc&include_video=false&page=' + page)
      .map((res: Response) => res.json());
  }

  getVideo(code: number): Observable<any[]> {
    return this.http.get(environment.theMovieDB.url + 'movie/' + code + '/videos?api_key=' + environment.theMovieDB.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getSimilarMovies(code: number): Observable<MovieResponse> {
    return this.http.get(environment.theMovieDB.url + 'movie/' + code + '/similar?api_key=' + environment.theMovieDB.partner + '&language=' + this.language)
      .map((res: Response) => res.json());
  }

  getUpComing(page: number): Observable<MovieResponse> {
    return this.http.get(environment.theMovieDB.url + 'movie/upcoming?api_key=' + environment.theMovieDB.partner + '&language=' + this.language + '&page=' + page)
      .map((res: Response) => res.json());
  }
}
