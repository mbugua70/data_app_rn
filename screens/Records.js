import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { GlobalStyles } from "../Constants/Globalcolors";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { fetchRecordByDate } from "../http/api";
import { useIsFocused } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonText from "../UI/ButtonText";
import Toast from "react-native-toast-message";
import RecordContainer from "../components/RecordContainer";
import EmptyBox from "../UI/EmptyBox";

const Records = ({ route }) => {
  const [activeButton, setActiveButton] = useState(1);
  const [userData, setUserData] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const [pickerdate, setPickerDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isFetchingUserData, setIsFetchingUserData] = useState(true)

  const { formID, formTitle } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    async function handleToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setUserData(JSON.parse(token));
        setIsFetchingUserData(false)
      }
      setIsFetchingUserData(false)
    }

    handleToken();
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      // setIsInternetReachable(state.isInternetReachable);
      setIsInternetReachable(state.isInternetReachable ?? false);
    });

    return () => unsubscribe();
  }, []);

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



  const { data, mutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: fetchRecordByDate,
    // the code below will wait the request to finish before moving to another page.
    onMutate: async (data) => {
      return data;
    },

    onSuccess: (data) => {
      // console.log(data, "fetching records");
    },
  });

  // button background color navigation
  function handleToday() {
    setActiveButton(1);
    const formattedDate = new Date().toISOString().split("T")[0];
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

    mutate({ formattedDate, formID, ba_id });
  }

  function handleYesterday() {
    setActiveButton(2);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // formatting
    const formattedDate = yesterday.toISOString().split("T")[0];
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

    mutate({ formattedDate, formID, ba_id });
  }

  const openDatePicker = () => {
    setTempDate(pickerdate);
    setShowPicker(true);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const confirmDate = () => {
    setPickerDate(tempDate); // Finalize the date
    setShowPicker(false); // Close modal
    handleDateBackend(tempDate)
  };



  function handleDate() {
    setActiveButton(3);
    // triggering the modal date to open
    openDatePicker()
  }

  function handleDateBackend(selectedDate){
    const ba_id = userData.ba_id;
    if (pickerdate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]
      mutate({formattedDate, formID, ba_id})
   } else {
     Toast.show({
       type: "error",
       text1: "Date error",
       text2: "Failed to pick date",
     });
   }
  }



  let content;

  if (isSuccess && !isError && !isPending) {
    const fetchedData = JSON.parse(data);
    if (fetchedData.data.length === 0) {
      content = <EmptyBox noDataText='You have no records to show!' />;
    } else {
      content = <RecordContainer formID={formID} formTitle={formTitle} />;
    }
  }

  if(!isFetchingUserData && userData){

  }

  useEffect(() => {
    const formattedDate = new Date().toISOString().split("T")[0];
    const ba_id = userData.ba_id;
    mutate({formattedDate, formID, ba_id})

  },[isFetchingUserData, isFocused])



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

        <Modal visible={showPicker} transparent={true} animationType='slide'>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={pickerdate}
                mode='date'
                display={Platform.OS === "ios" ? "spinner" : "calendar"}
                onChange={onChange}
              />

              {/* Confirm Button */}
              <TouchableOpacity
                onPress={confirmDate}
                style={styles.confirmButton}>
                <Text style={styles.confirmText}>Set Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* {showPicker && (
          <>
            <DateTimePicker
            display={Platform.OS === "android" ? "calendar" : "spinner"}
            testID='dateTimePicker'
            value={pickerdate}
            is24Hour={true}
            onChange={onChange}
            mode='date'
          />
          <View>

          </View>
          </>
        )} */}

        {/* showing empty box incase no data is available */}

        {content}
        {/* dashboard  showing the records*/}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
  },
});
