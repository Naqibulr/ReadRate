import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import * as testdata from './test.json';
import { firestore } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export type User = {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

class UserService {
  /**
   * Create new user
   */
  createUser(email: string, first_name: string, last_name: string, password: string) {
    return new Promise<User>((resolve, reject) => {
      var newUser: User = {
        user_id: 0,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
      };

      // Add a new document in collection "cities"

      //@ts-ignore
      setDoc(doc(firestore, 'Users', 'regular'), {
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: newUser.password,
      });

      resolve(newUser as User);
    });
  }

  /**
   * Get user with given email
   */
  getUser(email: string) {
    return new Promise<User>((resolve, reject) => {
      console.log('ball');
      if (testdata.users[1].email == email) {
        var user: User = {
          user_id: 1,
          email: email,
          first_name: 'first_name',
          last_name: 'last_name',
          password: 'password',
        };
        resolve(user);
      }
    });
  }

  /**
   * Check if the user exist
   */
  userExistsCheck(email: string) {
    return new Promise<void>((resolve, reject) => {
      if (email) resolve();
    });
  }
}

const userService = new UserService();
export default userService;
