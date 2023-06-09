import React, { useEffect, useState } from 'react';
import { Component } from 'react-simplified';
import { Alert, Column } from './widgets';
import { Button, Form, Card, Row, Col, Container, Carousel } from 'react-bootstrap';
import { createHashHistory } from 'history';
import authorService, { Author } from './author-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';
import bookService, { Book } from './book-service';
import { BookCard } from './book-components';
import { computeAuthorRating } from './average';
import { getDarkModeCookies } from './getcookie';
import { darkMode, lightMode } from './colors';

// REMEMBER TO ADD IMPORTS FROM SERVICE

const history = createHashHistory(); // Use history.push(...) to programmatically change path

function StarRating(props: { rating: number }) {
  const [rating, setRating] = useState(props.rating);

  return (
    <div>
      <StarRatings
        rating={props.rating}
        starRatedColor="orange"
        //changeRating={setRating}
        numberOfStars={6}
        starDimension="30px"
        starSpacing="5px"
      />
    </div>
  );
}

/**
 * Renders book list.
 */
export class AuthorList extends Component {
  testData: String = '';
  isDarkModeEnabled = getDarkModeCookies();

  render() {
    return (
      <>
        {/* Search bar for easy access to gicen book */}
        <Card style={{ border: 'none', padding: '15px' }}>
          <Card.Title style={{ marginLeft: 'auto', marginRight: 'auto' }}>Example title</Card.Title>
          <Card.Title style={{ marginLeft: 'auto', marginRight: 'auto' }}>Example title</Card.Title>

          {this.testData}
        </Card>
      </>
    );
  }

  mounted() {
    //retrieving testdata
    authorService
      .getAll()
      .then((recievedData) => (this.testData = recievedData))
      .catch((error) => Alert.danger('Error getting books: ' + error.message));
  }

  search(input: string) {}
}

