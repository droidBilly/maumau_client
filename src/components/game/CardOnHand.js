import React, { PureComponent } from "react";
import {BrowserRouter as  Route,  Redirect, Link} from "react-router-dom";
import { connect } from "react-redux";
import { fetchGameCards, fetchCards , setCard } from "../../actions/game";
import { getUser } from "../../actions/users"
import "../../App.css";
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from "material-ui/Typography";
import Card, { CardActions, CardContent } from "material-ui/Card";


class CardOnHand extends PureComponent {

  componentWillMount() {
    this.props.getUser()
    this.props.fetchCards(Number(this.props.match.params.id));
    this.props.fetchGameCards();

  }

  handleClick =(cardId, gameId) => e => {
    this.props.setCard(cardId, gameId)
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
            <button onClick={this.handleClick(item.id, Number(this.props.match.params.id))}>
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
    if (hand.value === 'jack' || hand.value === active.value || hand.suits === active.suits) {
      return true;
    }
  }

  renderPlayerCard(userId) {
    if (!this.props.cards.player1) return;
    console.log(userId, Number(this.props.cards.userid_to_player1))

    if (userId === Number(this.props.cards.userid_to_player1)){
        return (
          this.props.cards.player1.map(card => {
            return this.renderHandCard(card, "handCard");
          })
        )
      }
      else if (userId === Number(this.props.cards.userid_to_player2)) {
        return (
          this.props.cards.player2.map(card => {
            return this.renderHandCard(card, "handCard");
          }))
      }
      else return;
  }



  render() {
    return (

      <div>
      <CardContent>
      <Paper class="outer-paper">
        <div className="container">
          {this.renderActiveCard(this.props.cards.active)}
        </div>
        <Typography color="textSecondary">
          <p>My cards</p>
          { this.props.users &&
           this.renderPlayerCard(this.props.users.id)
         }
        </Typography>
        <div>
          <Link to={`/games`}>
            <Button color="primary"  variant="raised" className="NewGameButton">Go Back</Button>
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

export default connect(mapStateToProps, { fetchCards, fetchGameCards, setCard, getUser })(
  CardOnHand
);