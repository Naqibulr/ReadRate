import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import { firestore } from './firebase';
import { collection, query, where, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

export type User = {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  lists: Map<string, Array<string>>;
};

class UserService {
  /**
   * Create new user
   */
  createUser(email: string, first_name: string, last_name: string, password: string) {
    return new Promise<User>(async (resolve, reject) => {
      var newUser: User = {
        user_id: 0,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        lists: new Map(),
      };

      //get count of users
      const count = (await getDoc(doc(firestore, 'Users', 'count'))).data();

      //@ts-ignore
      const newCount = count.count + 1;

      //set new count
      setDoc(doc(firestore, 'Users', 'count'), {
        count: newCount,
      });

      // Add a new document in collection "Users"
      setDoc(doc(firestore, 'Users', newCount.toString()), {
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: newUser.password,
        admin: false,
        lists: {
          list1: [],
          list2: [],
        },
      });

      resolve(newUser as User);
    });
  }

  /**
   * Get user with given email
   */
  getUser(email: string) {
    return new Promise<User>(async (resolve, reject) => {
      // Create a reference to the users collection
      const usersRef = collection(firestore, 'Users');

      // Create a query against the collection.
      const q = query(usersRef, where('email', '==', email));

      //finding corresponding user given the query
      var user;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });

      if (user) {
        resolve(user as User);
      } else {
        reject('No user with this email');
      }
    });
  }

  /**
   * Check if the user exist
   */
  userExistsCheck(email: string) {
    return new Promise<void>(async (resolve, reject) => {
      // Create a reference to the users collection
      const usersRef = collection(firestore, 'Users');

      // Create a query against the collection.
      const q = query(usersRef, where('email', '==', email));

      //finding corresponding user given the query
      var user;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });

      //rejects if user exists
      if (user) {
        return reject();
      } else {
        resolve();
      }
    });
  }
}

const userService = new UserService();
export default userService;
