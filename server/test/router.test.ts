import axios from 'axios';
import app from '../src/app';
import userService, { User } from '../src/user-service';
import { salt } from '../src/API-router';
import bcrypt from 'bcryptjs';

const testUser: User = {
  user_id: 1,
  email: 'abc@',
  first_name: 'Test',
  last_name: 'Testerson',
  password: '123',
};

// Since API is not compatible with v1, API version is increased to v2
axios.defaults.baseURL = 'http://localhost:3001/api/v2';

jest.mock('../src/user-service');

let webServer: any;
beforeAll((done) => {
  bcrypt.hash(testUser.password, salt, (error, hash) => {
    if (error) throw error;
    testUser.password = hash;
  });
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

// Stop web server
afterAll(() => webServer.close());

////////////USER
// describe('User register (POST)', () => {
//   test('Create new user (200 OK)', (done) => {
//     axios
//       .post('/users/register', {
//         email: 'newuser@mail',
//         first_name: 'Test',
//         last_name: 'Testerson',
//         password: '123abc',
//         password2: '123abc',
//       })
//       .then((response) => {
//         expect(response.status).toEqual(200);
//         //Cannot test if the response data is equal to the hash, because it is different every time
//         done();
//       });
//   });

//   test('Create new user with existing email (400 bad request)', (done) => {
//     axios
//       .post('/users/register', {
//         email: 'test@mail',
//         first_name: 'Test',
//         last_name: 'Testerson',
//         password: '123abc',
//         password2: '123abc',
//       })
//       .catch((error) => {
//         expect(error.message).toEqual('Request failed with status code 400');
//         done();
//       });
//   });

//   test('Create new user with passwords not matching (400 bad request)', (done) => {
//     axios
//       .post('/users/register', {
//         email: 'new@mail',
//         first_name: 'New',
//         last_name: 'New',
//         password: '123abc',
//         password2: 'Notmatchingpassword',
//       })
//       .catch((error) => {
//         expect(error.message).toEqual('Request failed with status code 400');
//         done();
//       });
//   });

//   test('Create new user with missing input (400 bad request)', (done) => {
//     axios
//       .post('/users/register', {
//         email: '',
//         first_name: '',
//         last_name: '',
//         password: '',
//         password2: '',
//       })
//       .catch((error) => {
//         expect(error.message).toEqual('Request failed with status code 400');
//         done();
//       });
//   });

//   test('Create new user with unvalid email (400 bad request)', (done) => {
//     axios
//       .post('/users/register', {
//         email: 'mail',
//         first_name: 'Test',
//         last_name: 'Testerson',
//         password: '123',
//         password2: '123',
//       })
//       .catch((error) => {
//         expect(error.message).toEqual('Request failed with status code 400');
//         done();
//       });
//   });
// });

describe('User log in (GET)', () => {
  test('Log in (200 OK)', (done) => {
    axios.get('/users/login/abc@/123').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  // test('Wrong password (400 bad request)', (done) => {
  //   axios.get('/users/login/test@mail/fakePassword').catch((error) => {
  //     expect(error.message).toEqual('Request failed with status code 400');
  //     done();
  //   });
  // });

  // test('No password (404 Not Found)', (done) => {
  //   axios.get('/users/login/test@mail/').catch((error) => {
  //     expect(error.message).toEqual('Request failed with status code 404');
  //     done();
  //   });
  // });

  // test('No user with given email (500 Internal Server Error)', (done) => {
  //   axios.get('/users/login/wrong@mail/password').catch((error) => {
  //     expect(error.message).toEqual('Request failed with status code 500');
  //     done();
  //   });
  // });
});
