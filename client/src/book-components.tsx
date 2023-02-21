import React, { useState } from 'react';
import { Component } from 'react-simplified';
import { Alert, Column } from './widgets';
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap';
import { createHashHistory } from 'history';
import bookService from './book-service';
//@ts-ignore
import StarRatings from 'react-star-ratings';


// REMEMBER TO ADD IMPORTS FROM SERVICE

const history = createHashHistory(); // Use history.push(...) to programmatically change path

function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <StarRatings
        reting={rating}
        starRatedColor="blue"
        changeRating={setRating}
        numberOfStars={5}
        starDimension="30px"
        starSpacing="5px"
      />
    </div>
  );
}



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

export class BookDetails extends Component<{
  /* match: { params: { book_id: number } } */
}> {
  render() {
    return (
      <Container >
        <Row xs={'auto'}>
          <Col>
            <button className="btn btn-light">Back</button>
          </Col>
        </Row>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <h3>Of mice and men</h3>
          </Col>
          <Col sm={3}>
            <StarRating></StarRating>
          </Col>
        </Row>
        <Row>
          <Col sm={3}> 
          
          </Col>
          <Col sm={9}>
            <h5>By John Steinbeck</h5>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg"
              className="img-fluid shadow"
              width={175}
              height={250}
              alt="..."
            />
          </Col>
          <Col sm={9} className="overflow-auto" style={{ height: '40vh' }}>
            <p>
              They are an unlikely pair: George is "small and quick and dark of face"; Lennie, a man
              of tremendous size, has the mind of a young child. Yet they have formed a "family,"
              clinging together in the face of loneliness and alienation. Laborers in California's
              dusty vegetable fields, they hustle work when they can, living a hand-to-mouth
              existence. But George and Lennie have a plan: to own an acre of land and a shack they
              can call their own.
            </p>
            <p>
              While the powerlessness of the laboring class is a recurring theme in Steinbeck's work
              of the late 1930s, he narrowed his focus when composing 'Of Mice and Men' (1937),
              creating an intimate portrait of two men facing a world marked by petty tyranny,
              misunderstanding, jealousy, and callousness. But though the scope is narrow, the theme
              is universal: a friendship and a shared dream that makes an individual's existence
              meaningful
            </p>
            <p>
              A unique perspective on life's hardships, this story has achieved the status of
              timeless classic due to its remarkable success as a novel, a Broadway play, and three
              acclaimed films.
            </p>
          </Col>
          <Row>
            <Col sm={3}>
            </Col>
            <Col sm={1}>
              <p style={{color: 'lightGray'}}> Genres</p>
            </Col>
            <Col sm={1}>
             <a href="#genres">Genre1</a>
            </Col>
            <Col sm={1}>
             <a href="#genres">Genre1</a>
            </Col>
            <Col sm={6}>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col sm={2}>
          <div className="d-grid">
           <button type="button" className='btn btn-primary'>Want to read</button>
          </div>
          </Col>
          <Col sm={1}>
          </Col>
          <Col sm={2}>
            <p> <small>Format:</small></p>
          </Col>
          <Col sm={7}>
            <p> <small>170 pages</small></p>
          </Col>
        </Row>
        <Row>
        <Col sm={3}></Col>
          <Col sm={1}>
            <p> <small>Published:</small></p>
          </Col>
          <Col sm={8}>
            <p> <small>1937, by Covici Friede</small></p>
          </Col>
        </Row>
        <Row>
        <Col sm={3}></Col>
          <Col sm={1}>
            <p> <small>ISBN:</small></p>
          </Col>
          <Col sm={8}>
            <p> <small>9780141023571</small></p>
          </Col>
        </Row>
      </Container>
    );
  }

  mounted() {}
}

export class BookAdd extends Component {
  localvalue = '';
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

  mounted() {}
}
