import { AsyncStorage } from "react-native"

export const ADD_DECK = 'ADD_DECK'
export const ADD_INITIAL_DATA = 'ADD_INITIAL_DATA'


export function handleInitialData () {
    return async (dispatch) => {
        const storedData = await AsyncStorage.getItem('@store')
        const decks = JSON.parse(storedData)
        console.log(`ESTOS SON LOS DECKS: ${JSON.stringify(decks)}`)
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