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

      //add defailt lists
      newUser.lists.set('Favorites', []);
      newUser.lists.set('Have Read', []);
      newUser.lists.set('Want To Read', []);

      // Convert the Map object to a plain object
      const listsObj = Object.fromEntries(newUser.lists);

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
        lists: listsObj,
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

  updateLists(lists: JSON, email: string) {
    return new Promise<void>(async (resolve, reject) => {
      // Create a reference to the users collection
      const usersRef = collection(firestore, 'Users');

      // Create a query against the collection.
      const q = query(usersRef, where('email', '==', email));

      //finding corresponding user given the query
      var user: User;
      var id: string;
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        id = doc.id;

        //@ts-ignore
        user = doc.data();
      });

      // users .document(id).update({
      //   age: 13,
      //   'favorites.color': 'Red',
      // });

      //rejects if user exists
      //@ts-ignore
      if (user) {
        //@ts-ignore
        setDoc(doc(firestore, 'Users', id), {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          admin: false,
          lists: lists,
        });
        resolve();
      } else {
        return reject();
      }
    });
  }
}

const userService = new UserService();
export default userService;
