import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchGames, joinGame } from '../actions/game'
import {Link} from 'react-router-dom'
import NewGameButton from './NewGameButton'



class GamesList extends PureComponent {



  componentWillMount() {
    this.props.fetchGames()
  }

  handleClick = (gameId) => (e) => {
    this.props.joinGame(gameId, 2)

  }

    render() {
      const { games } = this.props;
        return (
          <div>
           <h1>All games</h1>
           <table>
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Player</th>
            </tr>
          </thead>
          <tbody>
           { games.map(game => (<tr key={game.gameId}>
             <td>Game {game.gameId}</td>
             <td>{game.player1}</td>
             <td>
             <Link to={`/games/${game.gameId}`}><button onClick={this.handleClick(game.gameId)}>Join</button></ Link>
             </td>
           </tr>)) }
         </tbody>
       </table>
       <NewGameButton />
     </div>
   )
 }
}

const mapStateToProps = function(state) {
  return {
    games: state.games
  };
};



export default connect(mapStateToProps, { fetchGames, joinGame })(GamesList)
