import axios from 'axios';
import { firestore } from './firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { User } from './user-service';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Review = {
  email: string; //getcookievalue("email")
  ISBN: string;
  rating: number;
  text: string;
};

export type Book = {
  id: string;
  title: string;
  ISBN: string;
  author: string;
  releaseYear: number;
  publisher: string;
  pages: number;
  description: string;
  genre: Array<string>;
  rating: Array<number>;
  addedDate: Date;
  imagePath: string;
};

class BookService {
  /**
   * Get all testdata.
   */
  getBooks() {
    return axios.get('/books').then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        return data; // return the array if the response data is an array
      } else {
        throw new Error('Invalid response data: not an array');
      }
    });
  }
  async getFilteredBooks(searchTerm: string) {
    const response = await axios.get<Array<Book>>('/books/search/' + searchTerm);
    return response.data;
  }

  colRef = collection(firestore, 'books');

  addReview(review: Review) {
    console.log('book-service', review);
    return axios.post('/reviews', { review }).then((response) => response.data);
  }

  getBooksByGenre(genre: string) {
    return axios.get('/books').then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        const filteredData = data.filter((book) => book.genre.includes(genre));
        return filteredData;
      } else {
        throw new Error('Invalid response data: not an array');
      }
    });
  }

  addBook(book: Book) {
    console.log('book-service', book);
    return axios.post('/books', { book }).then((response) => response.data);
  }

  getBook(ISBN: string) {
    return axios.get('/books').then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        const filteredData = data.find((book) => book.ISBN === ISBN);
        if (filteredData) {
          return filteredData;
        } else {
          throw new Error(`Book with ISBN ${ISBN} not found`);
        }
      } else {
        throw new Error('Invalid response data: not an array');
      }
    });
  }
}
const bookService = new BookService();
export default bookService;
