import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { deleteDeck } from '../actions'

class DeckScreen extends Component {
  render() {
    const { route, navigation, cardsNumber, goBack } = this.props;
    const { id } = route.params;
    if (goBack) {
      navigation.navigate("Decks List")
      return null
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.subtitle}>{`${cardsNumber} Cards`}</Text>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("New Card", {id})}
        >
          <Text style={styles.touchableTitle}>Add Card</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("Quiz")}
        >
          <Text style={styles.touchableTitle}>Start Quiz</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.touchable, styles.delete]}
          onPress={() => this.props.dispatch(deleteDeck(id))}
        >
          <Text style={styles.touchableTitle}>Delete Deck</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = ({decks}, props) => {
  const { route } = props;
  const { id } = route.params;
  if (decks[id] === undefined) {
    return {
      goBack: true
    }
  }

  return { 
    cardsNumber: decks[id].questions.length || 0,
    goBack: false 
  };
};

export default connect(mapStateToProps)(DeckScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  touchable: {
    backgroundColor: "#ABEBC6",
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 50
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 50
  },
  touchableTitle: {
    fontSize: 20,
    textAlign: "center"
  },
  delete: {
    backgroundColor: "#C70039"
  }
});
