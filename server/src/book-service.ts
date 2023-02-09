import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import * as testData from './test.json';

class BookService {
  getAll() {
    return new Promise<String>((resolve, reject) => {
      resolve(testData.test1.toString());
    });
  }
}

const bookService = new BookService();
export default bookService;
