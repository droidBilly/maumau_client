import React, { Component } from 'react';
import './App.css';
import Game from './containers/game'

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">MAU MAU</h1>
          <Game />
      </div>
    );
  }
}

export default App;
