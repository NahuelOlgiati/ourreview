import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BookResponse, Book } from '../model';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  constructor(private http: Http) { }

  getSearch(title: string, page: number): Observable<BookResponse> {
    return this.http.get(environment.googleBooks.url + '?q=' + title + '&maxResults=' + environment.googleBooks.maxResults + '&startIndex=' + page * environment.googleBooks.maxResults)
      .map((res: Response) => res.json());
  }

  getDetails(id: string): Observable<Book> {
    return this.http.get(environment.googleBooks.url + '/' + id)
      .map((res: Response) => res.json());
  }
}
