//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Component } from 'react-simplified';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';

export class Menu extends Component {
  render() {
    return (
      /*Renders navbar using components from React-Bootstrap library */
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: 'rgb(251 238 193)', color: 'rgb(73 15 224)' }}
      >
        <Container className="d-flex justify-content-center align-items-center">
          {/* Container to wrap elements of navbar within given margin of page end and start */}

          <Navbar.Brand href="/">
            <h3 style={{ color: 'rgb(73 15 224)' }}>ReadRate</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <InputGroup className="p-3">
                <Dropdown id="dropdown">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Filter
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Genre</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Author</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="Search field"
                />

                <Button variant="light" id="button-addon2">
                  Search
                </Button>
              </InputGroup>

              <Nav.Link
                href="/#/books"
                style={{ color: 'rgb(73 15 224)', marginTop: '15px' }}
              ></Nav.Link>
              <Nav.Link
                href="/#/books/add"
                style={{ color: 'rgb(73 15 224)', marginTop: '15px', whiteSpace: 'nowrap' }}
              >
                add book
              </Nav.Link>
              <Nav.Link href="/#/books/user" style={{ color: 'rgb(73 15 224)', marginTop: '15px' }}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
    );
  }
}
