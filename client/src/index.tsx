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
      <Container fluid style={{ margin: 0 }}>
        <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>TopListe</h3>
        <Carousel interval={null}>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
        <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>TopListe</h3>
        <Carousel interval={null}>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
        <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>TopListe</h3>
        <Carousel interval={null}>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item style={{ padding: '1rem' }}>
            <Row>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
              <Col xs={2}>
                <BookCard
                  title="Hestelivet"
                  description="Hester liker gulerot, cavalos gostam de cenouras"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
                />
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
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
