import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { withRouter } from "react-router-dom";
import { ProductConsumer } from "../context";
import { backend_url } from "../data";

class register extends Component {
  loggedIn;
  url = backend_url;

  async componentDidMount() {
    let user = await localStorage.getItem("user");
    if (user) this.props.history.push("/");
  }

  register = async (e) => {
    let load_backdrop = document.getElementById("load_backdrop");
    load_backdrop.style.display = "flex";
    e.preventDefault();
    let pwdInp = document.getElementById("regpwd");
    let emailInp = document.getElementById("regemail");
    let nameInp = document.getElementById("uname");
    let regBtn = document.querySelector(".register-button");
    regBtn.disabled = true;
    let pwd = pwdInp.value;
    let email = emailInp.value;
    let name = nameInp.value;
    if (!pwd || !email || !name) {
      load_backdrop.style.display = "none";
      alert("Please fill all details to complete registration");
      regBtn.disabled = false;
      return;
    }
    let data = { name, email, pwd };
    pwdInp.value = "";
    emailInp.value = "";
    nameInp.value = "";
    try {
      let val = await fetch(this.url + "register", {
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
        regBtn.disabled = false;
        load_backdrop.style.display = "none";
        alert("Account Created Successfully");
        this.loggedIn();
        this.props.history.push("/tutorials");
      } else {
        regBtn.disabled = false;
        load_backdrop.style.display = "none";
        alert("There was some error during registration.\nPlease try again");
      }
    } catch (error) {
      // console.log(error);
      regBtn.disabled = false;
      load_backdrop.style.display = "none";
      alert("There was some error during registration.\nPlease try again");
    }
  };
  render() {
    return (
      <ProductConsumer>
        {(val) => {
          this.loggedIn = val.loggedIn;
          return (
            <React.Fragment>
              <div className="loading_backdrop" id="load_backdrop">
                <h1 className="text-center reg_loading">
                  Creating account
                  <span className="reg_load_dot">.</span>
                  <span className="reg_load_dot">.</span>
                  <span className="reg_load_dot">.</span>
                </h1>
              </div>
              <form action="" onSubmit={this.register} className="regForm">
                <div className="register">
                  <div className="register-header">
                    <h1>Create Account</h1>
                  </div>
                  <div className="register-form">
                    <h3>Username:</h3>
                    <input type="text" placeholder="Name" id="uname" />
                    <br />
                    <h3>Email: </h3>
                    <input type="email" placeholder="someone@something.com" id="regemail" />
                    <br />
                    <h3>Password:</h3>
                    <input type="password" placeholder="Password" id="regpwd" autoComplete="on" />
                    <br />
                    <button type="submit" className="register-button">
                      Create Account
                    </button>
                    <br />
                    <div>
                      Already have an account? Login
                      <Link to="/login" style={{ color: "#f1c40f", textDecoration: "underline" }}>
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

export default withRouter(register);
