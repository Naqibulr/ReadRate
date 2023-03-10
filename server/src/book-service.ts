import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import * as testData from './test.json';
import { firestore } from './firebase';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { List } from './list';

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
  addedDate: Date;
  imagePath: string;
};

export type Review = {
  email: string;
  ISBN: string;
  rating: number;
  text: string;
};

class BookService {
  colRef = collection(firestore, 'books');

  getFilteredBooks(searchTerm: string) {
    return new Promise<Book[]>(async (resolve, reject) => {
      const snapshot = await getDocs(query(collection(firestore, 'books')));
      const books = snapshot.docs.map((doc) => {
        const bookData = doc.data();
        const book: Book = {
          bookId: doc.id,
          title: bookData.title,
          ISBN: bookData.ISBN,
          author: bookData.author,
          releaseYear: bookData.releaseYear,
          genre: bookData.genre,
          description: bookData.description,
          imagePath: bookData.imagePath,
          publisher: bookData.publisher,
          addedDate: bookData.addedDate,
          pages: bookData.pages,
          review: bookData.review,
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

  async addReview(review: Review): Promise<void> {
    try {
      const revRef = collection(firestore, 'Reviews'); // assuming the Firestore collection is named 'reviews'
      await addDoc(revRef, {
        email: review.email, //getCookieValue("email"), // assuming there's a function called getCookieValue that returns the email value from cookies
        ISBN: review.ISBN,
        rating: review.rating,
        text: review.text,
      });
      //Alert.success('The review has been added');
      console.log('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  }
  addBook(book: Book) {
    console.log('book-service', book);
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
        addedDate: new Date(),
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
        addedDate: new Date(bookData.addedDate.seconds * 1000),
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
        addedDate,
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
        addedDate,
      };
    });
  }
}

const bookService = new BookService();
export default bookService;
