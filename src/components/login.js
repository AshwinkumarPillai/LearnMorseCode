import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { withRouter } from "react-router-dom";
import { ProductConsumer } from "../context";
import { backend_url } from "../data";

class login extends Component {
  loggedIn;
  url = backend_url;

  async componentDidMount() {
    let user = await localStorage.getItem("user");
    if (user) this.props.history.push("/");
  }

  login = async (e) => {
    e.preventDefault();
    let pwdInp = e.target[1];
    let emailInp = document.getElementById("logemail");
    let logBtn = document.querySelector(".login-button");
    logBtn.disabled = true;
    let pwd = pwdInp.value;
    let email = emailInp.value;

    if (!pwd || !email) {
      alert("Please fill all details to login");
      logBtn.disabled = false;
      return;
    }
    let data = { email, pwd };
    pwdInp.value = "";
    emailInp.value = "";
    try {
      let val = await fetch(this.url + "login", {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      let content = await val.json();
      if (content.status === 200) {
        await localStorage.setItem("user", JSON.stringify(content.details));
        logBtn.disabled = false;
        alert("Logged in Successfully");
        this.loggedIn();
        this.props.history.push("/tutorials");
      } else if (content.status === 404) {
        logBtn.disabled = false;
        alert(content.message);
      } else {
        if (content.status === 500) console.log("server error");
        logBtn.disabled = false;
        alert("There was some error while trying to login.\nPlease try again");
      }
    } catch (error) {
      // console.log(error);
      logBtn.disabled = false;
      alert("There was some error while trying to login.\nPlease try again");
    }
  };

  render() {
    return (
      <ProductConsumer>
        {(val) => {
          this.loggedIn = val.loggedIn;
          return (
            <React.Fragment>
              <form action="" onSubmit={this.login} className="loginForm">
                <div className="login">
                  <div className="login-header">
                    <h1>Login</h1>
                  </div>
                  <div className="login-form">
                    <h3>Email: </h3>
                    <input type="email" placeholder="someone@something.com" id="logemail" />
                    <br />
                    <h3>Password:</h3>
                    <input type="password" placeholder="Password" id="logpwd" autoComplete="on" />
                    <br />
                    <button type="submit" className="login-button">
                      Login
                    </button>
                    <br />
                    <div>
                      Don't have an account? Create an account
                      <Link to="/register" style={{ color: "#f1c40f", textDecoration: "underline" }}>
                        here
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </React.Fragment>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default withRouter(login);
