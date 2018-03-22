import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import './NewGameButton.css'
import { createNewGame } from '../actions/game'
import { Redirect } from 'react-router-dom'

class NewGameButton extends PureComponent {

  handleClick = () => {
    this.props.createNewGame()
  }

  render() {
    const { classes } = this.props;
    return (
      <button className="NewGameButton" onClick={this.handleClick}>
        New Game
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    newGame: state.newGame
  }
}

export default connect(mapStateToProps, { createNewGame })(NewGameButton)
