import React from 'react';
import { Component } from 'react-simplified';
import { Alert, Column } from './widgets';
import { NavLink } from 'react-router-dom';
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap';
import { createHashHistory } from 'history';
import { loggedIn, currentUser } from './user-components';
import bookService, { Book } from './book-service';

// REMEMBER TO ADD IMPORTS FROM SERVICE

const history = createHashHistory(); // Use history.push(...) to programmatically change path

/**
 * Renders book list.
 */
export class BookList extends Component {
  testData: String = '';

  render() {
    return (
      <>
        {/* Search bar for easy access to gicen book */}
        <Card style={{ border: 'none', padding: '15px' }}>
          <Card.Title style={{ marginLeft: 'auto', marginRight: 'auto' }}>Example title</Card.Title>

          {this.testData}
        </Card>
      </>
    );
  }

  mounted() {
    //retrieving testdata
    bookService
      .getAll()
      .then((recievedData) => (this.testData = recievedData))
      .catch((error) => Alert.danger('Error getting books: ' + error.message));
  }

  search(input: string) {}
}

export class BookDetails extends Component<{ match: { params: { book_id: number } } }> {
  render() {
    return (
      <>
        <Container>
          <Card
            style={{
              borderLeft: 'none',
              borderRight: 'none',
              borderTop: 'none',
              paddingBottom: '3%',
              borderRadius: '0px',
              textAlign: 'center',
            }}
            title={''}
          ></Card>
        </Container>
      </>
    );
  }

  mounted() {}
}

export class BookAdd extends Component {
  book: Book = {
    title: '',
    ISBN: '',
    author: '',
    releaseYear: 0,
    publisher: '',
    pages: 0,
    description: '',
    genre: [],
    imagePath: '',
  };

  ischecked: boolean = false;

  handleCheckboxChange = (event: any) => {
    this.ischecked = event.target.checked;
    if (this.ischecked) {
      this.book.genre.push(event.target.value);
    } else {
      this.book.genre.splice(this.book.genre.indexOf(event.target.value), 1);
    }
  };

  log() {
    console.log(this.book);
  }

  createBook() {}

  addBook() {
    bookService.addBook(
      this.book.title,
      this.book.ISBN,
      this.book.author,
      this.book.releaseYear,
      this.book.publisher,
      this.book.pages,
      this.book.description,
      this.book.genre,
      this.book.imagePath
    );
  }

  getBooks() {
    bookService.getBooks();
  }

  getBook(ISBN: string) {
    bookService.getBook(ISBN);
  }

  render() {
    return (
      <Card
        style={{
          border: '0',
          textAlign: 'center',
          margin: '10%',
          marginTop: '3%',
        }}
      >
        <Card.Title>Details:</Card.Title>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  onChange={(event) => (this.book.title = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ISBN"
                  onChange={(event) => (this.book.ISBN = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author name"
                  onChange={(event) => (this.book.author = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="releaseYear">
                <Form.Label>Release year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Release year"
                  onChange={(event) =>
                    (this.book.releaseYear = parseInt(event.currentTarget.value))
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="publisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter publisher name"
                  onChange={(event) => (this.book.publisher = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="pages">
                <Form.Label>Number of pages</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter number of pages"
                  onChange={(event) => (this.book.pages = parseInt(event.currentTarget.value))}
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
                  onChange={(event) => (this.book.description = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  onChange={(event) => (this.book.imagePath = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label>Choose Genre</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                inline
                type="checkbox"
                label="Fantasy"
                value="Fantasy"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Humour"
                value="Humor"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="History"
                value="History"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Novel"
                value="Novel"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Children's"
                value="Children's"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Crime"
                value="Crime"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Drama"
                value="Drama"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Horror"
                value="Horror"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Poetry"
                value="Poetry"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Science"
                value="Science"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Button
              onClick={() => this.getBook('isbn')}
              variant="lg bg-success"
              style={{
                width: '50rem',
                margin: 'auto',
              }}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
    );
  }
  mounted() {}
}

export class BookEdit extends Component<{ match: { params: { id: number } } }> {
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
