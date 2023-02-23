const review = require('./review');
const book = require('./book');

import { Book } from '../src/book';
export class Author {
  name: string;
  country: string;
  books: Book[];
  birthDate: string;
  deathDate: string;
  reviews: Review[];
  description: string;
  constructor(
    name: string,
    country: string,
    books: Book[],
    birthDate: string,
    deathDate: string,
    reviews: Review[],
    description: string
  ) {
    this.name = name;
    this.country = country;
    this.books = books;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.reviews = reviews;
    this.description = description;
  }

  tostring(): string {
    return 'Author object: ' + this.name;
  }
}
