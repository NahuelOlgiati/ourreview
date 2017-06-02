import { Music } from './music';

export interface MusicResponse {
  tracks: {
    href: string;
    items: Music[];
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
  };
}
