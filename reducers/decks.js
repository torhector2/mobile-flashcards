import { ADD_DECK, ADD_INITIAL_DATA, DELETE_DECK, ADD_QUESTION } from '../actions'

export default function decks (state = {}, action) {
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
          case ADD_QUESTION:
            return {
              ...state, 
              [action.deck]: {
                ...state[action.deck],
                questions: state[action.deck].questions.concat({
                  question: action.question,
                  answer: action.answer,
                  created: Date.now()
                }),
              }
            }
      default :
        return state
    }
  }