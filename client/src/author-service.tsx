import axios from 'axios';
import { firestore } from './firebase';
import firebase from 'firebase/app';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Author = {
  id: string;
  name: string;
  country: string;
  books: string[];
  birthDate: string;
  deathDate: string;
  reviews: string[];
  description: string;
  imagePath: string;
};
class AuthorService {
  /**
   * Get all testdata.
   */
  getAll() {
    return axios.get<String>('/testData').then((response) => response.data);
  }

  async getFilteredAuthors(searchTerm: string) {
    const response = await axios.get<Array<Author>>('/authors/search/' + searchTerm);
    return response.data;
  }

  colRef = collection(firestore, 'authors');

  addAuthor(
    id: string,
    name: string,
    country: string,
    books: string[],
    birthDate: string,
    deathDate: string,
    reviews: string[],
    description: string,
    imagePath: string
  ) {
    addDoc(this.colRef, {
      id: id,
      name: name,
      country: country,
      books: books,
      birthDate: birthDate,
      deathDate: deathDate,
      reviews: reviews,
      description: description,
      imagePath: imagePath,
    });
  }

  async getAuthors() {
    const snapshot = await getDocs(this.colRef);
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
    return authors;
  }

  getAuthor(id: string) {
    return new Promise<Author>(async (resolve, reject) => {
      //const q = query(this.colRef, where('id', '==', id));
      //let author;
      //const qs = await getDocs(q);
      //qs.forEach((doc) => {
      const docRef = doc(firestore, 'authors', id);
      const docSnap = await getDoc(docRef);
      let author = docSnap.data();
      if (docSnap.exists()) {
        resolve(author as Author);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
      //});
    });
  }
}

const authorService = new AuthorService();
export default authorService;
