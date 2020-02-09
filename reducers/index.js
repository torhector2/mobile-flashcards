import { ADD_DECK, ADD_INITIAL_DATA } from '../actions'

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
            title: action.deck,
            questions: []
          }
        }
      default :
        return state
    }
  }
  
  export default decks