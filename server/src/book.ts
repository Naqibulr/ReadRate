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
  rating: number[];

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
    rating: number[]
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
  computeAverage(): number {
    let sum = 0;
    let numbers = this.rating;

    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    if (numbers.length === 0) {
      return 0;
    }

    const average = sum / numbers.length;

    return Number(average.toFixed(1));
  }

  toString(): String {
    return 'Book object: ' + this.title;
  }
}
