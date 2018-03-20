import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCards } from "../actions/game";
import { fetchGameCards } from "../actions/game";
import { renderActiveCard, renderHandCard, validCard } from '../lib/game'
import "../App.css";

class CardOnHand extends PureComponent {
  componentWillMount() {
    this.props.fetchCards(Number(this.props.match.params.id), 1);
    this.props.fetchGameCards();
  }

  renderActiveCard(cardId) {
    return this.props.gameCards.map(item => {
      if (cardId === item.id) {
        return (
          <img
            key={item.id}
            className={`card activeCard`}
            src={`/cards/${item.value}_of_${item.suits}.png`}
            alt="card"
          />
        );
      }
    });
  }

  renderHandCard(cardId, status) {
    let active = this.props.gameCards[this.props.cards.active - 1];
    return this.props.gameCards.map(item => {
      if (cardId === item.id) {
        if (this.validCard(cardId, active)) {
          return (
            <button>
              <img
                key={item.id}
                className={`card ${status}`}
                src={`/cards/${item.value}_of_${item.suits}.png`}
                alt="card"
              />
            </button>
          );
        }
        return (
          <img
            key={item.id}
            className={`card ${status}`}
            src={`/cards/${item.value}_of_${item.suits}.png`}
            alt="card"
          />
        );
      }
    });
  }

  validCard(cardId, active) {
    let hand = this.props.gameCards[cardId - 1];
    if (hand.value === active.value || hand.suits === active.suits) {
      return true;
    }
  }


  render() {
    return (
      <div>
        <div className="container">
          {this.renderActiveCard(this.props.cards.active)}
        </div>
        <div className="handCards">
          <p>My cards</p>
          {this.props.cards.player1 &&
          this.props.cards.player1.map(card => {
              return this.renderHandCard(card, "handCard");
            })} {this.props.cards.player2 &&
              this.props.cards.player2.map(card => {
                  return this.renderHandCard(card, "handCard");
                })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    gameCards: state.gameCards,
    games: state.games
  };
};

export default connect(mapStateToProps, { fetchCards, fetchGameCards })(
  CardOnHand
);
