import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { MusicResponse, Music } from '../model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

declare var Buffer: any;

export interface SpotifyConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
  authToken?: string;
  apiBase: string;
}

export interface SpotifyOptions {
  limit?: number;
  offset?: number;
  market?: string;
  album_type?: string;
  country?: string;
  type?: string;
  q?: string;
  timestamp?: string;
  locale?: string;
  public?: boolean;
  name?: string;
  time_range?: string;
  after?: string;
  before?: string;
}

@Injectable()
export class MusicService {

  private client_id = 'b7b972696c034f8e98eb7f5311c95ea1';
  private client_secret = 'c4b68ce29a2447b4a1c964d3bd71074a';

  // Pagination
  //$ curl "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10"

  private url = 'https://api.spotify.com/v1';
  private tokenUrl = 'https://accounts.spotify.com/api/token?grant_type=client_credentials';
  //private tokenUrl = 'https://accounts.spotify.com/authorize';
  private access_token: string = null;

  constructor( @Inject('SpotifyConfig') private config: SpotifyConfig, private http: Http) {
    config.apiBase = this.url;
  }

  getSearch(name: string, page: number): Observable<MusicResponse> {
    return this.http.get(this.url + '/search?q=tania&name=' + 'michael' + '&type=' + 'Album', this.getAccesHeader())
      .map((res: Response) => res.json());
  }

  getDetails(id: string): Observable<Music> {
    return this.http.get(this.url + '/albums/' + id, this.getAccesHeader())
      .map((res: Response) => res.json());
  }

  /*
    https://accounts.spotify.com/authorize
    ?client_id=5fe01282e94241328a84e7c5cc169164
    &redirect_uri=http:%2F%2Fexample.com%2Fcallback
    &scope=user-read-private%20user-read-email
    &response_type=token
    &state=123
    */

  getAccesToken(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'Basic ' + (new Buffer(this.client_id + ':' + this.client_secret).toString('base64')));
    const options = new RequestOptions({ headers: headers });
    const body = null;
    return this.http.post(this.tokenUrl, body, options)
      .map((res: Response) => res.json())
      .map(res => {
        console.log('HOLA');
        console.log(res.access_token);
        this.access_token = res.access_token;
      });
  }

  /*
    getAccesToken(): Observable<any> {
      return this.http.get(this.tokenUrl + '?client_id=' + this.client_id + '&redirect_uri=' + encodeURIComponent('http://localhost:4200/index') + '&response_type=token')
        .map((res: Response) => res.json())
        .map(res => {
          console.log('HOLA');
          console.log(res);
          console.log(res.access_token);
          this.access_token = res.access_token;
        });
    }
    */


  getAccesHeader(): RequestOptions {
    let headers: Headers;
    console.log('HOLA1');
    console.log(this.access_token);

    if (this.access_token == null) {
      this.getAccesToken().subscribe(() => {
        headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.access_token);
        console.log('HOLA2');
        console.log(this.access_token);
        return new RequestOptions({ headers: headers });
      });
    } else {
      console.log('HOLA3');
      console.log(this.access_token);
      headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.access_token);
      return new RequestOptions({ headers: headers });
    }
  }

}
