import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AlbumResponse, Album } from '../model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class AlbumService {

  private requestOptions: RequestOptions;

  constructor(private http: Http) { }

  getSearch(title: string, page: number): Observable<AlbumResponse> {
    return this.getAccessToken().concatMap(accessHeader => {
      return this.http.get(environment.spotify.url + '/search?q=' + title + '&type=album' + '&offset=' + page * environment.spotify.maxResults + '&limit=' + environment.spotify.maxResults, accessHeader)
        .map(res => res.json())
        .publishLast()
        .refCount();
    });
  }

  getDetails(id: string): Observable<Album> {
    return this.getAccessToken().concatMap(accessHeader => {
      return this.http.get(environment.spotify.url + '/albums/' + id, accessHeader)
        .map(res => res.json())
        .publishLast()
        .refCount();
    });
  }

  private getAccessToken(): Observable<RequestOptions> {
    if (this.requestOptions) {
      return Observable.of(this.requestOptions);
    } else {
      const header = new Headers();
      header.append('Authorization', 'Basic  ' + btoa(environment.spotify.client_id + ':' + environment.spotify.client_secret));
      header.append('Content-Type', 'application/x-www-form-urlencoded;');
      const options = new RequestOptions({ headers: header });
      const body = 'grant_type=client_credentials';
      return this.http.post(environment.spotify.authorizationTokenUrl, body, options)
        .map(data => data.json())
        .do(
        token => {
          const accessHeader = new Headers();
          accessHeader.append('Authorization', token.token_type + ' ' + token.access_token);
          this.requestOptions = new RequestOptions({ headers: accessHeader });
          return Observable.of(this.requestOptions);
        },
        error => console.log(error))
        .retryWhen(error => error.delay(5000));
    }
  }

}
