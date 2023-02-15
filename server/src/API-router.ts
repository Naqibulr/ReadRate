import express, { request, response } from 'express';
import bookService from './book-service';
import bcrypt from 'bcryptjs';
import userService from './user-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();
export const salt = bcrypt.genSaltSync(10); // this is an encryption algorithm for safely storing passwords

////////////Test Data
router.get('/testData', (_request, response) => {
  bookService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//////////////////////USER
// Gets a user if the login is completed
router.get('/users/login/:email/:password', (request, response) => {
  const email = String(request.params.email);
  const password = String(request.params.password);
  if (
    typeof email == 'string' &&
    email.length != 0 &&
    typeof password == 'string' &&
    password.length != 0
  ) {
    userService
      .getUser(email)
      .then((user) => {
        if (bcrypt.compareSync(password, String(user.password))) {
          response.send(user);
        } else {
          response.status(400).send('Incorrect Email and/or Password! ');
        }
      })
      .catch((error) => {
        response.status(500);
      });
  } else {
    response.status(469).send('Please fill all the fields');
  }
});

//Register a new user
router.post('/users/register', (request, response) => {
  const data = request.body;
  //Check required fields
  if (!data.first_name || !data.last_name || !data.email || !data.password || !data.password2) {
    response.status(400).send('Please fill in all the fields');
    return;
  }
  //Check passwords match
  if (data.password != data.password2) {
    response.status(400).send('Passwords does not match, please try again');
    return;
  }

  //Check if email-adress has @
  if (data.email.includes('@')) {
    userService
      //tror vi ikke trenger denne egt, kan nok bruke getUser
      .userExistsCheck(data.email)
      .then(() => {
        bcrypt.hash(data.password, salt, (error, hash) => {
          if (error) throw error;
          data.password = hash;
          userService
            .createUser(data.email, data.first_name, data.last_name, data.password)
            .then((user) => response.status(200).send(user))
            .catch((error) => response.status(500).send(error));
          return;
        });
      })
      .catch(() => response.status(400).send('Email: ' + data.email + ' is already in use'));
    return;
  } else {
    response.status(400).send('Not a valid email address');
    return;
  }
});

export default router;
