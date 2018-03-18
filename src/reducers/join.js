import { JOIN_GAME } from '../actions/types'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case JOIN_GAME:
      return payload
    default :
      return state
  }
}
