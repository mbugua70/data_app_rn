import { View, Text, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { GlobalStyles } from "../Constants/Globalcolors";
import { RecordEditForm } from "../http/api";

import React, { useEffect, useState } from "react";
import AuthContentTwo from "../components/AuthContentTwo";
import Toast from "react-native-toast-message";

const RecordEdit = ({ route }) => {
  const { formID, formTitle, item: existingData } = route.params;

  const { data, mutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: RecordEditForm,
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
          onAuthenticate={submitHandler}
          isError={isError}
          isPending={isPending}
          isSuccess={isSuccess}
          isEditing={true}
          formID={formID}
          formTitle={formTitle}
          existingData={existingData}
        />
      </View>
      <Toast />
    </>
  );
};

export default RecordEdit;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.gray200,
  },
});
