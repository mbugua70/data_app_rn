import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Platform, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SummaryForm } from "../http/api";
// import { Colors } from '../../constants/styles';

import Toast from "react-native-toast-message";
import FormContainerTwo from "./FormContainerTwo";

function AuthContentTwo({ isLogin, onAuthenticate, formID, formTitle }) {
  const navigation = useNavigation();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState({});

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  async function submitHandler(credentials) {

      if (isOffline) {
              Toast.show({
                type: 'error',
                text1: 'Network Error',
                text2: 'No internet connection. Please try again later.',
              });
              return;
            }else if(!isInternetReachable){
              Toast.show({
                type: 'error',
                text1: 'Network Error',
                text2: 'No internet access',
              });
              return;
            }

    try {
      // Submit the form data

      setIsSubmitting(true);
      // const response = await SummaryForm(
      //   name,
      //   phone,
      //   age,
      //   frequency,
      //   purchase,
      //   variant,
      //   sku,
      //   pricing,
      //   feedback,
      //   lat,
      //   long
      // );


      // resetting the validation check
      setIsSubmitting(false);

      // Optionally, show success feedback to the user
      // adding user UI  alert message for successful data upload
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data submitted successfully!",
      });
      setResetForm((prev) => !prev);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
      Toast.show({
        type: "error",
        text1: "Submission failed",
        text2: error.message || "An unknown error occurred.",
      });
      // Alert.alert(
      //   "Submission failed",
      //   error.message || "An unknown error occurred."
      // );
    }
  }

  return (
    <View style={styles.authContent}>
      <FormContainerTwo
        formTitle= {formTitle}
        formID={formID}
        resetForm={resetForm}
        isSubmiting={isSubmiting}
        isLogin={isLogin}
        onSubmit={submitHandler}
        // credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

export default AuthContentTwo;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    // marginTop: 48,
    paddingTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingBottom: Platform.select({ ios: 20, android: 70 }),
    // backgroundColor: Colors.primary800,
  },
});
