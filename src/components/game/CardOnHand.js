import React, { PureComponent } from "react";
import { BrowserRouter as Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchGameCards,
  fetchCards,
  setCard,
  getACard
} from "../../actions/game";
import { getUser } from "../../actions/users";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Card, { CardActions, CardContent } from "material-ui/Card";
import "../styles/CardsOnHand.css";
import "../styles/GameButtons.css";
import "../../App.css";

class CardOnHand extends PureComponent {
  componentWillMount() {
    this.props.getUser();
    this.props.fetchCards(Number(this.props.match.params.id));
    this.props.fetchGameCards();
  }

  handleClick = (cardId, gameId) => e => {
    this.props.setCard(cardId, gameId);
  };

  isWinner(userId) {
    if (
      this.props.cards.player1.length === 0 ||
      this.props.cards.player2.length === 0
    ) {
      if (
        (this.props.cards.player1.length === 0) &&
        (Number(this.props.cards.userid_to_player1) === userId)
      ) {
        return (
          <div>
            <h1>Well Done!!</h1>
            <p>You are the winner!</p>
          </div>
        );
      } else if (
        (this.props.cards.player2.length === 0 )&&
        (Number(this.props.cards.userid_to_player2) === userId)
      ) {
        return (
          <div>
            <h1>Well Done!!</h1>
            <p>You are the winner!</p>
          </div>
        );
      } else {
        return (
          <div>
            <h1>You Lost!!</h1>
            <p>You are the loser!</p>
          </div>
        );
      }
    }
  }

  renderActiveCard(cardId) {
    return this.props.gameCards.map(item => {
      if (cardId === item.id) {
        return (
          <img
            key={item.id}
            className="otherCards"
            src={`/cards/${item.value}_of_${item.suits}.png`}
            alt="card"
          />
        );
      }
    });
  }

  handleClickOnStack = gameId => e => {
    this.props.getACard(gameId);
  };

  renderHandCard(cardId, status) {
    let active = this.props.gameCards[this.props.cards.active - 1];
    return this.props.gameCards.map(item => {
      if (cardId === item.id) {
        if (this.validCard(cardId, active)) {
          return (
            <button
              onClick={this.handleClick(
                item.id,
                Number(this.props.match.params.id)
              )}
            >
              <img
                key={item.id}
                className="validCard"
                src={`/cards/${item.value}_of_${item.suits}.png`}
                alt="card"
              />
            </button>
          );
        }
        return (
          <img
            key={item.id}
            className="otherCards"
            src={`/cards/${item.value}_of_${item.suits}.png`}
            alt="card"
          />
        );
      }
    });
  }

  validCard(cardId, active) {
    let hand = this.props.gameCards[cardId - 1];
    if (this.props.users.id == this.props.cards.userid_to_player1) {
      var player = "player1";
    } else if (this.props.users.id == this.props.cards.userid_to_player2) {
      var player = "player2";
    }
    if (
      (hand.value === "jack" ||
        hand.value === active.value ||
        hand.suits === active.suits) &&
      player === this.props.cards.status
    ) {
      console.log("PLAYERRRRR   " + player, this.props.cards.status);
      return true;
    }
  }

  renderBackCards() {
    return (
      <button
        className="cardBack"
        onClick={this.handleClickOnStack(Number(this.props.match.params.id))}
      >
        <img
          className="cardBackImg"
          key={this.props.cards.stack}
          src={`/card_back/${this.props.cards.stack.length}.png`}
          alt="card"
        />
      </button>
    );
  }

  renderPlayerCard(userId) {
    if (!this.props.cards.player1) return;
    console.log(userId, Number(this.props.cards.userid_to_player1));

    if (userId === Number(this.props.cards.userid_to_player1)) {
      return this.props.cards.player1.map(card => {
        return this.renderHandCard(card, "handCard");
      });
    } else if (userId === Number(this.props.cards.userid_to_player2)) {
      return this.props.cards.player2.map(card => {
        return this.renderHandCard(card, "handCard");
      });
    } else return;
  }

  render() {
    return (
      <div>
        <CardContent>
          {this.props.cards.stack && this.renderBackCards()}
          <Paper class="outer-paper">
            <div className="container">
              {this.renderActiveCard(this.props.cards.active)}
            </div>
            <Typography color="textSecondary">
              <p>My cards</p>
              {this.props.users &&
               this.props.cards.player1 &&
               this.isWinner(this.props.users.id)}
              {this.props.users && this.renderPlayerCard(this.props.users.id)}
            </Typography>
            <div>
              <Link to={`/games`}>
                <Button
                  style={{ backgroundColor: "#B22222" }}
                  color="primary"
                  variant="raised"
                  className="button"
                >
                  Go Back
                </Button>
              </Link>
            </div>
          </Paper>
        </CardContent>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    gameCards: state.gameCards,
    games: state.games,
    users: state.users
  };
};

export default connect(mapStateToProps, {
  fetchCards,
  fetchGameCards,
  setCard,
  getUser,
  getACard
})(CardOnHand);
