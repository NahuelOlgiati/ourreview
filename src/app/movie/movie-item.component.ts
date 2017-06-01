import { Component, Input } from '@angular/core';
import { Movie } from '../shared/model/movie';

@Component({
  selector: 'movie-item-component',
  templateUrl: './movie-item.component.html',
  styles: [`
    img {
      width: 100%;
      margin: 0;
    }
  `]
})
export class MovieItemComponent {

  @Input() movie: Movie;

  constructor() { }
}
