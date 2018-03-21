import {FETCH_CARDS, SET_CARD } from "../actions/game";

export default function(state = [], { type, payload } = {}) {
  switch (type) {
    case FETCH_CARDS:
      return payload;
    case SET_CARD:
        return payload;
    default:
      return state;
  }
}
