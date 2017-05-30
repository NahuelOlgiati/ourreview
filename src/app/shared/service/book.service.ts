import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Book } from '../model/book';


@Injectable()
export class BookService {

  private url = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: Http) { }

  getSearch(title: string): Observable<Book[]> {
    return this.http.get(this.url + '?q=' + title)
      .map(res => res.json().items || []);
  }

  get(id: string): Observable<Book> {
    console.log('HOLAAAA');
    console.log(id);
    return this.http.get(this.url + '/' + id)
      .map(res => res.json());
  }
}
