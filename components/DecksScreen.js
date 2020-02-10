import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DecksListScreen from './DecksListScreen'
import NewDeckScreen from './NewDeckScreen'
import { AntDesign } from '@expo/vector-icons';

const Tab = Platform.OS === 'ios' ? 
  createBottomTabNavigator() :
  createMaterialTopTabNavigator()

export default function DecksScreen({ navigation }) {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = 'book';
          } else if (route.name === 'Add Deck') {
            iconName = 'addfolder';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}>
          <Tab.Screen name="Decks" component={DecksListScreen} />
          <Tab.Screen name="Add Deck" component={NewDeckScreen} />
      </Tab.Navigator>
    );
  }