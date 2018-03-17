import React, { PureComponent } from "react";
import CardOnHand from '../components/CardOnHand'


class Game extends PureComponent {
  render() {
    return (
      <div className="container">
        <CardOnHand />
      </div>
    );
  }
}

export default Game;
