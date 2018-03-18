import React, { PureComponent } from 'react';
import './game.css';
import {connect} from 'react-redux'
import CardsOnHands from '../components/CardsOnHands'
import NewGameButton from '../components/NewGameButton'

class Game extends PureComponent {
  render() {
    return (
      <div className="container">

        <CardsOnHands />
        <NewGameButton />

      </div>
    );
  }
}

export default Game;
