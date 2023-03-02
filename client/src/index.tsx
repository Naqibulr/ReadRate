import ReactDOM from 'react-dom';
import * as React from 'react';
import { Alert } from './widgets';
import { HashRouter, Route } from 'react-router-dom';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { BookAdd, BookDetails, BookEdit, BookCard, WriteReviewPage } from './book-components';
import { UserDetails, UserLogIn, RegisterUser } from './user-components';
import { Menu } from './menu';
import bookService, { Book } from './book-service';
import { useEffect, useState } from 'react';

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [topBooks2, setTopBooks2] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getBooksByGenre('Fiction');
      const books = booksData.slice(0, 6);
      setBooks(books);
    };
    fetchBooks();
    console.log(books);
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getBooks();
      const sortedBooks = booksData.sort((a, b) => b.rating - a.rating);
      const books = sortedBooks.slice(0, 6);
      const books2 = sortedBooks.slice(7, 12);

      setTopBooks(books);
      setTopBooks2(books2);
    };
    fetchBooks();
    console.log(books);
  }, []);

  return (
    <Container fluid style={{ margin: 0 }}>
      <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>Highest rated</h3>
      <Carousel interval={null}>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {topBooks.map((book: Book) => (
              <Col xs={2}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {topBooks2.map((book: Book) => (
              <Col xs={2}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {topBooks.map((book: Book) => (
              <Col xs={2}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      </Carousel>
      <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>Fiction</h3>
      <Carousel interval={null}>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {books.map((book: Book) => (
              <Col xs={2}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {books.map((book: Book) => (
              <Col xs={2}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {books.map((book: Book) => (
              <Col xs={2}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Alert />
      <Menu />
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/books" component={} /> */}
      <Route exact path="/books/add" component={BookAdd} />
      <Route exact path="/books/login" component={UserLogIn} />
      <Route exact path="/books/register" component={RegisterUser} />
      <Route exact path="/books/user" component={UserDetails} />
      <Route exact path="/books/:book_id(\d+)" component={BookDetails} />
      <Route exact path="/books/:id(\d+)/edit" component={BookEdit} />
      <Route exact path="/books/:book_id(\d+)/review" component={WriteReviewPage} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
