import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import * as testData from './test.json';
import { firestore } from './firebase';
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  Query,
} from 'firebase/firestore';

/*export type Book = {
  bookId: string;
  title: string;
  ISBN: string;
  author: string;
  releaseYear: number;
  publisher: string;
  pages: number;
  description: string;
  genre: Array<string>;
  imagePath: string;
};*/
class BookService {
  getAll() {
    return new Promise<String>((resolve, reject) => {
      resolve(testData.test1.toString());
    });
  }

  getFilteredBooks(searchTerm: string) {
    return new Promise<Book[]>(async (resolve, reject) => {
      const snapshot = await getDocs(query(collection(firestore, 'books')));
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
          reviewArray: [],
          rating: bookData.rating,
        };
        return book;
      });
      let bookList: List = new List('All books', books);
      let filteredBooks: Book[] = bookList.search(searchTerm);
      if (filteredBooks) resolve(filteredBooks);
      else reject('No book');
    });
  }

  /*  addBook(
    title: string,
    ISBN: string,
    author: string,
    releaseYear: number,
    publisher: string,
    pages: number,
    description: string,
    genre: Array<string>,
    imagePath: string
  ) {
    return new Promise<Book>(async (resolve, reject) => {
      let newBook: Book = {
        bookId: '0',
        title: title,
        ISBN: ISBN,
        author: author,
        releaseYear: releaseYear,
        publisher: publisher,
        pages: pages,
        description: description,
        genre: genre,
        imagePath: imagePath,
      };
      const count = (await getDoc(doc(firestore, 'Books', 'count'))).data();
      //@ts-ignore
      const newCount = count + 1;

      setDoc(doc(firestore, 'Books', 'count'), {
        count: newCount,
      });

      setDoc(doc(firestore, 'Books', newCount.toString()), {
        title: newBook.title,
        ISBN: newBook.ISBN,
        author: newBook.author,
        releaseYear: newBook.releaseYear,
        publisher: newBook.publisher,
        pages: newBook.pages,
        description: newBook.description,
        genre: newBook.genre,
        imagePath: newBook.imagePath,
      });
      resolve(newBook as Book);
    });
  }*/
}
import { Book } from './book';
import { List } from './list';

const bookService = new BookService();
export default bookService;
