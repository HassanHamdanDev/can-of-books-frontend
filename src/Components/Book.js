import React, { Component } from 'react'
import { Card, Button, Col } from 'react-bootstrap';

class Book extends Component {
    render() {
        return (
            <>

                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Title : {this.props.title}</Card.Title>
                            <Card.Text>Description : <br /> {this.props.description}</Card.Text>
                            <Card.Text>Status : {this.props.status}</Card.Text>
                            <Card.Text>email : {this.props.email}</Card.Text>
                            <Button onClick={() => this.props.handleDeleteBook(this.props.bookId)} variant="danger">Delete</Button> <Button onClick={() => this.props.handleUpdate(this.props.bookId, this.props.title, this.props.description, this.props.status, this.props.email)} variant="info">Update</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        )
    }
}

export default Book
