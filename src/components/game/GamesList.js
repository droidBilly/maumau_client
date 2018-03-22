import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchGames, joinGame } from "../../actions/game";
import { getUser } from "../../actions/users";
import { Link } from "react-router-dom";
import NewGameButton from "./NewGameButton";
import { Redirect } from "react-router-dom";
import { userId } from "../../jwt";
import UserInfo from "./UserInfo";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import "../styles/GameList.css";

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchGames();
      this.props.getUser();
    }
  }

  handleClick = gameId => e => {
    this.props.joinGame(gameId);
  };

  render() {
    const { games, users, authenticated, userId } = this.props;

    if (!authenticated) return <Redirect to="/login" />;

    return (
      <div>
        <div>
          <Card key={games.id} className="game-card">
            <CardContent>
              <Typography variant="headline" component="h2">
                Available games
              </Typography>

              <Typography color="textSecondary">
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
                        Number(game.player2) ||
                        Number(game.player1) === this.props.userId
                      )
                        return;
                      else
                        return (
                          <tr key={game.id}>
                            <td>Game {game.id}</td>
                            <td>{game.player1}</td>
                            <td>
                              <CardActions>
                                <Link to={`/games/${game.id}`}>
                                  <Button
                                    size="small"
                                    onClick={this.handleClick(game.id)}
                                  >
                                    Join Game
                                  </Button>
                                </Link>
                              </CardActions>
                            </td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card key={games.id} className="game-card">
            <CardContent>
              <Typography variant="headline" component="h2">
                Your games
              </Typography>
              <Typography color="textSecondary">
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
                            <CardActions>
                              <td>
                                <Link to={`/games/${game.id}`}>
                                  <Button size="small">Start game</Button>
                                </Link>
                              </td>
                            </CardActions>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </Typography>

              <NewGameButton />
            </CardContent>
          </Card>
        </div>
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

export default connect(mapStateToProps, { fetchGames, joinGame, getUser })(
  GamesList
);
