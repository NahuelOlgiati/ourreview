export interface Album {
  id: string;
  name: string;
  type: string;
  album_type: string;
  artists: [{
    id: string;
    name: string;
    type: string;
    href: string;
  }];
  images: [{
    height: number;
    url: string;
    width: number;
  }];
}
