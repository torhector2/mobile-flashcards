import React from 'react';
import { StyleSheet, Text, View, Button, Platform, SafeAreaView } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewDeckScreen from './components/NewDeckScreen'
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


///////////////
//
//  MOVE THIS INTO INDIVIDUAL COMPONENTS
//  LET'S PLAN THE NAVIGATION
//
///////////////


function DecksScreen({ navigation }) {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Decks" component={DecksListScreen} />
        <Tab.Screen name="Add Deck" component={NewDeckScreen} />
    </Tab.Navigator>
  );
}

function DecksListScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Decks Screen</Text>
      <Button
        title="Go to Deck"
        onPress={() => navigation.navigate('Deck')}
      />
    </View>
  )
}

function DeckScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Deck 1</Text>
      <Button
        title="Add Card"
        onPress={() => navigation.navigate('New Card')}
      />
      <Button
        title="Start Quiz"
        onPress={() => navigation.navigate('Quiz')}
      />
      <Button
        title="Delete Deck"
      />
    </View>
  );
}

function QuizScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Quiz</Text>
    </View>
  );
}

function NewCardScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add New Card</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = Platform.OS === 'ios' ? 
  createBottomTabNavigator() :
  createMaterialTopTabNavigator()

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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