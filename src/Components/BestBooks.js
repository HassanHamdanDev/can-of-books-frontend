import React from 'react';
import axios from 'axios';
import { Carousel, Card, Button } from 'react-bootstrap';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book: {}
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  componentDidMount = () => {
    axios.get(`https://can-of-books-hassan.herokuapp.com/books`).then(res => {
      this.setState({
        books: res.data,
      });
    })
    console.log(this.state.books);
  }
  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <br />
        <br />
        {this.state.books.length > 0 ? (<Carousel >
          {
            this.state.books.map((elem, index) => {

              return <Card key={index} style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Title :{elem.title}</Card.Title>
                  <Card.Text>Description :{elem.description}</Card.Text>
                  <Card.Text>Status :{elem.status}</Card.Text>
                  <Card.Text>email :{elem.email}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            })
          }
        </Carousel>)
          : (<h4>No Books Found</h4>)
        }

      </>
    )
  }
}

export default BestBooks;
