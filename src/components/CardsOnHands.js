import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import './CardsOnHands.css'
import { fetchCards } from '../actions/game'
import { fetchGameCards } from '../actions/game'
import { setCard } from '../actions/game'

class CardsOnHands extends PureComponent {

  componentWillMount() {
    this.props.fetchCards(Number(this.props.match.params.id))
    this.props.fetchGameCards()
  }

  handleClick = (cardId, gameId,) => e => {
    this.props.setCard(cardId, gameId)
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
          )
        }
        return (
          <img
            key={item.id}
            className={`card ${status}`}
            src={`/cards/${item.value}_of_${item.suits}.png`}
            alt="card"
          />
        )
      }
    })
  }

  validCard(cardId, active) {
    let hand = this.props.gameCards[cardId-1]
    if (hand.value === active.value || hand.suits === active.suits || hand.value === 'jack') {
      return true
    }
  }

  render() {
    return (
      <div className="CardsOnHands">
      { this.props.cards.cards_on_hand &&
        <img className='stack' scr={`/cards/${this.props.cards.cards_on_hand.length}.png`} alt='stack' />
      }
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
    currentUser: state.currentUser,
    cards : state.cards,
    gameCards: state.gameCards
  }
}

export default connect(mapStateToProps, { fetchCards, fetchGameCards, setCard })(CardsOnHands)
