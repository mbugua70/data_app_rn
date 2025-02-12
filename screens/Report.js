import { useEffect, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { SummaryForm } from "../http/api";
import { View, Text, StyleSheet} from "react-native";
import React from "react";
import AuthContentTwo from "../components/AuthContentTwo";
import Toast from "react-native-toast-message";
import { GlobalStyles } from "../Constants/Globalcolors";

const Report = ({ route }) => {
  const { formID, formTitle } = route.params;
  const { data, mutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: SummaryForm,
    // the code below will wait the request to finish before moving to another page.
    onMutate: async (data) => {
      return data;
    },

    onSuccess: (data) => {
      if (data.response === "fail") {
        Toast.show({
          type: "error",
          text1: "Failed to submit",
          text2: "Failed to submit the record, please try again!",
        });
      }

      if (data.response === "success") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Data submitted successfully!",
        });
      }
    },
  });

  async function submitHandler(record) {
    // report submission
    mutate({record});
  }

  useEffect(() => {
    console.log(error);
    if (error && !isPending) {
      Toast.show({
        type: "error",
        text1: "Failed to submit",
        text2: error.message,
      });
    } else if (error === "TOO_MANY_ATTEMPTS_TRY-LATER" && !isPending) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Too many attempts try later",
      });
    }
  }, [error, isPending]);

  return (
    <>
      <View style={styles.screen}>
        <AuthContentTwo
          isPending={isPending}
          isError={isError}
          isSuccess={isSuccess}
          onAuthenticate={submitHandler}
          formID={formID}
          formTitle={formTitle}
        />
      </View>
    </>
  );
};

export default Report;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.gray200
  }
})
