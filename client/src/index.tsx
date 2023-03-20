import ReactDOM from 'react-dom';
import * as React from 'react';
import { Alert } from './widgets';
import { HashRouter, Route } from 'react-router-dom';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import {
  BookAdd,
  BookDetails,
  BookEdit,
  BookCard,
  BookList,
  WriteReviewPage,
} from './book-components';
import { AuthorAdd, AuthorDetails, AuthorEdit, AuthorCard } from './author-components';
import { UserDetails, UserLogIn, RegisterUser } from './user-components';
import { Menu } from './menu';
import bookService, { Book } from './book-service';
import { useEffect, useState } from 'react';
import { BookSearch, AuthorSearch } from './search';
import { calculateAverageRating, computeAverage } from './average';

import { getDarkModeCookies } from './getcookie';
import { darkMode, lightMode } from './colors';

function Home() {
  const [fiction, setFiction] = useState<Book[]>([]);
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [mostRecent, setMotRecent] = useState<Book[]>([]);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(getDarkModeCookies());

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getBooksByGenre('Fiction');
      setFiction(booksData);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getBooks();
      const sortedBooks = booksData.sort(
        (a, b) => calculateAverageRating(b.review) - calculateAverageRating(a.review)
      );
      setTopBooks(sortedBooks);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getBooks();
      const sortedBooks = booksData.sort(
        (a: Book, b: Book) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      );
      setMotRecent(sortedBooks);
      console.log(sortedBooks);
    };
    fetchBooks();
  }, []);

  return (
    <Container
      fluid
      style={{
        marginTop: -10,
        backgroundColor: isDarkModeEnabled ? darkMode.background : lightMode.background,
      }}
    >
      <h3
        style={{
          marginLeft: '20px',
          marginTop: '5px',
          marginBottom: '0px',
          color: isDarkModeEnabled ? darkMode.font : lightMode.font,
        }}
      >
        Highest rated
      </h3>
      <Carousel interval={null}>
        {topBooks.map((book, index) => {
          // Check if the item index is a multiple of 6 to create a new carousel item
          if (index % 6 === 0) {
            return (
              <Carousel.Item key={index} style={{ padding: '1rem' }}>
                <Row>
                  {topBooks.slice(index, index + 6).map((book, index) => (
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
      <h3
        style={{
          marginLeft: '20px',
          marginTop: '5px',
          marginBottom: '0px',
          color: isDarkModeEnabled ? darkMode.font : lightMode.font,
        }}
      >
        Most recent
      </h3>
      <Carousel interval={null}>
        {mostRecent.map((book, index) => {
          // Check if the item index is a multiple of 6 to create a new carousel item
          if (index % 6 === 0) {
            return (
              <Carousel.Item key={index} style={{ padding: '1rem' }}>
                <Row>
                  {mostRecent.slice(index, index + 6).map((book, index) => (
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
      <h3
        style={{
          marginLeft: '20px',
          marginTop: '5px',
          marginBottom: '0px',
          color: isDarkModeEnabled ? darkMode.font : lightMode.font,
        }}
      >
        Fiction
      </h3>
      <Carousel interval={null}>
        {fiction.map((book, index) => {
          // Check if the item index is a multiple of 6 to create a new carousel item
          if (index % 6 === 0) {
            return (
              <Carousel.Item key={index} style={{ padding: '1rem' }}>
                <Row>
                  {fiction.slice(index, index + 6).map((book, index) => (
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
    </Container>
  );
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Alert />
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/books/genres/:genre" component={BookList} />
      <Route exact path="/books/add" component={BookAdd} />
      <Route exact path="/books/login" component={UserLogIn} />
      <Route exact path="/books/register" component={RegisterUser} />
      <Route exact path="/books/user" component={UserDetails} />
      <Route exact path="/books/:book_id(\d+)" component={BookDetails} />
      <Route exact path="/books/:id(\d+)/edit" component={BookEdit} />
      <Route exact path="/books/search/:searchTerm" component={BookSearch} />
      <Route exact path="/authors/search/:searchTerm" component={AuthorSearch} />
      <Route exact path="/authors/:author_id" component={AuthorDetails} />
      <Route exact path="/authors/:id/edit" component={AuthorEdit} />
      <Route exact path="/addauthors/" component={AuthorAdd} />
      <Route exact path="/books/:book_id(\d+)/review" component={WriteReviewPage} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
