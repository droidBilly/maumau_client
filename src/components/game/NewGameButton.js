import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { createNewGame } from "../../actions/game";
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

class NewGameButton extends PureComponent {
  handleClick = () => {
    this.props.createNewGame();
  };

  render() {
    return (
      <div>
        <Paper class="outer-paper">
          <Button
            color="primary"
            variant="raised"
            className="NewGameButton"
            onClick={this.handleClick}>
            Create Game
          </Button>
        </Paper>
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
