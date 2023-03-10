import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { BookCard } from './book-components';
import bookService, { Book } from './book-service';
import { AuthorCard } from './author-components';
import authorService, { Author } from './author-service';
import { useEffect, useState } from 'react';

export function BookSearch() {
  const [books, setBooks] = useState<Book[]>([]);
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [filter, updateFilter] = useState<string>();
  const [searchTermArray, updateSearchTermArray] = useState<Array<string>>();

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

  const searchSplit = () => {
    updateSearchTermArray(searchTerm.split('&'));
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
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        {/* <h3 style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '0px' }}>{searchTerm}</h3> */}
      </InputGroup>

      <Carousel interval={null}>
        <Carousel.Item style={{ padding: '1rem' }}>
          <Row>
            {books.map((book: Book) => {
              return (
                <Col xs={2} key={book.id}>
                  <BookCard book={book} />
                </Col>
              );
            })}
          </Row>
        </Carousel.Item>
      </Carousel>
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
