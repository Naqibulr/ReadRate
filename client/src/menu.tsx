//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Component } from 'react-simplified';
import { getDarkModeCookies, setDarkModCookies } from './getcookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import getBookRating from './google-books-rating';
import { darkMode, lightMode } from './colors';
import { getCookieValue } from './getcookie';
import Logo from './Logo.png';
import { loggedIn } from './user-components';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LogoDark from './Logo_darkmode.png';

export class Menu extends Component {
  state = {
    searchValue: '',
    filterValue: 'Book',
  };

  isAdmin = document.cookie.includes('admin=true');
  isDarkModeEnabled = getDarkModeCookies();

  handleToggleDarkMode = () => {
    setDarkModCookies(!this.isDarkModeEnabled);
    window.location.reload();
    console.log(getBookRating('American Psycho'));
  };

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
    window.location.reload();
  };

  render() {
    return (
      /*Renders navbar using components from React-Bootstrap library */
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{
          backgroundColor: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
        }}
      >
        <Navbar.Brand href="/">
          <img
            src={this.isDarkModeEnabled ? LogoDark : Logo}
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
                <Dropdown id="dropdown">
                  <Dropdown.Toggle
                    variant="light"
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                      borderColor: this.isDarkModeEnabled
                        ? darkMode.buttonMenu
                        : lightMode.buttonMenu,
                      color: this.isDarkModeEnabled ? darkMode.buttonMenu : lightMode.buttonMenu,
                    }}
                    id="dropdown-basic"
                  >
                    {this.state.filterValue}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{
                      backgroundColor: this.isDarkModeEnabled
                        ? darkMode.background
                        : lightMode.background,
                    }}
                  >
                    <Dropdown.Item
                      style={{ color: this.isDarkModeEnabled ? darkMode.font : lightMode.font }}
                      onClick={() => this.handleItemClick('Book')}
                    >
                      Book
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ color: this.isDarkModeEnabled ? darkMode.font : lightMode.font }}
                      onClick={() => this.handleItemClick('Author')}
                    >
                      Author
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="Search field"
                  onChange={this.handleInputChange}
                  style={{
                    backgroundColor: this.isDarkModeEnabled
                      ? darkMode.background
                      : lightMode.background,
                    borderColor: this.isDarkModeEnabled
                      ? darkMode.buttonMenu
                      : lightMode.buttonMenu,
                    color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                  }}
                />

                <Button
                  variant="light"
                  id="button-addon2"
                  onClick={this.handleSearch}
                  style={{
                    backgroundColor: this.isDarkModeEnabled
                      ? darkMode.buttonMenu
                      : lightMode.buttonMenu,
                    color: this.isDarkModeEnabled ? darkMode.background : lightMode.background,
                    borderColor: this.isDarkModeEnabled
                      ? darkMode.buttonMenu
                      : lightMode.buttonMenu,
                  }}
                >
                  Search
                </Button>
              </InputGroup>

              <Nav.Link
                href="/#/books"
                style={{
                  color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                  marginTop: '15px',
                }}
              ></Nav.Link>
              {this.isAdmin ? (
                <Nav.Link
                  href="/#/books/add"
                  style={{
                    color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    marginTop: '15px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Add book
                </Nav.Link>
              ) : null}
              {this.isAdmin ? (
                <Nav.Link
                  href="/#/addauthors/"
                  style={{
                    color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                    marginTop: '15px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Add author
                </Nav.Link>
              ) : null}
              <Nav.Link
                href="/#/books/user"
                style={{
                  marginTop: '15px',
                  color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                }}
              >
                {getCookieValue('loggedIn') == 'true' ? 'Profile' : 'Login'}
              </Nav.Link>
              <Button
                onClick={() => this.handleToggleDarkMode()}
                style={{
                  backgroundColor: 'transparent',
                  paddingTop: 0,
                  alignItems: 'center',
                  border: 'none',
                  height: 30,
                  left: 0,
                  marginTop: '22px',
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleHalfStroke}
                  style={{
                    height: 30,
                    width: 30,
                    color: this.isDarkModeEnabled ? darkMode.font : lightMode.font,
                  }}
                />
              </Button>
              {/* <button style="background-color: #222; color: #fff; border: 2px solid #fff;">
                Dark Mode
              </button> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
