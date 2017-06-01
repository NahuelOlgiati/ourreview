import { Book } from './book';

export interface BookResponse {
  kind: string;
  items: Book[];
  totalItems: number;
}
