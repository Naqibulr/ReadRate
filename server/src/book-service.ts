import { firestore } from './firebase';
import { collection, query, getDocs, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { List } from './list';
import userService from './user-service';

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
  db = firestore;
  colRef = collection(firestore, 'books');
  revRef = collection(firestore, 'Reviews');
  userRef = collection(firestore, 'Users');

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
      let searchTermArray: string[] = searchTerm.split('&');
      let filteredBooks: Book[];
      searchTermArray.forEach((element) => {
        bookList = new List('temporary list', bookList.search(element));
      });
      filteredBooks = bookList.objectList;
      if (filteredBooks) resolve(filteredBooks);
      else reject('No book');
    });
  }

  async addReview(review: Review): Promise<void> {
    try {
      await addDoc(this.revRef, {
        email: review.email,
        ISBN: review.ISBN,
        rating: review.rating,
        text: review.text,
      });
      await this.addReviewToBook(review.ISBN, review);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  //Venter på Joakim her

  // async addReviewToUser(userEmail: string, review: Review) {
  //   try {
  //     const userID = (await userService.getUser(userEmail)).user_id;
  //     const uRef = doc(this.userRef, userID);

  //     await updateDoc(uRef, {
  //       review: arrayUnion(review),
  //     });
  //   } catch (error) {}
  // }

  async addReviewToBook(bookISBN: string, review: Review) {
    try {
      const bookID = (await this.getBooksByISBN(bookISBN)).bookId;
      const bookRef = doc(this.colRef, bookID);
      await updateDoc(bookRef, {
        review: arrayUnion(review),
        rating: arrayUnion(review.rating),
      });
    } catch (error) {
      console.error('Error adding review to the book:', error);
    }
  }

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
        bookId: doc.id,
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

  async getBooksByISBN(ISBN: string) {
    return (await this.getBooks()).filter((book) => book.ISBN == ISBN)[0];
  }
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
