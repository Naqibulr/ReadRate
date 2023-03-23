import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './widgets';
import { Carousel, Button, Form, Card, Row, Col, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import userService, { User } from './user-service';
import { BookCard } from './book-components';
import { createHashHistory } from 'history';
import { forgetLogin, getCookieValue, setLoginCookies } from './getcookie';
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
  lists: new Map() as Map<string, Array<string>>
}

const history = createHashHistory(); // Use history.push(...)

export class UserLogIn extends Component {
  email: string = '';
  password: string = '';

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
        {/*Card forms in for log in screen */}
        <Card.Title>Log in</Card.Title>
        <Container style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <Row>
            <Form.Control
              value={this.email}
              type="text"
              placeholder="Email"
              onChange={(event) => (this.email = event.currentTarget.value)}
              style={{
                textAlign: 'center',
                marginBottom: '10px',
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
              }}
            ></Form.Control>
          </Row>
        </Container>
        {/*Card for buttons in login screen before user is identified or registered */}
        <Container style={{ width: '15rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <Row>
            <Button
              variant="success"
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
              variant="outline-success"
              onClick={() => this.createUser()}
              style={{
                marginBottom: '10px',
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
  user: User = { user_id: 0, email: '', first_name: '', last_name: '', password: '', admin: false, lists: new Map() as Map<string, Array<string>>, };
  confirm_password: string = '';

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
      lists: new Map()
    } as User;

    this.confirm_password = '';
  }
}

export class UserDetails extends Component {
  listItems: { title: string; books: Book[]; }[] = [];
  newList: string = ""
  render() {
    return (
      <>
        <div
          style={{
            // border: 'none',
            padding: '15px',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '85vh',
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
          <Row style={{ fontSize: '17px' }}>
            {/* <Card.Text style={{ fontWeight: 'bold' }}>Your reviews:</Card.Text>
          </Row>
          <Row>
            <Col xs={3}>
              Book title 1 <br />
              4 / 5
              <Form.Range />
              <Form.Control
                as="textarea"
                rows={12}
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum convallis ornare. Aliquam id iaculis leo. In malesuada mi sed mauris euismod, vitae pretium leo feugiat. Sed at nisl blandit, volutpat arcu at, dignissim enim. Donec vel massa nulla. Maecenas eget sollicitudin nisl. Morbi et ex id elit vehicula fringilla at vel velit. Maecenas at quam odio. Donec id consectetur purus, sit amet lacinia dolor. Vivamus gravida leo ut nisl sollicitudin, ac sagittis lectus consectetur. Nulla iaculis vel lectus ac sodales. Maecenas at sapien pretium, vehicula sapien eget, feugiat ligula. Nulla egestas ligula non tempus commodo. Quisque tristique urna dui, non finibus nisi bibendum non. Mauris pulvinar sed lacus vitae convallis. Sed dictum efficitur nibh eget condimentum."
              ></Form.Control>
            </Col>
            <Col xs={3}>
              Book title 2 <br />
              2 / 5
              <Form.Range />
              <Form.Control
                as="textarea"
                rows={12}
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum convallis ornare. Aliquam id iaculis leo. In malesuada mi sed mauris euismod, vitae pretium leo feugiat. Sed at nisl blandit, volutpat arcu at, dignissim enim. Donec vel massa nulla. Maecenas eget sollicitudin nisl. Morbi et ex id elit vehicula fringilla at vel velit. Maecenas at quam odio. Donec id consectetur purus, sit amet lacinia dolor. Vivamus gravida leo ut nisl sollicitudin, ac sagittis lectus consectetur. Nulla iaculis vel lectus ac sodales. Maecenas at sapien pretium, vehicula sapien eget, feugiat ligula. Nulla egestas ligula non tempus commodo. Quisque tristique urna dui, non finibus nisi bibendum non. Mauris pulvinar sed lacus vitae convallis. Sed dictum efficitur nibh eget condimentum."
              ></Form.Control>
            </Col>
            <Col xs={3}>
              Book title 3 <br />
              3 / 5
              <Form.Range />
              <Form.Control
                as="textarea"
                rows={12}
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum convallis ornare. Aliquam id iaculis leo. In malesuada mi sed mauris euismod, vitae pretium leo feugiat. Sed at nisl blandit, volutpat arcu at, dignissim enim. Donec vel massa nulla. Maecenas eget sollicitudin nisl. Morbi et ex id elit vehicula fringilla at vel velit. Maecenas at quam odio. Donec id consectetur purus, sit amet lacinia dolor. Vivamus gravida leo ut nisl sollicitudin, ac sagittis lectus consectetur. Nulla iaculis vel lectus ac sodales. Maecenas at sapien pretium, vehicula sapien eget, feugiat ligula. Nulla egestas ligula non tempus commodo. Quisque tristique urna dui, non finibus nisi bibendum non. Mauris pulvinar sed lacus vitae convallis. Sed dictum efficitur nibh eget condimentum."
              ></Form.Control>
            </Col>
            <Col xs={3}>
              Book title 4 <br />
              3 / 5
              <Form.Range />
              <Form.Control
                as="textarea"
                rows={12}
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum convallis ornare. Aliquam id iaculis leo. In malesuada mi sed mauris euismod, vitae pretium leo feugiat. Sed at nisl blandit, volutpat arcu at, dignissim enim. Donec vel massa nulla. Maecenas eget sollicitudin nisl. Morbi et ex id elit vehicula fringilla at vel velit. Maecenas at quam odio. Donec id consectetur purus, sit amet lacinia dolor. Vivamus gravida leo ut nisl sollicitudin, ac sagittis lectus consectetur. Nulla iaculis vel lectus ac sodales. Maecenas at sapien pretium, vehicula sapien eget, feugiat ligula. Nulla egestas ligula non tempus commodo. Quisque tristique urna dui, non finibus nisi bibendum non. Mauris pulvinar sed lacus vitae convallis. Sed dictum efficitur nibh eget condimentum."
              ></Form.Control>
            </Col> */}
          </Row>
          <Row>
            <Card.Text style={{ fontWeight: 'bold', fontSize: '25px' }}>Your Lists:</Card.Text>
          </Row>
          <Row>
            {/* @ts-ignore */}
            {this.listItems.map((list, index) => {
              if (list.books.length == 0) {
                return (
                  <div key={index}>
                    <h4 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>{list.title}</h4>
                    <p>The list is currently empty</p>
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <h4 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>{list.title}</h4>
                    {/* @ts-ignore */}
                    <Carousel interval={null}>
                      {list.books.map((book, index) => {
                        if (index % 6 === 0) {
                          return (<Carousel.Item key={index} style={{ padding: '1rem' }}>
                            <Row>
                              {list.books.slice(index, index + 6).map((book, index) => (
                                <Col md={2} key={index} >
                                  <BookCard book={book} />
                                </Col>
                              ))}
                            </Row>
                          </Carousel.Item>)

                        }
                        return null;
                      })}
                    </Carousel>


                  </div>
                )
              }
            })}
          </Row>
          <div style={{
            width: '15rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '10px',
          }}>
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
              }}
            ></Form.Control>

            <Button variant="primary" onClick={() => this.addNewList(this.newList)}>
              Add to Lists
            </Button>
          </div>
          <Row style={{ padding: '10vh' }}>
            <Button
              variant="outline-danger"
              onClick={() => this.logOut()}
              style={{
                width: '15rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '10px',
                backgroundColor: 'rgb(223, 120, 97)',
                color: 'rgb(254, 252, 251)',
              }}
            >
              Log out
            </Button>
          </Row>
        </div>
      </>
    );
  }

  addNewList(list: string) {
    //retrieve and format current lists
    let lists = getCookieValue('lists');
    lists = JSON.parse(lists)

    if (list == "" || lists.hasOwnProperty(list) == true) {
      return
    }

    //add to lists
    // @ts-ignore
    lists[list] = []

    //update cookies
    setLoginCookies(
      {
        "user_id": 0,
        "email": getCookieValue('email'),
        "first_name": getCookieValue('first_name'),
        "last_name": getCookieValue('last_name'),
        "password": getCookieValue('password'),
        "admin": getCookieValue('admin'),
        "lists": lists
      }
    )

    const email = getCookieValue('email');

    console.log("book-components: ")
    console.log(lists)

    //axios call to update lists at firestore 
    // @ts-ignore
    userService.updateLists(lists, email);
    this.createLists()
  }

  mounted() {
    let loggedIn = document.cookie.includes('loggedIn=true');
    if (!loggedIn) {
      history.push('/books/login');
    }

    this.createLists()
  }

  async createLists() {
    this.listItems = []

    //Recieve and store lists
    if (getCookieValue("loggedIn") != 'true')
      return 0;
    for (let title in JSON.parse(getCookieValue("lists"))) {
      const books = new Array
      var i = 0;
      //@ts-ignore
      for (let isbn in JSON.parse(getCookieValue("lists"))[title]) {

        //@ts-ignore
        await bookService.getBook(JSON.parse(getCookieValue("lists"))[title][isbn].toString()).then((book: Book) => {
          console.log(book)
          const item: Book = {
            id: "",
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
            addedDate: new Date()
          };

          books.push(item)

        })

      }
      this.listItems.push({ title, books })
    }

  }

  logOut() {
    loggedIn = false;
    history.push('/');
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

  requestAdmin() { }
}
