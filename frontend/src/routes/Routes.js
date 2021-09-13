import React from "react";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import {
    LOGIN,
    SIGNUP,
    NOTE,
    PROFILE,
    UPDATEPROFILE,
    CHANGEPASSWORD
} from "./paths";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Note from "../pages/Note";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={LOGIN} component={Login} />
                <Route exact path={SIGNUP} component={Signup} />
                <ProtectedRoute exact path={NOTE} component={Note} />
                <ProtectedRoute exact path={PROFILE} component={Profile} />
                <ProtectedRoute exact path={UPDATEPROFILE} component={UpdateProfile} />
                <ProtectedRoute exact path={CHANGEPASSWORD} component={ChangePassword} />
            </Switch>
        );
    }
}

export default Routes;
