import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

class QuizScreen extends Component {
  state = {
    answers: [], //add true false on each answer. When length is equal to questions.length the quiz is over. Then count number of true
    showing: "question"
  };
  flip = () => {
    this.setState({
      showing: this.state.showing === "question" ? "answer" : "question"
    });
  };
  answer = (userAnswer) => {
    console.log(`User Answer: ${userAnswer}`);
  };
  render() {
    if (this.props.empty) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            Sorry, you cannot take a quiz because there are no cards in the
            deck.
          </Text>
        </View>
      );
    }
    let { showing } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.cardNumber}>1/10</Text>
        <Text style={styles.text}>
          Quizzz. {JSON.stringify(this.props.questions)}
        </Text>
        <TouchableHighlight style={styles.touchable} onPress={this.flip}>
          <Text style={styles.flip}>
            {showing === "question"
              ? "Tap to see the answer"
              : "Tap to go back to the question"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.touchableCorrect}
          onPress={() => this.answer(true)}
        >
          <Text style={styles.correct}>Correct</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.touchableIncorrect}
          onPress={() => this.answer(false)}
        >
          <Text style={styles.incorrect}>Incorrect</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  text: {
    textAlign: "center",
    marginHorizontal: 16
  },
  cardNumber: {
    alignSelf: "flex-start",
    margin: 20,
    fontSize: 25
  },
  flip: {
    textAlign: "center",
    color: "#138D75",
    fontWeight: "bold"
  },
  touchable: {
    backgroundColor: "#ABEBC6",
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16
  },
  touchableCorrect: {
    backgroundColor: "#ABEBC6",
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
    alignSelf: "stretch"
  },
  touchableIncorrect: {
    backgroundColor: "#F57979",
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
    alignSelf: "stretch"
  },
  correct: {
    textAlign: "center",
    color: "#138D75",
    fontWeight: "bold"
  },
  incorrect: {
    textAlign: "center",
    color: "#641E16",
    fontWeight: "bold"
  }
});

const mapStateToProps = ({ decks }, props) => {
  const { id } = props.route.params;
  const { questions } = decks[id];
  return {
    questions,
    empty: questions.length === 0
  };
};

export default connect(mapStateToProps)(QuizScreen);
