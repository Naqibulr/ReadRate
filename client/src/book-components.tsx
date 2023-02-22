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

function StarRating( props: { rating: number }) {
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
  match: {
    title: string; 
    params: { book_id: number, title: string } 
}
}> {
  render() {
    
    

    return (
      <Container className='p-3' >
        <Row xs={'auto'}>
            <Button className="btn btn-light">Back</Button>
        </Row>
        <Row>
        
          <Col sm={3} className= "pt-4 " > 
            <Row className='m-3'><img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg"
              className="img-fluid shadow "
              width={175}
              height={250}
              alt="..."
            /></Row>
            <Row className='m-3 '><Button type="button" className='btn btn-success mt-3'>Want to read</Button>
            </Row>
            <Row className='m-3 '><Button type="button" className='btn btn-success mt-3'>Have read</Button>
            </Row>
          </Col>
          <Col sm={8} >
            <Row className='mt-3'><h3>{this.props.match.title} Of mice and men</h3></Row>
            <Row className='mt-1'><h5>By John Steinbeck</h5></Row>
            <Row className='mt-1'><StarRating rating={5}></StarRating></Row>
            <Row className="overflow-auto mt-4" style={{ height: '40vh' }}><p>
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
            </Row>
            <Row className='mt-3'>
              <Col sm={1} style={{ fontWeight: 'bold', color:"rgb(77, 77, 77)" }}><p> Genres:</p></Col>
              <Col sm={1} ><a href="#genres">Tragedy</a></Col>
              <Col sm={1}>
                <a href="#genres">Novel</a>
              </Col>
            </Row>
            <Row>
              <Col sm={1}>
                <small style={{ fontWeight: 'bold', color:"rgb(77, 77, 77)" }}>Pages:</small>
              </Col>
              <Col sm={8}>
                <small>170 </small>
              </Col>
            </Row>
            <Row>
              <Col sm={1}>
                <small style={{ fontWeight: 'bold', color:"rgb(77, 77, 77)" }}>Published:    </small>
              </Col>
              <Col sm={8}>
                <small>1937, by Covici Friede</small>
              </Col>
            </Row>
            <Row><Col sm={1}>
            <small style={{ fontWeight: 'bold', color:"rgb(77, 77, 77)" }}>ISBN:</small>
            </Col>
            <Col sm={8}>
               <small>9780141023571</small>
            </Col></Row>
            

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
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control type="text" placeholder="Enter ISBN" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter author name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="releaseYear">
                <Form.Label>Release year</Form.Label>
                <Form.Control type="text" placeholder="Enter Release year" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="publisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control type="text" placeholder="Enter publisher name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="pages">
                <Form.Label>Number of pages</Form.Label>
                <Form.Control type="text" placeholder="Enter number of pages" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" as="textarea" placeholder="Enter description" rows={1} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Upload image" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label>Choose Genre</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check inline type="checkbox" label="Fantasy" />
              <Form.Check inline type="checkbox" label="Humour" />
              <Form.Check inline type="checkbox" label="History" />
              <Form.Check inline type="checkbox" label="Novel" />
              <Form.Check inline type="checkbox" label="Children's" />
              <Form.Check inline type="checkbox" label="Crime" />
              <Form.Check inline type="checkbox" label="Drama" />
              <Form.Check inline type="checkbox" label="Horror" />
              <Form.Check inline type="checkbox" label="Poetry" />
              <Form.Check inline type="checkbox" label="Science" />
            </Form.Group>
          </Row>
          <Row>
            <Button
              variant="lg bg-success"
              type="submit"
              style={{
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
