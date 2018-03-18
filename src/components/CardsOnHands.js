import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import './CardsOnHands.css'
import { fetchCards } from '../actions/game'
import { fetchGameCards } from '../actions/game'

class CardsOnHands extends PureComponent {

  componentWillMount() {
    this.props.fetchCards(Number(this.props.match.params.id),1)
    this.props.fetchGameCards()
  }

  renderActiveCard(cardId) {
    return this.props.gameCards.map(item => {
      if (cardId === item.id) {
        return (<img key={item.id} className={`card activeCard`} src={`/cards/${item.value}_of_${item.suits}.png`} alt="card"/>)
      }
    })
  }

  renderHandCard(cardId, status) {
    let active = this.props.gameCards[this.props.cards.active-1]
    return this.props.gameCards.map(item => {
      if (cardId === item.id) {
        if (this.validCard(cardId, active) === 'YIPPIE') {
          return (<button><img key={item.id} className={`card ${status}`} src={`/cards/${item.value}_of_${item.suits}.png`} alt="card"/></button>)
        }
        return (<img key={item.id} className={`card ${status}`} src={`/cards/${item.value}_of_${item.suits}.png`} alt="card"/>)
      }
    })
  }

  validCard(cardId, active) {
    let hand = this.props.gameCards[cardId-1]
    if (hand.value === active.value || hand.suits === active.suits) {
      return 'YIPPIE'
    }
  }

  render() {
    return (
      <div className="CardsOnHands">
      {this.renderActiveCard(this.props.cards.active)}
      <p>Handcards</p>
      { this.props.cards.cards_on_hand &&
          this.props.cards.cards_on_hand.map(card => {
            return this.renderHandCard(card, 'handCard')
          })
      }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    cards : state.cards,
    gameCards: state.gameCards
  }
}

export default connect(mapStateToProps, { fetchCards, fetchGameCards })(CardsOnHands)
