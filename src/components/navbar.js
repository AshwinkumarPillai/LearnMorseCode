import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { withRouter } from "react-router-dom";
import { ProductConsumer } from "../context";
import { NavLink } from "react-router-dom";

class navbar extends Component {
  loggedOut;

  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem("user"));
    this.state = { user };
  }

  logout = () => {
    localStorage.clear();
    this.setState({ user: null });
    this.loggedOut();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="navbar">
        <span>
          <NavLink exact activeClassName="active_nav" className="nav_link" style={{ textDecoration: "none", color: "#40407a" }} to="/">
            <i className="fas fa-home"></i> Home
          </NavLink>
        </span>
        <span>
          <NavLink
            exact
            activeClassName="active_nav"
            className="nav_link"
            style={{ textDecoration: "none", color: "#40407a" }}
            to="/tutorials"
          >
            <i className="fas fa-user-graduate"></i> Tutorials
          </NavLink>
        </span>
        <span>
          <ProductConsumer>
            {(val) => {
              this.loggedOut = val.loggedOut;
              let user = val.user;
              return !user ? (
                <div className="login_container">
                  <NavLink
                    exact
                    activeClassName="active_nav"
                    className="nav_link"
                    style={{ textDecoration: "none", color: "#2980b9" }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                  &nbsp;|&nbsp;
                  <NavLink
                    exact
                    activeClassName="active_nav"
                    className="nav_link"
                    style={{ textDecoration: "none", color: "#2980b9" }}
                    to="/register"
                  >
                    Sign Up
                  </NavLink>
                </div>
              ) : (
                <div className="nav_link" style={{ textDecoration: "none", color: "red" }} onClick={this.logout}>
                  Logout
                </div>
              );
            }}
          </ProductConsumer>
        </span>
      </div>
    );
  }
}

export default withRouter(navbar);
