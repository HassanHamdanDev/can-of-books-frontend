import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';


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
    axios.get(`${process.env.HEROKU_URL}/books`).then(res => {
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

              return <Carousel.Item key={index}>
                <Carousel.Caption className="color">
                  <h3 >Book Title :{elem.title}</h3>
                  <h4 >Description :{elem.description}</h4>
                  <h4 >Status :{elem.status}</h4>
                  <h4 >email :{elem.email}</h4>
                </Carousel.Caption>
              </Carousel.Item>
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
