import { Author } from '../src/author';
export class Book {
  title: String;
  releaseYear: Number;
  author: Author;
  genre: String[];
  publisher: String;
  ISBN: String;
  reviewArray: Review[];
  pages: Number;
  description: String;
  picture: String;

  constructor(
    title: String,
    releaseYear: Number,
    author: Author,
    genre: String[],
    publisher: String,
    ISBN: String,
    reviewArray: Review[],
    pages: Number,
    description: String,
    picture: String
  ) {
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
