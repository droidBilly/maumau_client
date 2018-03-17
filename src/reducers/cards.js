import { CREATE_GAME, FETCH_CARDS } from '../actions/types'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case CREATE_GAME:
      return payload
    case FETCH_CARDS:
      return payload
    default :
      return state
  }
}
