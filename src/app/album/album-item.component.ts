import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Album } from '../shared/model';

@Component({
  selector: 'album-item-component',
  templateUrl: './album-item.component.html',
  styles: [`
    img {
      width: 100%;
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumItemComponent {

  @Input() album: Album;

  constructor() { }
}
