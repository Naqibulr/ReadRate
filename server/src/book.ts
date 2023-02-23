import { Author } from '../src/author';
export class Book {
  title: string;
  releaseYear: number;
  author: Author;
  genre: string[];
  publisher: string;
  ISBN: string;
  reviewArray: Review[];
  pages: number;
  description: string;
  picture: string;
  id: string;

  constructor(
    id: string,
    title: string,
    releaseYear: number,
    author: Author,
    genre: string[],
    publisher: string,
    ISBN: string,
    reviewArray: Review[],
    pages: number,
    description: string,
    picture: string
  ) {
    this.id = id;
    this.title = title;
    this.releaseYear = releaseYear;
    this.author = author;
    this.genre = genre;
    this.publisher = publisher;
    this.ISBN = ISBN;
    this.reviewArray = reviewArray;
    this.pages = pages;
    this.description = description;
    this.picture = picture;
  }

  toString(): String {
    return 'Book object: ' + this.title;
  }
}
