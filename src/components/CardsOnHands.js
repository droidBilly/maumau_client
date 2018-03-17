import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import './CardsOnHands.css'
import { fetchCards } from '../actions/game'
import { fetchGameCards } from '../actions/game'

class CardsOnHands extends PureComponent {

  componentWillMount() {
    this.props.fetchCards(5,1)
    this.props.fetchGameCards()
  }

  findPic(cardId, status) {
    return this.props.gameCards.map(item => {
      if (cardId === item.id) {
        return (<img className={`${status}`} src={`cards/${item.value}_of_${item.suits}.png`} alt="card"/>)
      }
    })
  }

  getHandCards(gameCards) {
    gameCards.map(card => {

    })
  }

  render() {
    return (
      <div className="CardsOnHands">
      {this.findPic(this.props.cards.active, 'activeCard')}
      <p>Handcards</p>
      { this.props.cards.cards_on_hand &&
          this.props.cards.cards_on_hand.map(card => {
            return this.findPic(card, 'handCard')
          })
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards : state.cards,
    gameCards: state.gameCards
  }
}

export default connect(mapStateToProps, { fetchCards, fetchGameCards })(CardsOnHands)
