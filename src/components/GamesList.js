import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './GamesList.css'
import { fetchGames } from '../actions/game'
import {Link} from 'react-router-dom'
import NewGameButton from '../components/NewGameButton'
import { joinGame } from '../actions/game'
import {Redirect} from 'react-router-dom'
import { userId } from '../jwt'

class GamesList extends PureComponent {
    static propTypes = {
      games: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        player1: PropTypes.number,
      })).isRequired
    }

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchGames()
    }
  }

  handleClick = (gameId) => e => {
    this.props.joinGame(gameId)
  }

  render() {
    const { games, userId, authenticated} = this.props
    if (!authenticated) return (
      <Redirect to="/login" />
    )
    return (
      <div className="GamesList">
      <h2>My current games</h2>
        <table>
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Player1</th>
              <th>Player2</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { games.map(game => {
              if (!(Number(game.player2) === userId || Number(game.player1) === userId)) return;
              else return (<tr key={game.id}>
              <td>Game : {game.id}</td>
              <td>{game.player1}</td>
              <td>{game.player2}</td>
              <td><Link to={ `/games/${game.id}` }><button>Start playing</button></Link></td>
            </tr>) }) }
          </tbody>
        </table>
      <h2>All Games</h2>
        <table>
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Enemy</th>
              <th>join</th>
            </tr>
          </thead>
          <tbody>
            { games.map(game => {
              if (game.player2 || Number(game.player1) === userId) return;
              else return (<tr key={game.id}>
              <td>Game : {game.id}</td>
              <td>{game.player1}</td>
              <td><Link to={ `/games/${game.id}` }><button onClick={this.handleClick(game.id)}>JOIN</button></Link></td>
            </tr>) }) }
          </tbody>
  			</table>
        <NewGameButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.currentUser !== null,
    userId : state.currentUser && userId(state.currentUser.jwt),
    currentUser : state.currentUser,
    games: state.games
  }
}

export default connect(mapStateToProps, { fetchGames, joinGame })(GamesList)
