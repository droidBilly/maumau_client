import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './GamesList.css'
import { fetchGames } from '../actions/game'
import {Link} from 'react-router-dom'
import NewGameButton from '../components/NewGameButton'
import { joinGame } from '../actions/game'

class GamesList extends PureComponent {
    static propTypes = {
      games: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        player1: PropTypes.number,
      })).isRequired
    }

  componentWillMount() {
    this.props.fetchGames()
  }

  handleClick = (gameId) => e => {
    this.props.joinGame(gameId, this.props.currentUser.userId)
  }

  render() {
    return (
      <div className="GamesList">
      <h1>All Games</h1>
        <table>
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Enemy</th>
              <th>join</th>


            </tr>
          </thead>
          <tbody>
            { this.props.games.map(game => (<tr key={game.id}>
              <td>Game : {game.id}</td>
              <td>{game.player1}</td>
              <td><Link to={ `/games/${game.id}` }><button onClick={this.handleClick(game.id)}>JOIN</button></Link></td>
            </tr>)) }
          </tbody>
  			</table>
        <NewGameButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser : state.currentUser,
    games: state.games
  }
}

export default connect(mapStateToProps, { fetchGames, joinGame })(GamesList)
