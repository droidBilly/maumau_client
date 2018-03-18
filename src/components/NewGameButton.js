import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import './NewGameButton.css'
import { createNewGame } from '../actions/game'

class NewGameButton extends PureComponent {

  handleClick = () => {
    //Theoretical this will take -> this.props.user.id
    this.props.createNewGame(1)
  }

  render() {
    return (
      <button className="NewGameButton" onClick={this.handleClick}>
        New Game
      </button>
    );
  }
}

// This is needed as we will have a user state
// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

// replace null with mapStateToProps
export default connect(null, { createNewGame })(NewGameButton)
