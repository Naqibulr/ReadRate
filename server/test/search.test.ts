//const s = require('./list');
import { Author } from '../src/author';
import { Book } from '../src/book';
import { List } from '../src/list';

let rowling: Author;
let bookArray: any[];
let book1: Book;
let book2: Book;
let harryPotter: Book;
let twilightArray: Book[];

rowling = new Author('J.K. Rowling', 'England', [], '1996', 'Still alive', [], 'Good author');
book1 = new Book(
  'Twilight1',
  2001,
  rowling,
  ['fantasy'],
  'Gyldendal',
  '298',
  [],
  297,
  'Book about vampires and sometimes wolves',
  'PictureOfBella'
);
book2 = new Book(
  'Twilight2',
  2005,
  rowling,
  ['fantasy'],
  'Gyldendal',
  '700',
  [],
  366,
  'Much the same as twilight1',
  'PictureOfVampire'
);
harryPotter = new Book(
  'Harry Potter',
  2003,
  rowling,
  ['fantasy'],
  'Universitetsforlaget',
  '69',
  [],
  69696,
  'Book about wizards',
  'PictureOfHagrid'
);

bookArray = [book1, book2, harryPotter];
twilightArray = [book1, book2];

test('Search for book Twilight', () => {
  let books = new List('books', bookArray);
  let results = books.search('Twilight');
  expect(results).toStrictEqual(twilightArray);
});

test('Search for book Twilight1', () => {
  let books = new List('books', bookArray);
  let results = books.search('Twilight1');
  expect(results).toStrictEqual(twilightArray);
});

test('Search for book twilight1', () => {
  let books = new List('books', bookArray);
  let results = books.search('twilight1');
  expect(results).toStrictEqual(twilightArray);
});

test('Search for book Harry Potter', () => {
  let books = new List('books', bookArray);
  let results = books.search('Harry Potter');
  expect(results).toStrictEqual([harryPotter]);
});

test('Search for book with author Rowling', () => {
  let books = new List('books', bookArray);
  let results = books.search('rowling');
  expect(results).toEqual(bookArray);
});

// test('Search for book with twílìght', () => {
//   let books = new List('books', bookArray);
//   let results = books.search('twílìght');
//   expect(results).toStrictEqual(twilightArray);
// });
