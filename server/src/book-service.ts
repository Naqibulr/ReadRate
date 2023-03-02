import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import * as testData from './test.json';
import { firestore } from './firebase';
import { collection, query, where, doc, setDoc, getDoc, getDocs, addDoc } from 'firebase/firestore';

export type Book = {
  bookId: number;
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
  getAll() {
    return new Promise<String>((resolve, reject) => {
      resolve(testData.test1.toString());
    });
  }

  colRef = collection(firestore, 'books');

  addBook(book: Book) {
    console.log('book-service', book);
    return new Promise<void>(async (resolve, reject) => {
      addDoc(this.colRef, {
        title: book.title,
      });

      resolve();
    });
  }

  /*

  async getBooks() {
    const snapshot = await getDocs(this.colRef);
    const books = snapshot.docs.map((doc) => {
      const bookData = doc.data();
      const book: Book = {
        id: doc.id,
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
      };
      return book;
    });
    return books;
  }

  getBook(ISBN: string) {
    return new Promise<Book>(async (resolve, reject) => {
      const q = query(this.colRef, where('ISBN', '==', ISBN));
      let book;
      const qs = await getDocs(q);
      qs.forEach((doc) => {
        book = doc.data();
        console.log(book);
      });
      if (book) {
        resolve(book as Book);
      } else {
        reject('No book was found');
      }
    });
  }
  async getBooksByGenre(genre: string) {
    const allBooks = await this.getBooks();
    const genreBooks = allBooks.filter((book) => book.genre.includes(genre));
    return genreBooks.map((bookData) => {
      const {
        id,
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
        id,
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
  */
}

const bookService = new BookService();
export default bookService;
