import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`).then(res => {
      this.setState({
        books: res.data,
      });
    })
  }
  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (<Carousel >
          {
            this.state.books.map((elem) => {
              return <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="holder.js/800x400?text=First slide&bg=373940"
                  alt="First slide"
                />
                <Carousel.Caption className="color">
                  <h3 >Book Title :{elem.title}</h3>
                  <h4 >Description :{elem.description}</h4>
                  <h4 >Status :{elem.status}</h4>
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
