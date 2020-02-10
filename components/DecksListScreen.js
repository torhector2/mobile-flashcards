import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import { connect } from "react-redux";

function Item({ id, title, questionsNumber, onSelect }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onSelect(id)} style={styles.touchable}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>{`${questionsNumber} cards`}</Text>
    </View>
  );
}

class DecksListScreen extends Component {
    onSelect (id) {
        alert(id)
        //Navigate to the deck from here with the id
    }

  render() {
    const { navigation, decksSorted } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={decksSorted}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              questionsNumber={item.questions.length}
              onSelect={this.onSelect}
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const decksSorted = Object.values(state).sort(
    (a, b) => a.created - b.created
  );
  return {
    decksSorted
  };
};

export default connect(mapStateToProps)(DecksListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    marginVertical: 16
  },
  touchable: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center"
  }
});
