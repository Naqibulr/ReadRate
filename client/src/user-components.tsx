import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './widgets';
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap';
import userService, { User } from './user-service';
import { createHashHistory } from 'history';
import { forgetLogin, getCookieValue, getDarkModeCookies, setLoginCookies } from './getcookie';
import { darkMode, lightMode } from './colors';

//false as default
export let loggedIn: boolean = false;
export let currentUser: User = {
  user_id: 0,
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  admin: false,
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
                backgroundColor: this.isDarkModeEnabled
                  ? darkMode.buttonCard
                  : lightMode.buttonCard,
                border: 'none',
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
  user: User = { user_id: 0, email: '', first_name: '', last_name: '', password: '', admin: false };
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
          console.log(response.status);
          console.log(response.data);
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
    };
    this.confirm_password = '';
  }
}

export class UserDetails extends Component {
  isDarkModeEnabled = getDarkModeCookies();
  render() {
    return (
      <>
        <Card
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
          <Card.Title>
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
          <Row style={{ fontSize: '17px' }}>
            <Card.Text style={{ fontWeight: 'bold' }}>Your reviews:</Card.Text>
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
            </Col>
          </Row>
          <Row>
            <Card.Text style={{ fontWeight: 'bold' }}>Your Lists:</Card.Text>
            <Col xs={3}>
              <Card>List 1</Card>
            </Col>
            <Col xs={3}>
              <Card>List 2</Card>
            </Col>
            <Col xs={3}>
              <Card>List 3</Card>
            </Col>
          </Row>
          <Row style={{ padding: '10vh' }}>
            <Button
              variant="outline-danger"
              onClick={() => this.logOut()}
              style={{
                width: '15rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '10px',
                backgroundColor: this.isDarkModeEnabled
                  ? darkMode.buttonMenu
                  : lightMode.buttonMenu,
                color: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
                border: 'none',
              }}
            >
              Log out
            </Button>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    let loggedIn = document.cookie.includes('loggedIn=true');
    if (!loggedIn) {
      history.push('/books/login');
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
    };
    forgetLogin();
    window.location.reload();
  }

  requestAdmin() {}
}
