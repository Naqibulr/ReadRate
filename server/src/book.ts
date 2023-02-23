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
  imagePath: string;
  id: string;
  rating: number;

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
    imagePath: string,
    rating: number
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
    this.imagePath = imagePath;
    this.rating = rating;
  }

  toString(): String {
    return 'Book object: ' + this.title;
  }
}
