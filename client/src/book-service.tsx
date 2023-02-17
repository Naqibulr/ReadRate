import axios from 'axios';
import { firestore } from './firebase';
import { collection, query, where, doc, setDoc, getDoc, getDocs, addDoc } from 'firebase/firestore';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Book = {
  title: string;
  ISBN: string;
  author: string;
  releaseYear: number;
  publisher: string;
  pages: number;
  description: string;
  genre: Array<string>;
  imagePath: string;
};
class BookService {
  /**
   * Get all testdata.
   */
  getAll() {
    return axios.get<String>('/testData').then((response) => response.data);
  }

  colRef = collection(firestore, 'books');

  addBook(
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
    addDoc(this.colRef, {
      title: title,
      releaseYear: releaseYear,
      author: author,
      genre: genre,
      publishe: publisher,
      ISBN: ISBN,
      review: [],
      pages: pages,
      description: description,
      imagePath: imagePath,
    });
  }

  getBooks() {
    getDocs(this.colRef).then((snapshot) => {
      console.log(snapshot.docs);
    });
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
}

const bookService = new BookService();
export default bookService;
