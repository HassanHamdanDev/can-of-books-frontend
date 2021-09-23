import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import BestBooks from './Components/BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Profile from './Components/Profile';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(res => {
          const jwt = res.__raw;
          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/auth'
          }
          axios(config)
            .then(result => console.log(result.data))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    } else {
      console.log("user is not authenticated")
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <>

        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {
                this.props.auth0.isAuthenticated && <BestBooks />
              }
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
