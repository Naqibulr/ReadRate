import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import * as testData from './test.json';
import { firestore } from './firebase';
import { collection, query, where, doc, setDoc, getDoc, getDocs, addDoc } from 'firebase/firestore';

export type Book = {
  bookId: string;
  title: string;
  ISBN: string;
  author: string;
  releaseYear: number;
  publisher: string;
  rating: Array<number>;
  review: Array<string>;
  pages: number;
  description: string;
  genre: Array<string>;
  imagePath: string;
};

class BookService {
  /* getBooks() {
    return new Promise<String>((resolve, reject) => {
      resolve(testData.test1.toString());
    });
  } */

  colRef = collection(firestore, 'books');

  addBook(book: Book) {
    return new Promise<void>(async (resolve, reject) => {
      addDoc(this.colRef, {
        id: '',
        title: book.title,
        releaseYear: book.releaseYear,
        author: book.author,
        genre: book.genre,
        publisher: book.publisher,
        ISBN: book.ISBN,
        review: [],
        pages: book.pages,
        rating: [],
        description: book.description,
        imagePath: book.imagePath,
      });

      resolve();
    });
  }
  async getBooks() {
    const snapshot = await getDocs(this.colRef);
    const books = snapshot.docs.map((doc) => {
      const bookData = doc.data();
      const book: Book = {
        bookId: bookData.bookId,
        title: bookData.title,
        ISBN: bookData.ISBN,
        author: bookData.author,
        releaseYear: bookData.releaseYear,
        genre: bookData.genre,
        description: bookData.description,
        imagePath: bookData.imagePath,
        publisher: bookData.publisher,
        pages: bookData.pages,
        rating: bookData.rating,
        review: bookData.review,
      };
      return book;
    });
    return books;
  }
  async getBooksByGenre(genre: string) {
    const allBooks = await this.getBooks();
    const genreBooks = allBooks.filter((book) => book.genre.includes(genre));
    return genreBooks.map((bookData) => {
      const {
        bookId,
        title,
        ISBN,
        author,
        releaseYear,
        genre,
        description,
        imagePath,
        publisher,
        pages,
        rating,
      } = bookData;
      return {
        bookId,
        title,
        ISBN,
        author,
        releaseYear,
        genre,
        description,
        imagePath,
        publisher,
        pages,
        rating,
      };
    });
  }

  // //@ts-ignore
  // getBooksList({ userIds }) {
  //   //@ts-ignore
  //   const refs = userIds.map((id) => this.firestore.doc(`users/${id}`));
  //   //@ts-ignore
  //   this.firestore.getAll(...refs).then((users) => console.log(users.map((doc) => doc.data())));
  // }

  getBook(ISBN: string) {
    return new Promise<Book>(async (resolve, reject) => {
      const q = query(this.colRef, where('ISBN', '==', ISBN));
      let book;
      const qs = await getDocs(q);
      qs.forEach((doc) => {
        book = doc.data();
      });
      if (book) {
        resolve(book as Book);
      } else {
        reject('No book was found');
      }
    });
  }
}

const bookService = new BookService();
export default bookService;
