import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

class DeckScreen extends Component {
  render() {
    const { route, navigation, cardsNumber } = this.props;
    const { id } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.subtitle}>{`${cardsNumber} Cards`}</Text>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("New Card")}
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
          onPress={() => alert("delete")}
        >
          <Text style={styles.touchableTitle}>Delete Deck</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { route } = props;
  const { id } = route.params;

  return { cardsNumber: state[id].questions.length || 0 };
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
