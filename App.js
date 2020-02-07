import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! Redux!!!!</Text>
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
