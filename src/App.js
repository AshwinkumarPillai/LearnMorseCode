// import logo from "./logo.svg";
import React from "react";

import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
import Tutorials from "./components/tutorial";
import Level from "./components/level";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/tutorials" component={Tutorials}></Route>
        <Route exact path="/tutorial/:level" component={Level}></Route>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
