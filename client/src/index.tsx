import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import { Carousel, Card, Container, Navbar, Nav, Dropdown, InputGroup, Form, Button } from 'react-bootstrap';
import { BookAdd, BookList, BookDetails, BookEdit } from './book-components';
import { UserDetails, UserLogIn, RegisterUser } from './user-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


class Menu extends Component {
  render() {
    return (
      /*Renders navbar using components from React-Bootstrap library */
      <Navbar 
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: 'rgb(251 238 193)',color: 'rgb(73 15 224)'}}
      >
        <Container >
          {/* Container to wrap elements of navbar within given margin of page end and start */}

          <Navbar.Brand href="">
            <h3 style={{color: 'rgb(73 15 224)'}}>ReadRate</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav >
                
                <InputGroup className="p-3">
                  <Dropdown id='dropdown'>
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
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  
                </InputGroup>
          
              <Nav.Link href="/#/books" style={{color: 'rgb(73 15 224)'}} >Lorem ipsum</Nav.Link>
              <Nav.Link href="/#/books/add" style={{color: 'rgb(73 15 224)'}}>Lorem ipsum</Nav.Link>
              <Nav.Link href="/#/books/user" style={{color: 'rgb(73 15 224)'}}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

class Home extends Component {
  mounted() {
  }
  render() {
    return (
      <Container>
        <Card
          style={{
            border: 'none',
            textAlign: 'center',
            margin: '2%',
          }}
        >
          {/* Carousel on first page with navlink to books and user */}
          <Card.Body>
            <Card style={{ border: 'none', textAlign: 'center', backgroundColor: '' }}>
              <Card.Body>
                <Carousel variant="dark">
                  <Carousel.Item interval={1500}>
                    <img
                      className="d-block w-100"
                      src="" 
                      alt="First slide"
                      height={'auto'}
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={500}>
                    <img
                      className="d-block w-100"
                      src=""
                      alt="Second slide"
                    />
                    <Carousel.Caption style={{ color: 'white', marginBottom: '23%' }}>
                      <h3>Lorem ipsum</h3>

                      <NavLink to={'/books'} style={{ color: 'white', textDecoration: 'none' }}>
                        Lorem ipsum
                      </NavLink>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src=""
                      alt="Third slide"
                    />
                    <Carousel.Caption style={{ color: 'white', marginBottom: '23%' }}>
                      <h3>Logged in yet? </h3>
                      <NavLink
                        to={'/books/user'}
                        style={{ color: 'white', textDecoration: 'none' }}
                      >
                        Click here to visit your profile
                      </NavLink>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/books" component={BookList} />
      <Route exact path="/books/add" component={BookAdd} /> 
      <Route exact path="/books/login" component={UserLogIn} />
      <Route exact path="/books/register" component={RegisterUser} />
      <Route exact path="/books/user" component={UserDetails} />
      <Route exact path="/books/:book_id(\d+)" component={BookDetails} />
      <Route exact path="/books/:id(\d+)/edit" component={BookEdit} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
