import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
