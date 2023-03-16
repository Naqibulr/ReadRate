import React, { useEffect, useState } from 'react';
import { Component } from 'react-simplified';
import { Alert, Column } from './widgets';
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  Modal,
  Container,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { createHashHistory } from 'history';
import bookService, { Book } from './book-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';
import { computeAverage } from './average';
import { Link } from 'react-router-dom';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

interface ReviewFormData {
  name: string;
  rating: number;
  comment: string;
}

export const WriteReviewPage = (props: { book: Book }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    rating: 0,
    comment: '',
  });

  //const { book_id } = props.match.params;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can save the review to your database or do other logic
    // Once done, navigate the user back to the book details page or homepage
    history.goBack(); //history.push(`/books/${props.book.ISBN}`); //book-details
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (newRating: number) => {
    // @ts-ignore
    StarRating(newRating);
  };

  return (
    <div>
      <h1>Write a Review</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <FormGroup controlId="rating">
          <FormLabel>Rating</FormLabel>
          <FormControl
            as="select"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a rating...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </FormControl>
        </FormGroup>

        <Form.Group controlId="comment">
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

// REMEMBER TO ADD IMPORTS FROM SERVICE

function StarRating(props: { rating: number }) {
  const [rating, setRating] = useState(4.8);

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

interface BookListProps {
  match: {
    params: {
      genre: string;
    };
  };
}

export function BookList(props: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const genre = props.match.params.genre;

  useEffect(() => {
    bookService
      .getBooksByGenre(genre)
      .then((books) => setBooks(books))
      .catch((error) => Alert.danger('Error getting recipe details: ' + error.message));
  }, []);

  return (
    <div className="p-4 pt-1">
      <Row style={{ marginTop: '10px' }}>
        <h3>{props.match.params.genre}</h3>
      </Row>
      <Row>
        {books.map((book) => (
          <Col className="mb-3" key={book.id} md={2}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export class BookDetails extends Component<{
  match: {
    params: { book_id: string };
  };
}> {
  book: Book = {
    id: '',
    rating: [],
    title: '',
    ISBN: '',
    author: '',
    releaseYear: 0,
    publisher: '',
    pages: 0,
    description: '',
    genre: [],
    addedDate: new Date(),
    imagePath: '',
  };

  render() {
    return (
      <Container className="p-3">
        <Row xs={'auto'}>
          <Col sm={3} className="pt-4 ">
            <Button
              variant="light"
              onClick={() => history.push('/')}
              style={{
                width: '5rem',
                borderColor: 'rgb(223, 120, 97)',
                color: 'rgb(223, 120, 97)',
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={3} className="pt-4 ">
            <Row className="m-3 p-0">
              <img
                src={this.book.imagePath}
                className="img-fluid shadow "
                width={175}
                height={250}
                alt="..."
              />
            </Row>
            <Row className="m-3 ">
              <Button
                type="button"
                className="btn btn-success mt-3"
                style={{ backgroundColor: 'rgb(148, 180, 159)', color: 'rgb(255, 255, 255)' }}
              >
                Want to read
              </Button>
            </Row>
            <Row className="m-3 ">
              <Button
                type="button"
                className="btn btn-success mt-3"
                style={{ backgroundColor: 'rgb(148, 180, 159)', color: 'rgb(255, 255, 255)' }}
              >
                Have read
              </Button>
            </Row>
            <Row className="m-3 ">
              <Button
                type="button"
                style={{ backgroundColor: 'rgb(148, 180, 159)', color: 'rgb(255, 255, 255)' }}
                className="btn btn-success mt-3"
                onClick={() => history.push(`/books/${this.book.ISBN}/review`)}
              >
                Write review
              </Button>
            </Row>
          </Col>
          <Col sm={8}>
            <Row className="mt-3">
              <h3>{this.book.title} </h3>
            </Row>
            <Row className="mt-1">
              <h5>By {this.book.author}</h5>
            </Row>
            <Row className="mt-1">
              <StarRating rating={computeAverage(this.book.rating)}></StarRating>
            </Row>
            <Row className="overflow-auto mt-4" style={{ height: '40vh' }}>
              <p>{this.book.description}</p>
            </Row>
            <Row className="mt-3">
              <Col sm={1} style={{ fontWeight: 'bold', color: 'rgb(77, 77, 77)' }}>
                <p> Genres:</p>
              </Col>
              {this.book.genre.map((genre) => (
                <Col sm={1}>
                  {/* <Button onClick={() => history.push(`/books/genres/${genre}`)}>{genre}</Button> */}
                  <Link
                    to={`/books/genres/${genre}`}
                    style={{
                      color: 'rgb(128, 128, 128)',
                      textDecoration: 'none',
                      borderBottom: '2px solid green',
                      fontWeight: 'bold',
                    }}
                  >
                    {genre}
                  </Link>
                </Col>
              ))}
            </Row>
            <Row>
              <Col sm={1}>
                <small style={{ fontWeight: 'bold', color: 'rgb(77, 77, 77)' }}>Pages:</small>
              </Col>
              <Col sm={8}>
                <small>{this.book.pages}</small>
              </Col>
            </Row>
            <Row>
              <Col sm={1}>
                <small style={{ fontWeight: 'bold', color: 'rgb(77, 77, 77)' }}>Published: </small>
              </Col>
              <Col sm={8}>
                <small>
                  {this.book.releaseYear}, by {this.book.publisher}
                </small>
              </Col>
            </Row>
            <Row>
              <Col sm={1}>
                <small style={{ fontWeight: 'bold', color: 'rgb(77, 77, 77)' }}>ISBN:</small>
              </Col>
              <Col sm={8}>
                <small>{this.book.ISBN}</small>
              </Col>
            </Row>
            
          </Col>
        </Row>
      </Container>
    );
  }
  mounted() {
    bookService
      .getBook(this.props.match.params.book_id)
      .then((book) => (this.book = book))
      .catch((error) => Alert.danger('Error getting recipe details: ' + error.message));
  }
}

export class BookAdd extends Component {
  book: Book = {
    id: '',
    title: '',
    ISBN: '',
    author: '',
    releaseYear: 0,
    publisher: '',
    pages: 0,
    description: '',
    genre: [],
    rating: [],
    addedDate: new Date(),
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

  addBook() {
    console.log('book-components', this.book);
    bookService.addBook(this.book);
    Alert.success('The book has been added');
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
              <Form.Check
                inline
                type="checkbox"
                label="Tragedy"
                value="Tragedy"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Fiction"
                value="Fiction"
                onChange={(event) => this.handleCheckboxChange(event)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Button
              onClick={() => this.addBook()}
              variant="lg"
              style={{
                backgroundColor: 'rgb(148, 180, 159)',
                color: 'rgb(255, 255, 255)',
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

export function BookCard(props: { book: Book }) {
  return (
    <Card className="shadow bg-white rounded" style={{ width: '14.5rem', margin: '2px' }}>
      <Card.Img
        variant="top"
        src={props.book.imagePath}
        style={{ width: '100', height: '200px' }}
      />
      <Card.Body>
        <Card.Title className="text-truncate">{props.book.title}</Card.Title>
        <Card.Text
          className="text-truncate"
          style={{ color: 'rgb(128,128,128)', cursor: 'pointer' }}
        >
          {props.book.author}
        </Card.Text>

        <Row>
          <Col className="col-8">
            <Button
              variant="success"
              onClick={() => history.push(`/books/${props.book.ISBN}`)}
              style={{ backgroundColor: 'rgb(148, 180, 159)', color: 'rgb(255, 255, 255)' }}
            >
              Read more
            </Button>
          </Col>
          <Col className="col-4">
            <div
              className="d-flex align-items-center justify-content-end"
              style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              <span style={{ color: '#FFA500', marginRight: '5px' }}>
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span>{computeAverage(props.book.rating)}</span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
