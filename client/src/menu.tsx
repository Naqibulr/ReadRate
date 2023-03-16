//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Component } from 'react-simplified';
import Logo from './Logo.png';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';

export class Menu extends Component {



  state = {
    searchValue: '',
    filterValue: 'Book',
  };

  isAdmin = document.cookie.includes('admin=true');

  handleInputChange = (event: any) => {
    this.setState({ searchValue: event.target.value }); // Update the search input value when the user types into the field
  };

  handleItemClick(text: string) {
    this.setState({ filterValue: text });
  }

  handleSearch = () => {
    if (this.state.filterValue == 'Book')
      window.location.href = `http://localhost:3000/#/books/search/${this.state.searchValue}`; // Navigate to the search URL with the search input value
    else window.location.href = `http://localhost:3000/#/authors/search/${this.state.searchValue}`;
    window.location.reload;
  };

  render() {
    return (
      /*Renders navbar using components from React-Bootstrap library */
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: 'rgb(254, 252, 251)', color: 'rgb(73 15 224)' }}
      >
        <Navbar.Brand href="/">
          <img
            src={Logo}
            alt="logo"
            style={{ width: '250px', height: 'auto', marginLeft: '20px' }}
          />
        </Navbar.Brand>
        <Container className="d-flex justify-content-center align-items-center">
          {/* Container to wrap elements of navbar within given margin of page end and start */}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <InputGroup className="p-3">
                <Dropdown id="dropdown" >
                  <Dropdown.Toggle variant="light" style={{borderColor: 'rgb(223, 120, 97)', color: 'rgb(223, 120, 97)'}} id="dropdown-basic" >
                    {this.state.filterValue}
                  </Dropdown.Toggle>

                  <Dropdown.Menu >
                    <Dropdown.Item  onClick={() => this.handleItemClick('Book')}>Book</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleItemClick('Author')}>
                      Author
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="Search field"
                  onChange={this.handleInputChange}
                />

                <Button variant="light" id="button-addon2" onClick={this.handleSearch} style={{backgroundColor: 'rgb(223, 120, 97)' , color: 'rgb(254, 252, 251)'}}>
                  Search
                </Button>
              </InputGroup>

              <Nav.Link
                href="/#/books"
                style={{ color: 'rgb(73 15 224)', marginTop: '15px' }}
              ></Nav.Link>
              {this.isAdmin ? (
                <Nav.Link
                  href="/#/books/add"
                  style={{ color: 'rgb(34, 34, 34)', marginTop: '15px', whiteSpace: 'nowrap' }}
                >
                  Add book
                </Nav.Link>
              ) : null}
              {this.isAdmin ? (
                <Nav.Link
                  href="/#/addauthors/"
                  style={{ color: 'rgb(34, 34, 34)', marginTop: '15px', whiteSpace: 'nowrap' }}
                >
                  Add author
                </Nav.Link>
              ) : null}
              <Nav.Link href="/#/books/user" style={{ color: 'rgb(34, 34, 34)', marginTop: '15px' }}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
