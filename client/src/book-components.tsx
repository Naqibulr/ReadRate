import React from 'react';
import { Component } from 'react-simplified';
import { Alert, Column } from './widgets';
import { NavLink } from 'react-router-dom';
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap';
import { createHashHistory } from 'history';
import { loggedIn, currentUser } from './user-components';
import bookService from './book-service';
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
  title: string = 'abc';
  ISBN: string = '';
  author: string = '';
  releaseYear: number = 0;
  publisher: string = '';
  pages: number = 0;
  description: string = '';
  genre: Array<string> = [];
  ischecked: boolean = false;

  handleCheckboxChange = (event: any) => {
    this.ischecked = event.target.checked;
    if (this.ischecked) {
      this.genre.push(event.target.value);
    } else {
      this.genre.splice(this.genre.indexOf(event.target.value), 1);
    }
  };

  log() {
    console.log(
      this.title +
        ', ' +
        this.ISBN +
        ', ' +
        this.author +
        ', ' +
        this.releaseYear +
        ', ' +
        this.publisher +
        ', ' +
        this.pages +
        ', ' +
        this.description +
        ', ' +
        this.genre
    );
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
                  onChange={(event) => (this.title = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ISBN"
                  onChange={(event) => (this.ISBN = event.currentTarget.value)}
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
                  onChange={(event) => (this.author = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="releaseYear">
                <Form.Label>Release year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Release year"
                  onChange={(event) => (this.releaseYear = parseInt(event.currentTarget.value))}
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
                  onChange={(event) => (this.publisher = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="pages">
                <Form.Label>Number of pages</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter number of pages"
                  onChange={(event) => (this.pages = parseInt(event.currentTarget.value))}
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
                  onChange={(event) => (this.description = event.currentTarget.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Upload image" />
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
              <Form.Check inline type="checkbox" label="Humour" value="Humor" />
              <Form.Check inline type="checkbox" label="History" />
              <Form.Check inline type="checkbox" label="Novel" />
              <Form.Check inline type="checkbox" label="Children's" />
              <Form.Check inline type="checkbox" label="Crime" />
              <Form.Check inline type="checkbox" label="Drama" />
              <Form.Check inline type="checkbox" label="Horror" />
              <Form.Check inline type="checkbox" label="Poetry" />
              <Form.Check inline type="checkbox" label="Science" />
            </Form.Group>
          </Row>
          <Row>
            <Button
              onClick={() => this.log()}
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
