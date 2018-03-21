import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { createNewGame } from "../actions/game";



class NewGameButton extends PureComponent {

  handleClick = () => {
    //Theoretical this will take -> this.props.user.id
    this.props.createNewGame();


  };


  render() {
    return (
      <div>
        <button className="NewGameButton" onClick={this.handleClick}>
          New Game
        </button>
      </div>
    );
  }
}

// This is needed as we will have a user state
const mapStateToProps = state => {
  return {
    newGame: state.newGame,
    games: state.games
  };
};

// replace null with mapStateToProps
export default connect(mapStateToProps, { createNewGame })(NewGameButton);
