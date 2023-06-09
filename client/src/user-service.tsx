import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type List = {}

export type User = {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  admin: boolean;
  lists: Map<string, Array<string>>;
};

class UserService {
  /**
   * Creates new user
   */
  createUser(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    password2: string,
  ) {
    return axios
      .post('/users/register', {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        password2: password2,
      })
      .then((response) => response.data);
  }

  /**
   * Log in with email and password
   */
  logIn(email: string, password: string) {
    return axios
      .get<User>('/users/login/' + email + '/' + password)
      .then((response) => response.data as User);
  }

  updateLists(updatedLists: JSON, email: string) {
    return axios
      .put('/users/lists', {
        lists: updatedLists,
        email: email
      })
      .then((response) => response.data);
  }
}

const userService = new UserService();
export default userService;
