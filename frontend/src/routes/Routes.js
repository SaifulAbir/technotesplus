import React from "react";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import {
    LOGIN,
    SIGNUP,
    NOTE,
} from "./paths";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={SIGNUP} component={Signup} />
      </Switch>
    );
  }
}

export default Routes;
