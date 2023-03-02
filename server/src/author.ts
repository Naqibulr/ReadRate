const review = require('./review');
const book = require('./book');

import { Book } from '../src/book';
export class Author {
  id: string;
  name: string;
  country: string;
  books: string[];
  birthDate: string;
  deathDate: string;
  reviews: string[];
  description: string;
  constructor(
    id: string,
    name: string,
    country: string,
    books: string[],
    birthDate: string,
    deathDate: string,
    reviews: string[],
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.books = books;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.reviews = reviews;
    this.description = description;
  }

  toString(): string {
    return 'Author object: ' + this.name;
  }
}
