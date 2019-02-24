import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import GamesList from "./components/game/GamesList";
import CardOnHand from "./components/game/CardOnHand";
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import createBrowserHistory from 'history/createBrowserHistory'
import NavBar from './components/game/NavBar'

export const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router>

        <div className="App">
          <NavBar />
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
