import { CREATE_GAME } from "../actions/game";

export default function(state = [], { type, payload } = {}) {
  switch (type) {
    case CREATE_GAME:
      return payload;
    default:
      return state;
  }
}
