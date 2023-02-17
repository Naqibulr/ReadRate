import ReactDOM from 'react-dom';
import * as React from 'react';
import { Alert, Column } from './widgets';
import { Component } from 'react-simplified';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import { BookAdd, BookList, BookDetails, BookEdit, BookCard } from './book-components';
import { UserDetails, UserLogIn, RegisterUser } from './user-components';
import { Menu } from './menu';

class Home extends Component {
  mounted() {}
  render() {
    return (
      <Container>
        <Row className="my-3 p-3">
          <BookCard
            title="Hestelivet"
            description="Hester liker gulerot, cavalos gostam de cenouras"
            imageSrc="https://images.pexels.com/photos/9187302/pexels-photo-9187302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/100px100"
          />
          <BookCard
            title="Hestelivet"
            description="Hester liker gulerot, cavalos gostam de cenouras"
            imageSrc="https://images.pexels.com/photos/9187302/pexels-photo-9187302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/100px100"
          />
          <BookCard
            title="Hestelivet"
            description="Hester liker gulerot, cavalos gostam de cenouras"
            imageSrc="https://images.pexels.com/photos/9187302/pexels-photo-9187302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/100px100"
          />
        </Row>
        <Row className="my-3 p-3"></Row>
        <Row className="my-3 p-3"></Row>
        <Row className="my-3 p-3"></Row>
      </Container>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Alert />
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/books" component={BookList} />
      <Route exact path="/books/add" component={BookAdd} />
      <Route exact path="/books/login" component={UserLogIn} />
      <Route exact path="/books/register" component={RegisterUser} />
      <Route exact path="/books/user" component={UserDetails} />
      <Route exact path="/books/:book_id(\d+)" component={BookDetails} />
      <Route exact path="/books/:id(\d+)/edit" component={BookEdit} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
