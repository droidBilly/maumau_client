import React, { Component } from "react";
import "./App.css";
import Game from "./containers/game";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import GamesList from "./components/GamesList";
import CardOnHand from "./components/CardOnHand";
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1 className="App-title">MAU MAU</h1>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/games" component={GamesList} />
          <Route exact path="/games/:id" component={CardOnHand} />
          <Route exact path="/" render={() => <Redirect to="/games" />} />
        </div>
      </Router>
    );
  }
}

export default App;