export class AuthorDetails extends Component<{
  match: {
    params: { author_id: string };
  };
}> {
  isDarkModeEnabled = getDarkModeCookies();
  author: Author = {
    id: '',
    name: '',
    country: '',
    books: [''],
    birthDate: '',
    deathDate: '',
    reviews: [''],
    description: '',
    imagePath: '',
  };
  books: Array<Book> = [];

  render() {
    return (
      <Container
        fluid
        style={{
          backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
          color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
          paddingLeft: '50px',
          paddingTop: '0px',
        }}
      >
        <Row xs={'auto'} style={{ paddingLeft: '30px' }}>
          <Button
            className="btn btn-light"
            onClick={() => history.push('/')}
            style={{
              width: '5rem',
              borderColor: this.isDarkModeEnabled ? darkMode.buttonMenu : lightMode.buttonMenu,
              color: this.isDarkModeEnabled ? darkMode.buttonMenu : lightMode.buttonMenu,
            }}
          >
            Back
          </Button>
        </Row>
        <Row>
          <Col sm={3} className="pt-4 ">
            <Row className="m-3">
              <img
                src={this.author.imagePath}
                className="img-fluid shadow "
                width={175}
                height={250}
                alt="..."
              />
            </Row>
          </Col>
          <Col sm={8}>
            <Row className="mt-3">
              <h3>{this.author.name} </h3>
            </Row>
            <Row className="mt-3">
              <StarRating rating={computeAuthorRating(this.books)}></StarRating>
            </Row>
            <Row className="overflow-auto mt-4" style={{ height: '40vh' }}>
              <p>{this.author.description}</p>
            </Row>
            <Row className="mt-3">
              <Col
                sm={1}
                style={{
                  fontWeight: 'bold',
                  color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                }}
              >
                <p> Life:</p>
              </Col>
              <Col>
                {this.author.birthDate + ' - '}
                {this.author.deathDate !== '' ? this.author.deathDate : 'now'}
              </Col>
            </Row>
            <Row>
              <Col sm={1}>
                <small
                  style={{
                    fontWeight: 'bold',
                    color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                  }}
                >
                  Country:
                </small>
              </Col>
              <Col sm={8}>
                <small>{this.author.country}</small>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>Books</h3>
          <Carousel interval={null}>
            {this.books.map((book, index) => {
              // Check if the item index is a multiple of 6 to create a new carousel item
              if (index % 4 === 0) {
                return (
                  <Carousel.Item key={index} style={{ padding: '1rem' }}>
                    <Row>
                      {this.books.slice(index, index + 4).map((book, index) => (
                        <Col className="m-1" key={index}>
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
        </Row>
      </Container>
    );
  }

  mounted() {
    authorService
      .getAuthor(this.props.match.params.author_id)
      .then((author) => {
        this.author = author;
        bookService.getBookByAuthor(this.author.name).then((books) => {
          this.books = books;
        });
      })
      .catch((error) => Alert.danger('Error getting recipe details: ' + error.message));
  }
}

export class AuthorAdd extends Component {
  isDarkModeEnabled = getDarkModeCookies();
  author: Author = {
    id: '',
    name: '',
    country: '',
    books: [''],
    birthDate: '',
    deathDate: '',
    reviews: [''],
    description: '',
    imagePath: '',
  };

  addAuthor() {
    authorService.addAuthor(
      this.author.id,
      this.author.name,
      this.author.country,
      this.author.books,
      this.author.birthDate,
      this.author.deathDate,
      this.author.reviews,
      this.author.description,
      this.author.imagePath
    );
    Alert.success('The book has been added');
  }

  render() {
    return (
      <Container
        fluid
        style={{
          backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
          color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
          height: '100vh',
          marginTop: '-50px',
          paddingTop: '70px',
        }}
      >
        <Card
          style={{
            border: '0',
            textAlign: 'center',
            margin: '10%',
            marginTop: '3%',
            backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
          }}
        >
          <Card.Title>Details:</Card.Title>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    onChange={(event) => (this.author.name = event.currentTarget.value)}
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="id">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    onChange={(event) => (this.author.id = event.currentTarget.value)}
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    onChange={(event) => (this.author.imagePath = event.currentTarget.value)}
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    onChange={(event) => (this.author.country = event.currentTarget.value)}
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="birthDate">
                  <Form.Label>Birth date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="dd. month yyyy"
                    onChange={(event) => (this.author.birthDate = event.currentTarget.value)}
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="deathDate">
                  <Form.Label>Death date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter death date, if alive leave empty"
                    onChange={(event) => (this.author.deathDate = event.currentTarget.value)}
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter description"
                    rows={1}
                    onChange={(event) => (this.author.description = event.currentTarget.value)}
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Button
                onClick={() => this.addAuthor()}
                variant="lg "
                style={{
                  backgroundColor: this.isDarkModeEnabled
                    ? darkMode.buttonCard
                    : lightMode.buttonCard,
                  color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                  width: '50rem',
                  margin: 'auto',
                }}
              >
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    );
  }
  mounted() {}
}

export class AuthorEdit extends Component<{ match: { params: { id: number } } }> {
  isDarkModeEnabled = getDarkModeCookies();
  render() {
    return (
      <>
        <Container>
          <Card style={{ borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}>
            <Card.Title style={{ textAlign: 'center', marginTop: '1%' }}>Lorem Ipsum</Card.Title>
          </Card>
        </Container>
      </>
    );
  }

  mounted() {}
}

export function AuthorCard(props: { author: Author }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(getDarkModeCookies());

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await bookService.getBookByAuthor(props.author.name);
      setBooks(books);
    };
    fetchBooks();
  }, []);
  return (
    <Card
      className="shadow rounded"
      style={{
        width: '14.5rem',
        margin: '2px',
        backgroundColor: isDarkModeEnabled ? darkMode.background : lightMode.background,
      }}
    >
      <Card.Img
        variant="top"
        src={props.author.imagePath}
        style={{ width: '100', height: '200px' }}
      />
      <Card.Body>
        <Card.Title
          className="text-truncate"
          style={{ color: isDarkModeEnabled ? darkMode.font : lightMode.font }}
        >
          {props.author.name}
        </Card.Title>
        <Row>
          <Col className="col-8">
            <Button
              onClick={() => history.push(`/authors/${props.author.id}`)}
              style={{
                backgroundColor: isDarkModeEnabled ? darkMode.buttonCard : lightMode.buttonCard,
                color: isDarkModeEnabled ? darkMode.card : lightMode.card,
                border: 'none',
              }}
            >
              Read more
            </Button>
          </Col>
          <Col className="col-4">
            <div
              className="d-flex align-items-center justify-content-end"
              style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              <span
                style={{
                  color: isDarkModeEnabled ? darkMode.star : lightMode.star,
                  marginRight: '5px',
                }}
              >
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span style={{ color: isDarkModeEnabled ? darkMode.font : lightMode.font }}>
                {computeAuthorRating(books)}
              </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
