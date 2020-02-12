import { AsyncStorage } from "react-native"

export const ADD_INITIAL_DATA = 'ADD_INITIAL_DATA'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'


export function handleInitialData () {
    return async (dispatch) => {
        const storedData = await AsyncStorage.getItem('@store')
        const decks = storedData !== null ? JSON.parse(storedData).decks : {}
        dispatch(addInitialData(decks))
    }
}

export function addInitialData (decks) {
    return {
        type: ADD_INITIAL_DATA,
        decks
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function deleteDeck (deck) {
    return {
        type: DELETE_DECK,
        deck
    }
}

export function addQuestion ({question, answer, deck}) {
    return {
        type: ADD_QUESTION,
        question,
        answer,
        deck
    }
}