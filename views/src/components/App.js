import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Navbar, Signup, Login } from "./";
import * as jwtDecode from "jwt-decode";
import { authenticateUser } from "../actions/auth";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode(token);

      console.log("user", user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
