import * as request from 'superagent'

const baseUrl = 'http://localhost:4003'

export const FETCH_CARDS_ID = 'FETCH_CARDS_ID'
export const CREATE_GAME = "CREATE_GAME"
export const FETCH_CARDS = "FETCH_CARDS"

export const fetchGameCards = (cards) => (dispatch) => {
  request
    .get(`${baseUrl}/cards`)
    .then(response => dispatch({
      type: FETCH_CARDS_ID,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const fetchCards = (gameId, userId) => (dispatch) => {
  request
    .get(`${baseUrl}/game/${gameId}/${userId}`)
    .then(response => dispatch({
      type: FETCH_CARDS,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createGame = (userId) => (dispatch) => {
  request
    .post(`${baseUrl}/game`)
    .send(userId)
    .then(response => dispatch({
      type: CREATE_GAME,
      payload: response.body
    }))
    .catch(err => alert(err))
}
