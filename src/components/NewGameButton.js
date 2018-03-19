import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import './NewGameButton.css'
import { createNewGame } from '../actions/game'

class NewGameButton extends PureComponent {

  handleClick = () => {
    console.log(this.props.currentUser)
    this.props.createNewGame(this.props.currentUser.userId)
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

// TODO: This is needed as we will have a user state
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

// replace null with mapStateToProps

export default connect(mapStateToProps, { createNewGame })(NewGameButton)
