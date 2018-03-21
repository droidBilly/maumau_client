import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchGames, joinGame} from "../actions/game";
import { getUser } from '../actions/users'
import { Link } from "react-router-dom";
import NewGameButton from "./NewGameButton";
import { Redirect } from "react-router-dom";
import { userId } from "../jwt";
import UserInfo from './UserInfo'

class GamesList extends PureComponent {
  componentWillMount() {
   if (this.props.authenticated) {
    this.props.fetchGames();
    this.props.getUser()
   }
  }

  handleClick = gameId => e => {
    this.props.joinGame(gameId);
  };

  render() {
    const { games, users, authenticated, userId } = this.props;

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    return (
      <div>
        <h1>Available games</h1>
        <table>
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Player 1</th>
              <th>Player 2</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => {
              if (Number(game.player2) || Number(game.player1) === this.props.userId)
                return ;
              else
                return (
                  <tr key={game.id}>
                    <td>Game {game.id}</td>
                    <td>{game.player1}</td>
                    <td>{game.player2}</td>
                    <td>
                      <Link to={`/games/${game.id}`}>
                        <button onClick={this.handleClick(game.id)}>
                          Join
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
        <div>
          <h1>Your games</h1>
          <table>
            <thead>
              <tr>
                <th>Game Id</th>
                <th>Player 1</th>
                <th>Player 2</th>
              </tr>
            </thead>
            <tbody>
              {games.map(game => {
                if (
                  userId === Number(game.player1) ||
                  userId === Number(game.player2)
                ) {
                  return (
                    <tr key={game.id}>
                      <td>Game {game.id}</td>
                      <td>{game.player1}</td>
                      <td>{game.player2}</td>
                      <td>
                        <Link to={`/games/${game.id}`}>
                          <button >
                            Start game
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <NewGameButton />
        <Link to={`/logout`}>
          <button >
            Logout
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    authenticated: state.currentUser !== null,
    user: state.users,
    games: state.games,
    users: state.currentUser,
    userId: state.currentUser && userId(state.currentUser.jwt)
  };
};

export default connect(mapStateToProps, { fetchGames, joinGame, getUser })(GamesList);
