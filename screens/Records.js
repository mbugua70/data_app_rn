import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GlobalStyles } from "../Constants/Globalcolors";

import ButtonText from "../UI/ButtonText";
import RecordContainer from "../components/RecordContainer";
import { fetchRecordByDate } from "../http/api";

const Records = ({ route }) => {
  const [activeButton, setActiveButton] = useState(1);

  const { formID, formTitle } = route.params;


  const buttonStyle = {
    buttonOne: {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderLeftWidth: 3,
      borderRightWidth: 0,
    },
    buttonTwo: {
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderLeftWidth: 3,
      borderRightWidth: 0,
    },
    buttonThree: {
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
  };


  const { data, mutate, isError, error, isPending } = useMutation({
    mutationFn: fetchRecordByDate,
    // the code below will wait the request to finish before moving to another page.
    onMutate: async (data) => {
      return data;
    },

    onSuccess: (data) => {
     console.log(data, "fetching records")
    },
  });


  // button background color navigation
  function handleToday() {
    setActiveButton(1);
    const today = new Date().toISOString().split("T")[0];

    console.log(today);
  }

  function handleYesterday() {
    setActiveButton(2);
  }

  function handleDate() {
    setActiveButton(3);
  }

  return (
    <View style={styles.screen}>
      {/* header title */}
      <Text style={styles.headerTitle}>Records</Text>

      {/* button text */}
      <View style={styles.buttonContainer}>
        <ButtonText
          isActive={1}
          activeButton={activeButton}
          onPress={handleToday}
          borderWidth={buttonStyle.buttonOne}>
          Today
        </ButtonText>
        <ButtonText
          isActive={2}
          activeButton={activeButton}
          onPress={handleYesterday}
          borderWidth={buttonStyle.buttonTwo}>
          Yesterday
        </ButtonText>
        <ButtonText
          isActive={3}
          activeButton={activeButton}
          onPress={handleDate}
          borderWidth={buttonStyle.buttonThree}>
          Date
        </ButtonText>
      </View>

      {/* dashboard  showing the records*/}
      <RecordContainer formID={formID} formTitle={formTitle} />
    </View>
  );
};

export default Records;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: GlobalStyles.colors.gray200,
    flex: 1,
  },
  headerTitle: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
});
