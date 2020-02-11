import React, { Component } from "react";
import { connect } from 'react-redux'
import { addQuestion } from '../actions'
import {
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Text
} from "react-native";

class NewCardScreen extends Component {
  state = {
    question: "",
    answer: ""
  }

  onQuestionChangeText(text) {
    this.setState({question: text})
  }

  onAnswerChangeText(text) {
    this.setState({answer: text})
  }

  onPress(e, deck) {
    let {question, answer} = this.state || ''
    question = question.trim()
    answer = answer.trim()

    if (question.length === 0) {
        alert("Question can't be empty")
        return
    }

    if (answer.length === 0) {
        alert("Answer can't be empty")
        return
    }

    this.props.dispatch(addQuestion({question, answer, deck}))
    this.setState({question: '', answer: ''})
    this.props.navigation.navigate('Deck')
  }

  render() {
    let { id } = this.props.route.params
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.text}>{id} Deck</Text>
        <TextInput
          placeholder="Question"
          maxLength={256}
          style={styles.textInput}
          onChangeText={text => this.onQuestionChangeText(text)}
          value={this.state.question}
        />
        <TextInput
          placeholder="Answer"
          maxLength={256}
          style={styles.textInput}
          onChangeText={text => this.onAnswerChangeText(text)}
          value={this.state.answer}
        />
        <Button
          style={styles.button}
          title="Submit"
          onPress={(e) => this.onPress(e, id)}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(NewCardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: 40
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
    marginHorizontal: 16,
    marginTop: 16
  }
});
