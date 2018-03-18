import { JOIN_GAME } from "../actions/game";



export default function(state = [], { type, payload } = {}) {
  switch (type) {
    case JOIN_GAME:
      return payload;
    default:
        return state;
    }
  }
