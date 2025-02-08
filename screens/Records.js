import NetInfo from "@react-native-community/netinfo";
import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { GlobalStyles } from "../Constants/Globalcolors";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { fetchRecordByDate } from "../http/api";
import { useIsFocused } from "@react-navigation/native";

import ButtonText from "../UI/ButtonText";
import Toast from "react-native-toast-message";
import RecordContainer from "../components/RecordContainer";

const Records = ({ route }) => {
  const [activeButton, setActiveButton] = useState(1);
  const [userData, setUserData] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const { formID, formTitle } = route.params;
  const isFocused = useIsFocused();

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

  useEffect(() => {
    async function handleToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setUserData(JSON.parse(token));
      }
    }

    handleToken();
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  const { data, mutate, isError, error, isPending } = useMutation({
    mutationFn: fetchRecordByDate,
    // the code below will wait the request to finish before moving to another page.
    onMutate: async (data) => {
      return data;
    },

    onSuccess: (data) => {
      console.log(data, "fetching records");
    },
  });

  // button background color navigation
  function handleToday() {
    setActiveButton(1);
    const today = new Date().toISOString().split("T")[0];
    const ba_id = userData.ba_id;

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

    mutate({ today, formID, ba_id });
  }

  function handleYesterday() {
    setActiveButton(2);
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)


    // formatting
    const formattedDate = yesterday.toDateString().split("T")[0]
    const ba_id = userData.ba_id;

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

    mutate({formattedDate, formID, ba_id})
  }

  function handleDate() {
    setActiveButton(3);
  }

  return (
    <>
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

        {/* showing empty box incase no data is available */}

        {/* dashboard  showing the records*/}
        <RecordContainer formID={formID} formTitle={formTitle} />
      </View>
      {isPending && (
        <View style={styles.overlayLoading}>
          <ActivityIndicator
            size={32}
            animating={true}
            color={MD2Colors.lightBlueA700}
          />
        </View>
      )}
    </>
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
  overlayLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
