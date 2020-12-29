import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../actions/auth";

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };

  render() {
    const { auth } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">Logo</Link>
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/settings">Settings</Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedin && <li onClick={this.logOut}>Log out</li>}

              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">SignUp</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);
