import React from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducers from './reducers'
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DecksScreen from './components/DecksScreen'
import DeckScreen from './components/DeckScreen'
import NewCardScreen from './components/NewCardScreen'
import QuizScreen from './components/QuizScreen'
import { handleInitialData } from './actions'


const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(async () => {
  await AsyncStorage.setItem('@store', JSON.stringify(store.getState()))
})

//USE THIS TO DELETE THE AsyncStorage
// AsyncStorage.clear()

store.dispatch(handleInitialData())

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{...safeAreaStyle}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Decks List" component={DecksScreen} />
            <Stack.Screen name="Deck" component={DeckScreen} />
            <Stack.Screen name="New Card" component={NewCardScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    marginTop: 25
  },
  iosSafeArea: {
    flex: 1,
  },
});

const safeAreaStyle = Platform.OS === 'ios' ?
  styles.iosSafeArea : styles.androidSafeArea