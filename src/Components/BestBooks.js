import React from 'react';
import axios from 'axios';
import { Col, Row, Form, Button, Container, Modal } from 'react-bootstrap';
import Book from './Book';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book: {},
      title: "",
      description: "",
      status: "",
      email: "",
      id: "",
      isOpen: false
    }
  }


  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  componentDidMount = () => {
    axios.get(`https://can-of-books-hassan.herokuapp.com/books`).then(res => {
      this.setState({
        books: res.data,
      });
    })
  }
  handleTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }
  handleDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }
  handleStatus = (event) => {
    this.setState({
      status: event.target.value
    })
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handleCreateSubmit = (event) => {
    event.preventDefault();
    let config = {
      method: "POST",
      baseURL: `https://can-of-books-hassan.herokuapp.com/books`,
      data: {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        email: this.state.email
      }
    };
    axios(config).then(response => {
      this.setState({
        books: response.data
      });
    });
    window.location.reload();
  }
  handleDeleteBook = (id) => {
    let config = {
      method: "DELETE",
      baseURL: `https://can-of-books-hassan.herokuapp.com/books/${id}`
    };
    axios(config).then(response => {
      this.setState({
        books: response.data
      });
    });
  }
  handleUpdate = (id, title, description, status, email) => {
    this.setState({
      id: id,
      title: title,
      description: description,
      status: status,
      email: email,
      isOpen: true
    })
  }
  handleUpdateSubmit = (id) => {
    let config = {
      method: "PUT",
      baseURL: `https://can-of-books-hassan.herokuapp.com/books/${id}`,
      data: {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        email: this.state.email
      }
    };
    axios(config).then(response => {
      this.setState({
        books: response.data,
        isOpen: false
      });
    });
    window.location.reload();
  }
  render() {
    /* TODO: render user's books in a Carousel */
    return (
      <Container>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <br />
        <Modal
          show={this.state.isOpen}
          onHide={this.closeModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <Form.FloatingLabel>Create New Book</Form.FloatingLabel>
              <Row>
                <Col>
                  <Form.Control value={this.state.title} onChange={this.handleTitle} />
                </Col>
                <Col>
                  <Form.Control value={this.state.description} onChange={this.handleDescription} />
                </Col>
                <Col>
                  <Form.Control value={this.state.status} onChange={this.handleStatus} />
                </Col>
                <Col>
                  <Form.Control value={this.state.email} onChange={this.handleEmail} />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button onClick={() => this.handleUpdateSubmit(this.state.id)} variant="primary">Update</Button>
          </Modal.Footer>
        </Modal>
        <br />
        <Form onSubmit={this.handleCreateSubmit}>
          <Form.FloatingLabel>Create New Book</Form.FloatingLabel>
          <Row>
            <Col>
              <Form.Control placeholder="title" onChange={this.handleTitle} />
            </Col>
            <Col>
              <Form.Control placeholder="description" onChange={this.handleDescription} />
            </Col>
            <Col>
              <Form.Control placeholder="status" onChange={this.handleStatus} />
            </Col>
            <Col>
              <Form.Control placeholder="email" onChange={this.handleEmail} />
            </Col>
            <Col>
              <Button type="submit" variant="success">Create A Book</Button>
            </Col>
          </Row>
        </Form>
        <br />
        {this.state.books.length > 0 ? (<Row xs={1} md={4} className="g-3">
          {
            this.state.books.map((elem, index) => {
              return <Book
                key={index}
                title={elem.title}
                description={elem.description}
                status={elem.status}
                email={elem.email}
                bookId={elem._id}
                openModal={this.openModal}
                handleDeleteBook={this.handleDeleteBook}
                handleUpdate={this.handleUpdate}
                handleEmail={this.handleEmail}
                handleStatus={this.handleStatus}
                handleDescription={this.handleDescription}
                handleTitle={this.handleTitle}
              />
            })
          }
        </Row>)
          : (<h4>No Books Found</h4>)
        }
      </Container>
    )
  }
}

export default BestBooks;
