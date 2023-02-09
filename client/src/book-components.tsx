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
          <Card.Title style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Example title
          </Card.Title>

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

  search(input: string) {
  }
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
          >
          </Card>
        </Container>
      </>
    );
  }

  mounted() {
  }

}

export class BookAdd extends Component {
  localvalue = ""
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Card
                style={{
                  border: '0',
                  textAlign: 'center',
                  marginTop: '8%',
                }}
              >
                <Card.Title>LOREM IPSUM:</Card.Title>
                <Row>
                  <Form.Control
                    value={1}
                    type="text"
                    placeholder="Name"
                    onChange={(event) => (this.localvalue = event.currentTarget.value)}
                    style={{
                      textAlign: 'center',
                      width: '60%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginBottom: '10px',
                    }}
                  ></Form.Control>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
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

  mounted() {
  }
}
