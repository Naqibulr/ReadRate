import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';

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
    });
  }

  /**
   * Get user with given email
   */
  getUser(email: string) {
    return new Promise<User>((resolve, reject) => {
    });
  }

  /**
   * Check if the user exist
   */
  userExistsCheck(email: string) {
    return new Promise<void>((resolve, reject) => {
    });
  }
}

const userService = new UserService();
export default userService;
