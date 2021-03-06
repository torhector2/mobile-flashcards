import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

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
  answer = userAnswer => {
    const answers = this.state.answers.concat(userAnswer);
    this.setState({ answers });
  };
  restart = () => {
    this.setState({
      answers: [],
      showing: "question"
    });

    // this.handleNotifications();
  };
  handleNotifications = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
      console.log('the status is: ' + status)
      if (status === "granted") {
        this.addNotification()
      } else {
        // throw new Error("Location permission not granted");
      }
    } else {
      this.addNotification()
    }
    
  };

  addNotification = () => {
    const localNotification = {
      title: "Reminder",
      body: "You didn't study yet",
      ios: {
        sound: true,
        _displayInForeground: true
      }
    };
    const date = new Date() //today
    date.setDate(date.getDate() + 1); // tomorrow's date
    date.setHours(19, 0, 0) //set the reminder always at 7PM next day

    const schedulingOptions = {
      time: date
    };
    Notifications.cancelAllScheduledNotificationsAsync(); //cancel previous notifications as the user studied today
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  }

  render() {
    //Empty Deck
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

    // Quiz result
    let { showing } = this.state;
    const { questions } = this.props;
    const { answers } = this.state;
    const currentCard = questions[answers.length];

    if (answers.length === questions.length) {
      const correct = answers.filter(result => result === true).length;
      const formattedResult = ((correct / answers.length) * 100).toFixed(0);
      this.handleNotifications()
      return (
        <View style={styles.container}>
          <Text style={styles.resultNumber}>{formattedResult}%</Text>
          <Text style={styles.text}>Correct</Text>
          <TouchableHighlight style={styles.restart} onPress={this.restart}>
            <Text style={styles.flip}>Restart Quiz</Text>
          </TouchableHighlight>
        </View>
      );
    }

    //Question - Answer card
    return (
      <View style={styles.container}>
        <Text style={styles.cardNumber}>{`${answers.length + 1}/${
          questions.length
        }`}</Text>
        <Text style={styles.text}>
          {showing === "question" ? currentCard.question : currentCard.answer}
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

const mapStateToProps = ({ decks }, props) => {
  const { id } = props.route.params;
  const { questions } = decks[id];
  return {
    questions,
    empty: questions.length === 0
  };
};

export default connect(mapStateToProps)(QuizScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  text: {
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 30,
    fontSize: 20
  },
  resultNumber: {
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 30,
    fontSize: 60,
    fontWeight: "bold"
  },
  cardNumber: {
    alignSelf: "flex-start",
    margin: 20,
    fontSize: 25
  },
  flip: {
    textAlign: "center",
    color: "#2E86C1",
    fontWeight: "bold"
  },
  touchable: {
    backgroundColor: "#D6EAF8",
    padding: 20,
    marginVertical: 60,
    marginHorizontal: 16
  },
  restart: {
    backgroundColor: "#D6EAF8",
    padding: 20,
    marginVertical: 120,
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
