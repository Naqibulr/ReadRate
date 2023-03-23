import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Container, Row, Col, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { BookCard } from './book-components';
import bookService, { Book } from './book-service';
import { AuthorCard } from './author-components';
import authorService, { Author } from './author-service';
import { useEffect, useState, useCallback } from 'react';
import { getDarkModeCookies } from './getcookie';
import { darkMode, lightMode } from './colors';
import { useHistory, useLocation } from 'react-router-dom';

export function BookSearch() {
  const [books, setBooks] = useState<Book[]>([]);
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [filter, updateFilter] = useState<string>();
  const [yearFrom, updateYearFrom] = useState<string>();
  const [yearTo, updateYearTo] = useState<string>();
  const [searchTermArray, updateSearchTermArray] = useState<Array<string>>();
  const [click, updateClick] = useState<string>('1');
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(getDarkModeCookies());
  const [selectedFilters, setSelectedFilters] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getFilteredBooks(searchTerm);
      const books = booksData;
      setBooks(books);
    };
    fetchBooks();
  }, [searchTerm]);

  const handleChangeFilter = (event: any) => {
    updateFilter(event.target.value);
  };

  const searchWithFilter = () => {
    //@ts-ignore
    window.location.href = `http://localhost:3000/#/books/search/${searchTerm + '&' + filter}`;

    //@ts-ignore
    addFilter(filter);
  };

  const searchWithYear = () => {
    if (yearFrom == '') updateYearFrom('-10000');
    if (yearTo == '') updateYearTo('10000');
    window.location.href = `http://localhost:3000/#/books/search/${
      searchTerm + '&' + yearFrom + '@@' + yearTo
    }`;
    //@ts-ignore
    addFilter(yearFrom + '-' + yearTo);
  };

  const searchRating = () => {
    window.location.href = `http://localhost:3000/#/books/search/${
      searchTerm + '&' + click + '++'
    }`;
    //@ts-ignore
    addFilter(click + '++');
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

  const addFilter = (filter: string) => {
    //@ts-ignore
    setSelectedFilters([...selectedFilters, filter]);
  };

  const removeFilter = (text: any) => {
    const filters = [...selectedFilters];
    console.log(...selectedFilters);
    filters.splice(text, 1);
    setSelectedFilters(filters);
    window.location.href = `http://localhost:3000/#/books/search/${searchTerm.split('&')[0]}`;
    filters.forEach((element) => {
      window.location.href += '&' + element;
    });
  };

  return (
    <Container fluid style={{ margin: 0 }}>
      <Row className="m-3">
        <Col>
          <InputGroup className="p-0">
            <Form.Control
              placeholder="Filter"
              aria-label="Search"
              aria-describedby="Search field"
              onChange={handleChangeFilter}
            />
            <Button variant="light" id="button-addon2" onClick={searchWithFilter}>
              Add filter
            </Button>
          </InputGroup>
        </Col>
        <Col>
          {' '}
          <InputGroup className="p-0">
            <Form.Control
              placeholder="From year"
              aria-label="Search"
              aria-describedby="Search field"
              onChange={handleChangeYearFrom}
              style={{
                backgroundColor: isDarkModeEnabled ? darkMode.background : lightMode.background,
                color: isDarkModeEnabled ? darkMode.font : lightMode.font,
              }}
            />
          </InputGroup>
        </Col>

        <Col>
          {' '}
          <InputGroup className="p-0">
            <Form.Control
              placeholder="To year"
              aria-label="Search"
              aria-describedby="Search field"
              onChange={handleChangeYearTo}
              style={{
                backgroundColor: isDarkModeEnabled ? darkMode.background : lightMode.background,
                color: isDarkModeEnabled ? darkMode.font : lightMode.font,
              }}
            />
            <Button variant="light" id="button-addon2" onClick={searchWithYear}>
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
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
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            {selectedFilters.map((filter, index) => (
              <Col key={index} className="label">
                {filter} <button onClick={() => removeFilter(index)}>x</button>
              </Col>
            ))}
          </InputGroup>
        </Col>
        {/* <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>{searchTerm}</h3> */}
      </Row>
      <Row>
        {books.map((book: Book) => {
          return <BookCard book={book} />;
        })}
      </Row>
    </Container>
  );
}

export function AuthorSearch() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(getDarkModeCookies());

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorsData = await authorService.getFilteredAuthors(searchTerm);
      const authors = authorsData;
      setAuthors(authors);
    };
    fetchAuthors();
  }, []);

  return (
    <Container
      fluid
      style={{
        marginTop: '-10px',
        backgroundColor: isDarkModeEnabled ? darkMode.background : lightMode.background,
        height: '100vh',
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
        {searchTerm}
      </h3>
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
