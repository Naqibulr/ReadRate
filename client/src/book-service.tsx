import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

class BookService {

  /**
   * Get all testdata.
   */
  getAll() {
    return axios.get<String>('/testData').then((response) => response.data);
  }
}

const bookService = new BookService();
export default bookService;
