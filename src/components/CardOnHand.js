import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchCards } from "../actions/game";
import { fetchGameCards } from "../actions/game";
import "../App.css";

class CardOnHand extends PureComponent {


  findPic(cardId) {
    return this.props.gameCards.map((item, index) => {
      if (cardId === item.id) {
        return (
          <img
            key={item}
            src={`/cards/${item.value}_of_${item.suits}.png`}
            alt="something"
          />
        );
      }
    });
  }

  componentWillMount() {

    this.props.fetchCards(Number(this.props.match.params.id), 1);
    this.props.fetchGameCards()

  }

  renderCards() {
    return this.findPic(this.props.cards.active)
  }


  render() {
    return (
      <div>
        {console.log('CARDS   ' + this.props.cards.active)}
        <div className="container">
          {this.renderCards()}
        </div>
        <div className="handCards">
        <p >My cards</p>
        {this.props.cards.player1 && this.props.cards.player1.map( item => {
          return this.findPic(item)
        })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    gameCards: state.gameCards,
    games: state.games
  };
};

export default connect(mapStateToProps, { fetchCards, fetchGameCards })(
  CardOnHand
);
