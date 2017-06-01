import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../shared/model';

@Component({
  selector: 'book-item-component',
  templateUrl: './book-item.component.html',
  styles: [`
    img {
      width: 100%;
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookItemComponent {

  @Input() book: Book;

  constructor() { }
}
