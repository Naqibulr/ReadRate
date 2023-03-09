const review = require('./review');
const book = require('./book');

import { Book } from '../src/book';
import { Review } from './review';
export class Author {
  name: String;
  country: String;
  books: Book[];
  birthDate: String;
  deathDate: String;
  reviews: Review[];
  description: String;
  constructor(
    name: String,
    country: String,
    books: Book[],
    birthDate: String,
    deathDate: String,
    reviews: Review[],
    description: String
  ) {
    this.name = name;
    this.country = country;
    this.books = books;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.reviews = reviews;
    this.description = description;
  }

  toString(): String {
    return 'Author object: ' + this.name;
  }
}
