import React, { Component } from 'react';
import './App.css';
import Game from './container/game'
import GamesList from './components/GamesList'
import CardsOnHands from './components/CardsOnHands'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        { }
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/games" component={GamesList} />
        <Route exact path="/games/:id" component={CardsOnHands} />
        <Route exact path="/" render={ () => <Redirect to="/games" /> } />
        </div>
      </Router>
    );
  }
}

export default App;
