import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DecksListScreen from './DecksListScreen'
import NewDeckScreen from './NewDeckScreen'

const Tab = Platform.OS === 'ios' ? 
  createBottomTabNavigator() :
  createMaterialTopTabNavigator()

export default function DecksScreen({ navigation }) {
    return (
      <Tab.Navigator>
          <Tab.Screen name="Decks" component={DecksListScreen} />
          <Tab.Screen name="Add Deck" component={NewDeckScreen} />
      </Tab.Navigator>
    );
  }