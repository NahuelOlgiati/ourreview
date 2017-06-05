import { Album } from './album';

export interface AlbumResponse {
  albums: {
    href: string;
    items: Album[];
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
  };
}
