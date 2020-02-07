import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { AsyncStorage } from 'react-native';
import { addDeck, handleInitialData } from './actions'

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(async () => {
  console.log('estoy dentro')
  console.log(`BEFORE ${JSON.stringify(store.getState())}`)
  await AsyncStorage.setItem('@store', JSON.stringify(store.getState()))
  console.log(`AFTER ${JSON.stringify(await AsyncStorage.getItem('@store'))} `)
})

// store.dispatch(addDeck('Paco'))
// store.dispatch(addDeck('Maria'))
// store.dispatch(addDeck('Manuel'))
store.dispatch(handleInitialData())

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! </Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
