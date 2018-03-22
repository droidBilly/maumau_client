import * as request from "superagent";
import { baseUrl } from "../constants";
import history from '../history';

export const FETCH_CARDS_ID = "FETCH_CARDS_ID";
export const CREATE_GAME = "CREATE_GAME";
export const FETCH_CARDS = "FETCH_CARDS";
export const FETCH_GAMES = "FETCH_GAMES";
export const JOIN_GAME = "JOIN_GAME";
export const USER_ID = "USER_ID";
export const SET_CARD = "SET_CARD"
export const GET_A_CARD = "GET_A_CARD"

export const fetchGameCards = cards => dispatch => {
  request
    .get(`${baseUrl}/cards`)
    .then(response =>
      dispatch({
        type: FETCH_CARDS_ID,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const fetchCards = (gameId) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .get(`${baseUrl}/games/${gameId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response => {
      dispatch({ type: FETCH_CARDS, payload: response.body })

    })
    .catch(err => alert(err));
};

export const fetchGames = () => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .get(`${baseUrl}/games`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_GAMES,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};


export const createNewGame = () => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .post(`${baseUrl}/games`)
    .set("Authorization", `Bearer ${jwt}`)
    .then((response) => {
      dispatch({type: CREATE_GAME, payload: response.body})
      history.push(`/games/${response.body.id}`);
      history.go()

    })
    .catch(err => alert(err));
};

export const joinGame = gameId => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  request
    .patch(`${baseUrl}/games/${gameId}/join`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response => {
      dispatch({ type: JOIN_GAME, payload: response.body })
      history.go()
    })
    .catch(err => alert(err));
};



export const setCard = (cardId, gameId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({cardId: cardId})
    .then(response => {
      dispatch({type: SET_CARD, payload:response.body})
      history.go()

    })
    .catch(err => alert(err))
}

export const getACard = (gameId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      dispatch({type: GET_A_CARD, payload:response.body})
      history.go()
    })
    .catch(err => alert(err))
}
