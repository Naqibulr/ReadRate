import axios from 'axios';
import { firestore } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  arrayRemove,
  updateDoc,
  FieldValue,
  arrayUnion,
} from 'firebase/firestore';
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

  updateReviewsInBook = async (bookISBN: string, review: Review) => {
    try {
      const bookRef = doc(collection(firestore, 'Books'), bookISBN);
      const reviewsQuery = query(collection(firestore, 'Reviews'), where('ISBN', '==', bookISBN));

      const reviewsSnapshot = await getDocs(reviewsQuery);

      // Get the ID of the review document to update
      const reviewID = reviewsSnapshot.docs.find((doc) => doc.data().email === review.email)?.id;

      if (!reviewID) {
        throw new Error('Could not find the review document');
      }

      // Update the review document in Firebase
      await updateDoc(doc(collection(firestore, 'Reviews'), reviewID), {
        rating: review.rating,
        text: review.text,
      });

      // Update the reviews array in the book document
      await updateDoc(bookRef, {
        //@ts-ignore
        reviews: FieldValue.arrayUnion(review),
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateReview = async (review: Review) => {
    try {
      const reviewsRef = collection(firestore, 'Reviews');
      const queryRef = query(
        reviewsRef,
        where('ISBN', '==', review.ISBN),
        where('email', '==', review.email)
      );
      const snapshot = await getDocs(queryRef);
      if (snapshot.empty) {
        throw new Error(`Review with ISBN ${review.ISBN} and email ${review.email} not found`);
      }
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, review);

      console.log(`Review with email ${review.email} and ISBN ${review.ISBN} updated successfully`);
      this.updateReviewsInBook;
    } catch (error) {
      console.log(error);
    }
  };

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

  reviewAlreadyExists(ISBN: string, email: string) {
    try {
      // code that might throw an error
      this.getReviewByIsbnAndEmail(ISBN, email);
      return true;
    } catch (error) {
      // handle the error
      console.log(error);
      return false;
    }
  }

  getReviewByIsbnAndEmail(ISBN: string, email: string) {
    return axios.get('/reviews').then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        const filteredData = data.find((review) => review.ISBN === ISBN && review.email == email);
        if (filteredData) {
          console.log(filteredData);
          return filteredData;
        } else {
          throw new Error(`Book with ISBN ${ISBN} not found`);
        }
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

  revRef = collection(firestore, 'Reviews');
  userRef = collection(firestore, 'Users');
  async deleteReview(email: string, ISBN: string) {
    this.deleteReviewFromBook(email, ISBN);
    const q = query(this.revRef, where('email', '==', email), where('ISBN', '==', ISBN));
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        console.log('Reviews successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting reviews: ', error);
      });
  }

  async deleteReviewFromBook(email: string, ISBN: string) {
    const q2 = query(this.colRef, where('ISBN', '==', ISBN)); // assuming "ISBN" is the name of the field that holds the ISBN value

    // Retrieve the book document with the specified ISBN value
    const querySnapshot = await getDocs(q2);
    if (!querySnapshot.empty) {
      const bookRef = doc(this.colRef, querySnapshot.docs[0].id); // assuming the first document in the query snapshot is the desired book document
      console.log('bookRef', querySnapshot.docs[0].data());
      // Get the reviews array from the book document
      const bookDoc = await getDoc(bookRef);
      if (bookDoc.exists()) {
        const review = bookDoc.data().review;
        console.log('reviews', review);

        // Find the index of the review object with the matching email attribute
        const index = review?.findIndex((review: any) => review.email === email);

        // If a review with the matching email attribute is found, remove it from the reviews array
        if (Array.isArray(review) && review.length > index) {
          const updatedReviews = arrayRemove(bookDoc.data().review[index]);
          await updateDoc(bookRef, { review: updatedReviews });
          console.log('Review deleted successfully.');
        } else {
          console.log('No review found with the given email.');
        }
      } else {
        console.log('No book document found with the given ISBN.');
      }
    } else {
      console.log('No book document found with the given ISBN.');
    }
  }
}
const bookService = new BookService();
export default bookService;
