import axios from 'axios';
import { firestore } from './firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { User } from './user-service';
import { getCookieValue } from './getcookie';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Review = {
  email: string;
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
  review: Array<Review>;
  addedDate: Date;
  imagePath: string;
};

//definer en type review
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
    //lag en ny metode for addreview,
  }

  addBook(book: Book) {
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
  getBookByAuthor(author: string) {
    return axios.get('/books').then((response) => {
      const data = response.data;
      let books: Array<Book> = [];
      if (Array.isArray(data)) {
        const filteredData = data.filter((book) => book.author === author);
        books = filteredData;
      } else {
        throw new Error('Invalid response data: not an array');
      }
      return books;
    });
  }
}
const bookService = new BookService();
export default bookService;
