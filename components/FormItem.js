import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Avatar } from "react-native-paper";
import { Button } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../Constants/Globalcolors";
import { getIndex } from "../util/getIndex";
import { AuthContext } from "../store/store";

const FormItem = ({
  index,
  title,
  onNavigate,
  onNavigateRecord,
  isEvenRow,
  formID,
}) => {
  const { submittedRecord } = useContext(AuthContext);
  const navigation = useNavigation();
  const [recordSubmit, setRecordSubmit] = useState([])






  const styling = {
    backgroundColor:  recordSubmit.length === 0 ? "#819c79"  : "#fff",
    borderWidth: recordSubmit.length === 0 ? 0 : 2,
    borderColor: recordSubmit.length === 0 ? "#fff" : "#819c79",
  };

  const button = {
    mode: recordSubmit.length === 0 ? "contained-tonal" : "contained",
  };

  const iconButton = {
    mode: recordSubmit.length === 0 ? "contained-tonal" : "contained",
  };

  const titleStyling = {
    color:
        recordSubmit.length === 0
        ? GlobalStyles.colors.gray700
        : GlobalStyles.colors.gray600,
  };

  useEffect(() => {
      submittedRecord.map((item) => {
        const today = new Date().toISOString().split("T")[0];
         if(today === item.date) {
           if(item.formID === formID) {
             setRecordSubmit((prev) => [
              ...prev,
              item.formTitle
             ])
           }
         }
      })

  }, [submittedRecord])

  return (
    <View
      style={[styles.screen, { ...styling }, isEvenRow && styles.rowReverse]}>
      <View style={styles.rowContainer}>
        <View style={styles.flexContainer}>
          <Text style={[styles.title, { ...titleStyling }]}>{title}</Text>
          <View>
            <IconButton
              containerColor={ recordSubmit.length === 0 ? "#f5f5f5" : "#819c79"}
              mode={iconButton.mode}
              icon='plus'
              iconColor='#000000'
              size={20}
              onPress={onNavigate}
            />
          </View>
        </View>
        {/* records */}

        <View style={styles.flexContainerTwo}>
          <Text style={styles.overalRecord}>{recordSubmit.length}</Text>
          <Text style={styles.overall}>Overall</Text>
        </View>

        <View style={styles.buttoncontainer}>
          <View>
            <Button
              buttonColor={recordSubmit.length === 0 ? "" : "#819c79"}
              labelStyle={{ fontSize: 10, paddingVertical: 0, lineHeight: 12 }}
              style={styles.button}
              mode={button.mode}
              icon={() => {
                return (
                  <Avatar.Icon
                    size={24}
                    icon='eye-circle'
                    style={styles.iconAvator}
                    color='#819c79'
                  />
                );
              }}
              onPress={onNavigateRecord}>
              Records
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FormItem;

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 18,
    height: 150,
  },

  rowReverse: {
    flexDirection: "row-reverse",
  },

  rowContainer: {
    rowGap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flex: 1,
  },

  title: {
    width: "70%",
    fontSize: 12,
  },

  button: {
    width: 90,
    //  height: 30,
  },

  iconAvator: {
    backgroundColor: "#fff",
  },

  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexContainerTwo: {
    flexDirection: "row",
    alignItems: "center",
  },

  overall: {
    paddingVertical: 0,
    marginVertical: 0,
    marginLeft: 6,
    fontSize: 12,
  },
  overalRecord: {
    paddingVertical: 0,
    marginVertical: 0,
    fontSize: 32,
    fontWeight: "400",
  },
});
