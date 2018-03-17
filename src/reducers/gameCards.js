import { FETCH_CARDS_ID } from "../actions/game";

export default function(state = [], { type, payload } = {}) {
  switch (type) {
    case FETCH_CARDS_ID:
      return payload;
    default:
        return state;
    }
  }
