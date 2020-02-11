import { ADD_DECK, ADD_INITIAL_DATA, DELETE_DECK } from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
      case ADD_INITIAL_DATA:
        return {
            ...state,
            ...action.decks
        }
      case ADD_DECK :
        return {
          ...state,
          [action.deck]: {
            id: action.deck,
            title: action.deck,
            created: Date.now(),
            questions: []
          }
        }
        case DELETE_DECK:
          return Object.keys(state).reduce((object, key) => {
            if (key !== action.deck) {
              object[key] = state[key]
            }
            return object
          }, {})
      default :
        return state
    }
  }
  
  export default decks