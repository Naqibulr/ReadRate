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
  pages: number;
  description: string;
  genre: Array<string>;
  imagePath: string;
};

export type Review = {
  email: string;
  ISBN: string;
  rating: number;
  text: string;
};

class BookService {
  getAll() {
    return new Promise<String>((resolve, reject) => {
      resolve(testData.test1.toString());
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
    return new Promise<Book>(async (resolve, reject) => {
      let newBook: Book = {
        bookId: 0,
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
  }
}

const bookService = new BookService();
export default bookService;
