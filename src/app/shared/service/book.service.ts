import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BookResponse, Book } from '../model';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  private url = 'https://www.googleapis.com/books/v1/volumes';
  private maxResults = 20;

  constructor(private http: Http) { }

  getSearch(title: string, page: number): Observable<BookResponse> {
    return this.http.get(this.url + '?q=' + title + '&maxResults=' + this.maxResults + '&startIndex=' + page * this.maxResults)
      .map((res: Response) => res.json());
  }

  getDetails(id: string): Observable<Book> {
    return this.http.get(this.url + '/' + id)
      .map((res: Response) => res.json());
  }
}
