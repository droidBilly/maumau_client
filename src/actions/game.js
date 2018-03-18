import * as request from 'superagent'
import { FETCH_CARDS, CREATE_GAME, FETCH_CARD_IDS } from "./types";

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
