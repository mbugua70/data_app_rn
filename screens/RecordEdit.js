import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AuthContentTwo from "../components/AuthContentTwo";
import Toast from 'react-native-toast-message';
import { GlobalStyles } from "../Constants/Globalcolors";

const RecordEdit = ({ route }) => {
  const { formID, formTitle } = route.params;
  return (
    <>
      <View style={styles.screen}>
      <AuthContentTwo isEditing={true} formID={formID} formTitle={formTitle} />
    </View>
    <Toast/>
    </>
  );
};

export default RecordEdit;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.gray200
  },
});
