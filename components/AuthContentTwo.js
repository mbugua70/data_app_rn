import NetInfo from "@react-native-community/netinfo";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Platform, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SummaryForm } from "../http/api";
// import { Colors } from '../../constants/styles';

import Toast from "react-native-toast-message";
import FormContainerTwo from "./FormContainerTwo";

function AuthContentTwo({
  isEditing,
  isLogin,
  onAuthenticate,
  formID,
  formTitle,
  isPending,
  isSuccess,
  isError,
  exstingData,
}) {
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
        type: "error",
        text1: "Network Error",
        text2: "No internet connection. Please try again later.",
      });
      return;
    } else if (!isInternetReachable) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "No internet access",
      });
      return;
    }
    onAuthenticate(credentials);
  }

  return (
    <View style={styles.authContent}>
      <FormContainerTwo
        formTitle={formTitle}
        formID={formID}
        isEditing={isEditing}
        resetForm={resetForm}
        isSubmiting={isSubmiting}
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        isPending={isPending}
        isSuccess={isSuccess}
        isError={isError}
        exstingData={exstingData}
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
