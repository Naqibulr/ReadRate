import axios from 'axios';
import { firestore } from './firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Book = {
  id: string;
  rating: number;
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

  async getFilteredBooks(searchTerm: string) {
    const response = await axios.get<Array<Book>>('/books/search/' + searchTerm);
    return response.data;
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
      id: '',
      title: title,
      releaseYear: releaseYear,
      author: author,
      genre: genre,
      publisher: publisher,
      ISBN: ISBN,
      review: [],
      pages: pages,
      rating: 0,
      description: description,
      imagePath: imagePath,
    });
  }

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
}

const bookService = new BookService();
export default bookService;
