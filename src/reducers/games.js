import { FETCH_GAMES } from '../actions/types'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCH_GAMES:
      return payload
    default :
      return state
  }
}
