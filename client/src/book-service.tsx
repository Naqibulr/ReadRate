import axios from 'axios';
import { firestore } from './firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

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
}
const bookService = new BookService();
export default bookService;
