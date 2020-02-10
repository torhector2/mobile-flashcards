import React, { Component } from "react";
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

class NewDeckScreen extends Component {
  state = {
    deckName: ""
  }

  onChangeText(text) {
    this.setState({ deckName: text });
  }

  onPress(e) {
    let { deckName } = this.state || ''
    const { deckTitles} = this.props
    console.log(`Estos son los deck titles: ${deckTitles}`)
    deckName = deckName.trim()
    if (deckName.length === 0) {
        alert('Please add a valid Deck Title')
        return
    }

    if (deckTitles.includes(deckName)) {
        alert('This Deck already exists')
        return
    }

    this.props.dispatch(addDeck(deckName))
    this.setState({deckName: ''})
    this.props.navigation.navigate('Decks')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.text}>What is the title of your new Deck?</Text>
        <TextInput
          placeholder="Deck Title"
          maxLength={256}
          style={styles.textInput}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.deckName}
        />
        <Button
          style={styles.button}
          title="Create Deck"
          onPress={() => this.onPress()}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
    deckTitles: Object.keys(state)
})

export default connect(mapStateToProps)(NewDeckScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 16,
  },
  textInput: {
    marginTop: 20,
    marginHorizontal: 16,
    alignSelf: "stretch",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 6
  },
  button: {
    marginHorizontal: 16
  }
});
