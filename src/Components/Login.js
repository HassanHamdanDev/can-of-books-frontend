import React from 'react';
import Card from 'react-bootstrap/Card';
import '../Login.css';
import LoginButton from './LoginButton';


class Login extends React.Component {
  
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          {/* TODO: add a `LoginButton` component here that will log the user in */}
          <LoginButton />
        </Card.Body>
      </Card>
    )
  }
}

export default Login;
