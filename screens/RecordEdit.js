import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AuthContentTwo from "../components/AuthContentTwo";

const RecordEdit = ({ route }) => {
  const { formID, formTitle } = route.params;
  return (
    <View style={styles.screen}>
      <AuthContentTwo isEditing={true} formID={formID} formTitle={formTitle} />
    </View>
  );
};

export default RecordEdit;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
