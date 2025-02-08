import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { Children } from "react";

const ButtonText = (props) => {

  return (
    <View style={[styles.screen, {...props.borderWidth}, props.isActive === props.activeButton ? styles.clickedStyling : ""]}>
      <Pressable onPress={props.onPress} style={styles.button}>
        <Text style={[styles.textButton, props.isActive === props.activeButton ? styles.clickedStylingText : ""] }>{props.children}</Text>
      </Pressable>
    </View>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
    borderColor: "#9cacff",
  },
  button: {

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textButton: {
    color: '#4A5BB5',
    fontSize: 12,
    fontWeight: 'bold'
  },
  clickedStyling: {
    backgroundColor: '#9cacff',
  },
  clickedStylingText: {
    color: "#fff",
  }
});
