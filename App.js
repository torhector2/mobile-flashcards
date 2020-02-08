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


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
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
          <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Details" component={DetailsScreen} />
          </Tab.Navigator>
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