import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { createNewGame } from "../../actions/game";

class NewGameButton extends PureComponent {
  handleClick = () => {
    this.props.createNewGame();
  };

  render() {
    return (
      <div>
        <button className="NewGameButton" onClick={this.handleClick}>
          Create Game
        </button>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    newGame: state.newGame,
    games: state.games
  };
};


export default connect(mapStateToProps, { createNewGame })(NewGameButton);
