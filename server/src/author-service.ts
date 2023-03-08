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
}

const authorService = new AuthorService();
export default authorService;
