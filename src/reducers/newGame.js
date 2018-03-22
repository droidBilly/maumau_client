import { CREATE_GAME } from '../actions/types'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case CREATE_GAME:
      return payload
    default :
      return state
  }
}
