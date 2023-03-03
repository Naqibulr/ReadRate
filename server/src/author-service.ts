import { firestore } from './firebase';
import { Author } from '../src/author';
import { List } from '../src/list';
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
class AuthorService {
  getFilteredAuthors(searchTerm: string) {
    return new Promise<Author[]>(async (resolve, reject) => {
      const snapshot = await getDocs(query(collection(firestore, 'authors')));
      const authors = snapshot.docs.map((doc) => {
        const authorData = doc.data();
        const author: Author = {
          id: doc.id,
          name: authorData.name,
          country: authorData.country,
          books: authorData.books,
          birthDate: authorData.birthDate,
          deathDate: authorData.deathDate,
          reviews: authorData.reviews,
          description: authorData.description,
          imagePath: authorData.imagePath,
        };
        return author;
      });
      let authorList: List = new List('All authors', authors);
      let filteredAuthors: Author[] = authorList.search(searchTerm);
      if (filteredAuthors) resolve(filteredAuthors);
      else reject('No author');
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

const authorService = new AuthorService();
export default authorService;
