import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SummaryForm } from "../http/api";
// import { Colors } from '../../constants/styles';

import Toast from "react-native-toast-message";
import FormContainerTwo from "./FormContainerTwo";

function AuthContentTwo({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    phone: false,
    age: false,
    beverage: false,
    reason: false,
    frequency: false,
    purchase: false,
    variant: false,
    sku: false,
    pricing: false,
    feedback: false,
    purchase: false,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  async function submitHandler(credentials) {
    let {
      name,
      phone,
      age,
      frequency,
      purchase,
      variant,
      sku,
      pricing,
      feedback,
      lat,
      long,
    } = credentials;

    phone = phone.trim();
    name = name.trim();
    age = age.trim();
    frequency = frequency.trim();
    variant = variant.trim();
    sku = sku.trim();
    feedback = feedback.trim();
    purchase = purchase.trim();

    const nameIsValid = name.length > 2;
    const phoneText = phone.replace(/\s+/g, '');
    const phoneRegex = /^[0-9]{7,15}$/;
    const phoneIsValid = phoneRegex.test(phoneText);
    const ageIsValid = age.length > 1;
    const frequencyIsValid = frequency.length > 1;
    const variantIsValid = variant.length > 1;
    const skuIsValid = sku.length > 1;
    const feedbackIsvalid = feedback.length > 1;
    const pricingIsValid = pricing.length > 1;
    const purchaseIsValid = purchase.length > 1;

    if (
      !ageIsValid ||
      !nameIsValid ||
      !phoneIsValid ||
      !frequencyIsValid ||
      !variantIsValid ||
      !skuIsValid ||
      !feedbackIsvalid ||
      !pricingIsValid ||
      !purchaseIsValid
    ) {
      Alert.alert("Invalid input", "Please check your input values.");
      setCredentialsInvalid({
        name: !nameIsValid,
        age: !ageIsValid,
        phone: !phoneIsValid,
        frequency: !frequencyIsValid,
        variant: !variantIsValid,
        sku: !skuIsValid,
        pricing: !pricingIsValid,
        feedback: !feedbackIsvalid,
        purchase: !purchaseIsValid
      });
      return;
    }

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


      setCredentialsInvalid({
        name: !nameIsValid,
        age: !ageIsValid,
        phone: !phoneIsValid,
        frequency: !frequencyIsValid,
        variant: !variantIsValid,
        sku: !skuIsValid,
        pricing: !pricingIsValid,
        feedback: !feedbackIsvalid,
        purchase: !purchaseIsValid
      });


      setIsSubmitting(true);
      const response = await SummaryForm(
        name,
        phone,
        age,
        frequency,
        purchase,
        variant,
        sku,
        pricing,
        feedback,
        lat,
        long
      );


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
        resetForm={resetForm}
        isSubmiting={isSubmiting}
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
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
