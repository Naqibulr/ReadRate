import { Book } from './book-service';

export function computeAverage(numbers: number[]): number {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  if (numbers.length === 0) {
    return 0;
  }

  const average = sum / numbers.length;

  return Number(average.toFixed(1));
}

export function computeAuthorRating(books: Book[]): number {
  let totalRating: number = 0;
  let numRatings: number = 0;
  books.forEach((book) => {
    book.rating.forEach((rating) => {
      totalRating += rating;
      numRatings++;
    });
  });
  return numRatings > 0 ? totalRating / numRatings : 0;
}
