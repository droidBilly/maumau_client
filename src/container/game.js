import React, { PureComponent } from 'react';
import './game.css';
import {connect} from 'react-redux'
import CardsOnHands from '../components/CardsOnHands'

class Game extends PureComponent {
  render() {
    return (
      <div className="container">

        <CardsOnHands />

      </div>
    );
  }
}

export default Game;
