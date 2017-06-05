import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../security/auth.service';
import { Movie, Book, Album } from '../../shared/model';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private uid = '';

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService.uid$.subscribe(uid => {
      if (uid) {
        this.uid = uid;
      }
    });
  }

  getMovies(category: string) {
    return this.db.list(category + '/' + this.uid);
  }

  setMovies(movie: Movie, category: string, callback: any) {
    return this.db.list(category + '/' + this.uid).subscribe(data => {
      let exists = false;
      for (const x of data) {
        if (x.id == movie.id) {
          exists = true;
          callback('The movie is already recorded');
          break;
        }
      }
      if (exists == false) {
        return this.db.list(category + '/' + this.uid).push({
          'id': movie.id,
          'original_title': movie.original_title,
          'overview': movie.overview,
          'popularity': movie.popularity,
          'release_date': movie.release_date,
          'poster_path': movie.poster_path
        })
          .then(success => callback())
          .catch(error => callback(error));
      }
    });
  }

  setBooks(book: Book, category: string, callback: any) {
    return this.db.list(category + '/' + this.uid).subscribe(data => {
      let exists = false;
      for (const x of data) {
        if (x.id == book.id) {
          exists = true;
          callback('The movie is already recorded');
          break;
        }
      }
      if (exists == false) {
        return this.db.list(category + '/' + this.uid).push({
          'id': book.id,
          'title': book.volumeInfo.title,
          'subtitle': book.volumeInfo.subtitle,
          'ratingsCount': book.volumeInfo.ratingsCount,
          'publishDate': book.volumeInfo.publishDate,
          'thumbnail': (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : ''
        })
          .then(success => callback())
          .catch(error => callback(error));
      }
    });
  }

  setAlbums(album: Album, category: string, callback: any) {
    return this.db.list(category + '/' + this.uid).subscribe(data => {
      let exists = false;
      for (const x of data) {
        if (x.id == album.id) {
          exists = true;
          callback('The album is already recorded');
          break;
        }
      }
      if (exists == false) {
        return this.db.list(category + '/' + this.uid).push({
          'id': album.id,
          'title': album.name,
          'subtitle': album.artists[0].name /*,
          'ratingsCount': album..ratingsCount,
          'publishDate': album.volumeInfo.publishDate,
          'thumbnail': (album.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : ''*/
        })
          .then(success => callback())
          .catch(error => callback(error));
      }
    });
  }

  deleteMovies(category: string, id: string) {
    const item = this.db.list(category + '/' + this.uid);
    item.remove(id);
  }

  deleteDatafromUser() {
    const item = this.db.list('MovieLater/' + this.uid);
    item.remove();
    const item1 = this.db.list('FavoriteMovie/' + this.uid);
    item1.remove();
  }

}
