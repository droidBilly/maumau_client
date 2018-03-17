import { FETCH_CARD_IDS } from '../actions/types'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCH_CARD_IDS:
      return payload
    default :
      return state
  }
}
