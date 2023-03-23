import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './widgets';
import {
  Carousel,
  Button,
  Form,
  Card,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import userService, { User } from './user-service';
import { BookCard } from './book-components';
import { createHashHistory } from 'history';
import { forgetLogin, getCookieValue, getDarkModeCookies, setLoginCookies } from './getcookie';
import { darkMode, lightMode } from './colors';
import bookService, { Book } from './book-service';

//false as default
export let loggedIn: boolean = false;
export let currentUser: User = {
  user_id: 0,
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  admin: false,
  lists: new Map() as Map<string, Array<string>>,
};

const history = createHashHistory(); // Use history.push(...)

export class UserLogIn extends Component {
  email: string = '';
  password: string = '';
  isDarkModeEnabled = getDarkModeCookies();

  render() {
    return (
      <Card
        style={{
          border: 'none',
          borderRadius: '0px',
          padding: '15px',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100vh',
          backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
        }}
      >
        {/*Card forms in for log in screen */}
        <Card.Title style={{ color: this.isDarkModeEnabled ? darkMode.font : lightMode.font }}>
          Log in
        </Card.Title>
        <Container fluid style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <Row>
            <Form.Control
              value={this.email}
              type="text"
              placeholder="Email"
              onChange={(event) => (this.email = event.currentTarget.value)}
              style={{
                textAlign: 'center',
                marginBottom: '10px',
                color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                backgroundColor: this.isDarkModeEnabled
                  ? darkMode.background
                  : lightMode.background,
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.password}
              type="password"
              placeholder="Password"
              onChange={(event) => (this.password = event.currentTarget.value)}
              // Makes it possible to log in with enter as well as with button
              onKeyUp={(event) => {
                if (event.key == 'Enter') {
                  this.logIn();
                }
              }}
              style={{
                textAlign: 'center',
                marginBottom: '10px',
                backgroundColor: this.isDarkModeEnabled
                  ? darkMode.background
                  : lightMode.background,
                color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
              }}
            ></Form.Control>
          </Row>
        </Container>
        {/*Card for buttons in login screen before user is identified or registered */}
        <Container style={{ width: '15rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <Row>
            <Button
              onClick={() => this.logIn()}
              style={{
                marginBottom: '10px',
              }}
            >
              Log in
            </Button>
          </Row>
          <Row>
            <Button
              className={this.isDarkModeEnabled ? 'dark-mode-button' : 'light-mode-button'}
              onClick={() => this.createUser()}
              style={{
                marginBottom: '10px',
                backgroundColor: 'transparent',
                border: this.isDarkModeEnabled
                  ? ` 1px solid ${darkMode.buttonCard}`
                  : ` 1px solid ${lightMode.buttonCard}`,
                color: this.isDarkModeEnabled ? darkMode.buttonCard : lightMode.buttonCard,
              }}
            >
              No user? Create one here
            </Button>
          </Row>
          <Row>
            <Button
              variant="outline-secondary"
              onClick={() => this.clearInput()}
              style={{
                marginBottom: '10px',
              }}
            >
              Clear input
            </Button>
          </Row>
        </Container>
      </Card>
    );
  }

  logIn() {
    if (this.email.length != 0 && this.password.length != 0) {
      userService
        .logIn(this.email, this.password)
        .then((user) => {
          currentUser = user;
          loggedIn = true;
          setLoginCookies(currentUser);
          Alert.success('Logged in as ' + currentUser.email);
          history.push('/books/user');
          window.location.reload();
        })
        .catch((error) => Alert.danger(error.response.data));
    } else {
      Alert.danger('Please fill in all the fields');
    }
  }

  clearInput() {
    this.email = '';
    this.password = '';
  }

  createUser() {
    history.push('/books/register');
  }
}

export class RegisterUser extends Component {
  user: User = {
    user_id: 0,
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    admin: false,
    lists: new Map() as Map<string, Array<string>>,
  };
  confirm_password: string = '';
  isDarkModeEnabled = getDarkModeCookies();

  render() {
    return (
      <Card
        style={{
          border: 'none',
          padding: '15px',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Card creating forms related to creating new user */}
        <Card.Title>Create user</Card.Title>
        <Container
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '20rem',
          }}
        >
          <Row>
            <Form.Control
              value={this.user.email}
              type="text"
              placeholder="Email"
              onChange={(event) => (this.user.email = event.currentTarget.value)}
              style={{
                marginBottom: '10px',
                textAlign: 'center',
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.user.first_name}
              type="text"
              placeholder="First name"
              onChange={(event) => (this.user.first_name = event.currentTarget.value)}
              style={{
                marginBottom: '10px',
                textAlign: 'center',
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.user.last_name}
              type="text"
              placeholder="Last name"
              onChange={(event) => (this.user.last_name = event.currentTarget.value)}
              style={{
                marginBottom: '10px',
                textAlign: 'center',
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.user.password}
              type="password"
              placeholder="Password"
              onChange={(event) => (this.user.password = event.currentTarget.value)}
              // Makes it possible to log in with enter as well as with button
              onKeyUp={(event) => {
                if (event.key == 'Enter') {
                  this.createUser();
                }
              }}
              style={{
                marginBottom: '10px',
                textAlign: 'center',
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.confirm_password}
              type="password"
              placeholder="Confirm password"
              onChange={(event) => (this.confirm_password = event.currentTarget.value)}
              onKeyUp={(event) => {
                if (event.key == 'Enter') {
                  this.createUser();
                }
              }}
              style={{
                marginBottom: '10px',
                textAlign: 'center',
              }}
            ></Form.Control>
          </Row>
        </Container>
        {/* Buttons for creating user and clearing input */}
        <Container style={{ width: '15rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <Row>
            <Button
              variant="success"
              onClick={() => this.createUser()}
              style={{
                marginBottom: '10px',
              }}
            >
              Create user
            </Button>
          </Row>
          <Row>
            <Button
              variant="outline-secondary"
              onClick={() => this.clearInput()}
              style={{
                marginBottom: '10px',
              }}
            >
              Clear input
            </Button>
          </Row>
        </Container>
      </Card>
    );
  }

  createUser() {
    userService
      .createUser(
        this.user.email,
        this.user.first_name,
        this.user.last_name,
        this.user.password,
        this.confirm_password
      )
      .then((response) => {
        if (response.length > 0) {
        } else {
          loggedIn = true;
          history.push('/books/login');
        }
      })
      .catch((error) => Alert.danger(error.response.data));
  }

  clearInput() {
    this.user = {
      user_id: 0,
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      admin: false,
      lists: new Map(),
    } as User;

    this.confirm_password = '';
  }
}

export class UserDetails extends Component {
  isDarkModeEnabled = getDarkModeCookies();
  listItems: { title: string; books: Book[] }[] = [];
  newList: string = '';
  render() {
    return (
      <div
        style={{
          borderRadius: '0px',
          padding: '15px',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '85vh',
          backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
          color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
          minHeight: '220vh',
          maxHeight: '1000vh',
        }}
      >
        {/* Page for all relevant user info for logged in user */}
        <Card.Title style={{ fontSize: '30px' }}>
          {'User page for ' + getCookieValue('first_name') + ' ' + getCookieValue('last_nam')}
        </Card.Title>
        <Row style={{ fontSize: '17px' }}>
          <Card.Text>Your email-adress: {getCookieValue('email')}</Card.Text>
        </Row>
        <Row style={{ fontSize: '17px' }}>
          <Card.Text>
            You are{' '}
            {getCookieValue('admin') == 'true'
              ? 'registered as an Admin user'
              : 'registered as an ordinary user'}
          </Card.Text>
        </Row>
        <br />
        <br />
        <br />
        <Row style={{ fontSize: '17px' }}></Row>
        <Row>
          <Card.Text style={{ fontWeight: 'bold', fontSize: '25px' }}>Your Lists:</Card.Text>
        </Row>
        <Row
          style={{
            backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
          }}
        >
          {/* @ts-ignore */}
          {this.listItems.map((list, index) => {
            if (list.books.length == 0) {
              return (
                <div key={index}>
                  <h4 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>
                    {list.title}
                  </h4>
                  <p>The list is currently empty</p>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: this.isDarkModeEnabled
                      ? darkMode.background
                      : lightMode.background,
                  }}
                >
                  <h4 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>
                    {list.title}
                  </h4>
                  {/* @ts-ignore */}
                  <Carousel interval={null}>
                    {list.books.map((book, index) => {
                      if (index % 6 === 0) {
                        return (
                          <Carousel.Item key={index} style={{ padding: '1rem' }}>
                            <Row>
                              {list.books.slice(index, index + 6).map((book, index) => (
                                <Col md={2} key={index}>
                                  <BookCard book={book} />
                                </Col>
                              ))}
                            </Row>
                          </Carousel.Item>
                        );
                      }
                      return null;
                    })}
                  </Carousel>
                </div>
              );
            }
          })}
        </Row>
        <div
          style={{
            width: '15rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '10px',
            backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
          }}
        >
          <Card.Title>Create a new List</Card.Title>
          <Form.Control
            value={this.newList}
            onChange={(event) => (this.newList = event.currentTarget.value)}
            // Makes it possible to log in with enter as well as with button
            onKeyUp={(event) => {
              if (event.key == 'Enter') {
                this.addNewList(this.newList);
              }
            }}
            style={{
              marginBottom: '10px',
              textAlign: 'center',
              backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
              color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
            }}
          ></Form.Control>

          <Button
            onClick={() => this.addNewList(this.newList)}
            style={{
              backgroundColor: this.isDarkModeEnabled ? darkMode.buttonCard : lightMode.buttonCard,
              color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
              border: 'none',
            }}
          >
            Add to Lists
          </Button>
        </div>
        <Row
          style={{
            padding: '10vh',
            backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
          }}
        >
          <Button
            variant="outline-danger"
            onClick={() => this.logOut()}
            style={{
              width: '15rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '10px',
              backgroundColor: this.isDarkModeEnabled ? darkMode.buttonMenu : lightMode.buttonMenu,
              color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
              border: 'none',
            }}
          >
            Log out
          </Button>
        </Row>
      </div>
    );
  }

  addNewList(list: string) {
    //retrieve and format current lists
    let lists = getCookieValue('lists');
    lists = JSON.parse(lists);

    if (list == '' || lists.hasOwnProperty(list) == true) {
      return;
    }

    //add to lists
    // @ts-ignore
    lists[list] = [];

    //update cookies
    setLoginCookies({
      user_id: 0,
      email: getCookieValue('email'),
      first_name: getCookieValue('first_name'),
      last_name: getCookieValue('last_name'),
      password: getCookieValue('password'),
      admin: getCookieValue('admin'),
      lists: lists,
    });

    const email = getCookieValue('email');

    //axios call to update lists at firestore
    // @ts-ignore
    userService.updateLists(lists, email);
    this.createLists();
  }

  mounted() {
    let loggedIn = document.cookie.includes('loggedIn=true');
    if (!loggedIn) {
      history.push('/books/login');
    }

    this.createLists();
  }

  async createLists() {
    this.listItems = [];

    //Recieve and store lists
    if (getCookieValue('loggedIn') != 'true') return 0;
    for (let title in JSON.parse(getCookieValue('lists'))) {
      const books = new Array();
      var i = 0;
      //@ts-ignore
      for (let isbn in JSON.parse(getCookieValue('lists'))[title]) {
        //@ts-ignore
        await bookService
          .getBook(JSON.parse(getCookieValue('lists'))[title][isbn].toString())
          .then((book: Book) => {
            const item: Book = {
              id: '',
              title: book.title,
              ISBN: book.ISBN,
              author: book.author,
              releaseYear: book.releaseYear,
              publisher: book.publisher,
              pages: book.pages,
              description: book.description,
              genre: book.genre,
              rating: book.rating,
              imagePath: book.imagePath,
              review: [],
              addedDate: new Date(),
            };

            books.push(item);
          });
      }
      this.listItems.push({ title, books });
    }
  }

  logOut() {
    loggedIn = false;
    history.push('/books/login');
    currentUser = {
      user_id: 0,
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      admin: false,
      lists: new Map() as Map<string, Array<string>>,
    } as User;
    forgetLogin();
    window.location.reload();
  }

  requestAdmin() {}
}
