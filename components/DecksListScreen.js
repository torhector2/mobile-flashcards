import React from 'react'
import { View, Text, Button } from 'react-native'

export default function DecksListScreen({navigation}) {
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