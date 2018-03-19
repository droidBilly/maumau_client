import * as request from 'superagent'
import { FETCH_CARDS, CREATE_GAME, FETCH_CARD_IDS, FETCH_GAMES, JOIN_GAME, SET_CARD } from "./types";

const baseUrl = 'http://localhost:4003'

export const fetchGameCards = () => (dispatch) => {
  request
    .get(`${baseUrl}/cards`)
    .then(response => dispatch({
      type: FETCH_CARD_IDS,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const fetchCards = (gameId, userId) => (dispatch) => {
  request
    .get(`${baseUrl}/games/${gameId}/${userId}`)
    .then(response => dispatch({
      type: FETCH_CARDS,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createNewGame = (userId) => (dispatch) => {
  request
    .post(`${baseUrl}/games`)
    .send({userId : userId})
    .then(response => dispatch({
      type: CREATE_GAME,
      payload: response.body
    }))
    .catch(err => alert(err))
  }

  export const fetchGames = () => (dispatch) => {
    request
      .get(`${baseUrl}/games`)
      .then(response => dispatch({
        type: FETCH_GAMES,
        payload: response.body
      }))
      .catch(err => alert(err))
  }

  export const joinGame = (gameId, userId) => (dispatch) => {
    request
      .put(`${baseUrl}/games/${gameId}/join`)
      .send({userId_to_player2 : userId})
      .then(response => dispatch({
        type: JOIN_GAME,
        payload: response.body
      }))
      .catch(err => alert(err))
  }

  export const setCard = (cardId, gameId, userId) => (dispatch) => {
    request
      .put(`${baseUrl}/games/${gameId}`)
      .send({userId : userId})
      .then(response => dispatch({
        type: SET_CARD,
        payload: response.body
      }))
      .catch(err => alert(err))
  }
