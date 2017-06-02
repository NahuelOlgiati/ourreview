import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Music } from '../shared/model';

@Component({
  selector: 'music-item-component',
  templateUrl: './music-item.component.html',
  styles: [`
    img {
      width: 100%;
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicItemComponent {

  @Input() music: Music;

  constructor() { }
}
