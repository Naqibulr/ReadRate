import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Container, Row, Col, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { BookCard } from './book-components';
import bookService, { Book } from './book-service';
import { AuthorCard } from './author-components';
import authorService, { Author } from './author-service';
import { useEffect, useState } from 'react';

export function BookSearch() {
  const [books, setBooks] = useState<Book[]>([]);
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [filter, updateFilter] = useState<string>();
  const [yearFrom, updateYearFrom] = useState<string>();
  const [yearTo, updateYearTo] = useState<string>();
  const [searchTermArray, updateSearchTermArray] = useState<Array<string>>();
  const [click, updateClick] = useState<string>('1');

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getFilteredBooks(searchTerm);
      const books = booksData.slice(0, 6);
      setBooks(books);
    };
    fetchBooks();
  }, []);

  const handleChangeFilter = (event: any) => {
    updateFilter(event.target.value);
  };

  const searchWithFilter = () => {
    window.location.href = `http://localhost:3000/#/books/search/${searchTerm + '&' + filter}`;
    window.location.reload();
  };

  const searchWithYear = () => {
    if (yearFrom == '') updateYearFrom('-10000');
    if (yearTo == '') updateYearTo('10000');
    window.location.href = `http://localhost:3000/#/books/search/${
      searchTerm + '&' + yearFrom + '@@' + yearTo
    }`;
    window.location.reload();
  };

  const searchRating = () => {
    window.location.href = `http://localhost:3000/#/books/search/${
      searchTerm + '&' + click + '++'
    }`;
    window.location.reload();
  };

  const handleChangeYearFrom = (event: any) => {
    updateYearFrom(event.target.value);
  };
  const handleChangeYearTo = (event: any) => {
    updateYearTo(event.target.value);
  };

  const searchSplit = () => {
    updateSearchTermArray(searchTerm.split('&'));
  };

  const searchSplitYear = () => {
    updateSearchTermArray(searchTerm.split('@@'));
  };

  const handleChangeRating = (text: any) => {
    updateClick(text);
  };

  return (
    <Container fluid style={{ margin: 0 }}>
      <InputGroup className="p-3">
        <Form.Control
          placeholder="Filter"
          aria-label="Search"
          aria-describedby="Search field"
          onChange={handleChangeFilter}
        />
        <Col>
          <Button variant="light" id="button-addon2" onClick={searchWithFilter}>
            Add filter
          </Button>
        </Col>
        <Col>
          {' '}
          <InputGroup className="p-0">
            <Form.Control
              placeholder="Fra år"
              aria-label="Search"
              aria-describedby="Search field"
              onChange={handleChangeYearFrom}
            />
          </InputGroup>
        </Col>

        <Col>
          {' '}
          <InputGroup className="p-0">
            <Form.Control
              placeholder="Til år"
              aria-label="Search"
              aria-describedby="Search field"
              onChange={handleChangeYearTo}
            />
          </InputGroup>
        </Col>
        <Col>
          {' '}
          <Button variant="light" id="button-addon2" onClick={searchWithYear}>
            Search
          </Button>
        </Col>
        <Col></Col>
        <Col>
          <Dropdown id="dropdown">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {click + '+'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleChangeRating('1')}>1+</Dropdown.Item>
              <Dropdown.Item onClick={() => handleChangeRating('2')}>2+</Dropdown.Item>
              <Dropdown.Item onClick={() => handleChangeRating('3')}>3+</Dropdown.Item>
              <Dropdown.Item onClick={() => handleChangeRating('4')}>4+</Dropdown.Item>
              <Dropdown.Item onClick={() => handleChangeRating('5')}>5+</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>{' '}
          <Button variant="light" id="button-addon2" onClick={searchRating}>
            Add rating filter
          </Button>
        </Col>
        {/* <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>{searchTerm}</h3> */}
      </InputGroup>
      <Row>
        {books.map((book: Book) => {
          return (
            <Col xs={2} key={book.id}>
              <BookCard book={book} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export function AuthorSearch() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const { searchTerm } = useParams<{ searchTerm: string }>();

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorsData = await authorService.getFilteredAuthors(searchTerm);
      const authors = authorsData.slice(0, 6);
      setAuthors(authors);
    };
    fetchAuthors();
    console.log(authors);
  }, []);

  return (
    <Container fluid style={{ margin: 0 }}>
      <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>{searchTerm}</h3>
      <Carousel interval={null}>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {authors.map((author: Author) => {
              return (
                <Col xs={2} key={author.id}>
                  <AuthorCard author={author} />
                </Col>
              );
            })}
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
