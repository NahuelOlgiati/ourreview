export interface Music {
  id: string;
  album: {
    album_type: string;
    images: [{
      height: number;
      url: string;
      width: number;
    }];
    name: string;
    type: string;
  };
  artists: [{
    id: string;
    name: string;
    type: string;
    href: string;
  }];
}
