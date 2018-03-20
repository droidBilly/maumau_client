import * as request from 'superagent'
import {baseUrl} from '../constants'



export const FETCH_CARDS_ID = 'FETCH_CARDS_ID'
export const CREATE_GAME = "CREATE_GAME"
export const FETCH_CARDS = "FETCH_CARDS"
export const FETCH_GAMES = "FETCH_GAMES"
export const JOIN_GAME = "JOIN_GAME"


export const fetchGameCards = (cards) => (dispatch) => {

  request
    .get(`${baseUrl}/cards`)
    .then(response => dispatch({
      type: FETCH_CARDS_ID,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const fetchCards = (gameId, userId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: FETCH_CARDS,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const fetchGames = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt


  request
    .get(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: FETCH_GAMES,
      payload: response.body
    }))
    .catch(err => alert(err))
}


export const createGame = (userId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(userId)
    .then(response => dispatch({
      type: CREATE_GAME,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createNewGame = (userId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt



  request
    .post(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({userId : userId})
    .then(response => dispatch({
      type: CREATE_GAME,
      payload: response.body
    }))
    .catch(err => alert(err))
  }

  export const joinGame = (gameId) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
      .put(`${baseUrl}/games/${gameId}/join`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(response => dispatch({
        type: JOIN_GAME,
        payload: response.body
      }))
      .catch(err => alert(err))
  }
