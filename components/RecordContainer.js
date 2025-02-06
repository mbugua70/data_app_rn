import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { IconButton, MD3Colors } from 'react-native-paper';
import { GlobalStyles } from "../Constants/Globalcolors";
import { useNavigation } from "@react-navigation/native";

const RecordContainer = ({index, formID, formTitle}) => {
    console.log(formID, "testing 2")

    const navigation =  useNavigation()

    function handleRecordEdit(){
        navigation.navigate("Record Edit", {
            formID: formID,
            formTitle: formTitle
        })
    }

    const styling = {
        backgroundColor: index % 2 === 0 ? "#9cacff" : "#fff",
        borderWidth: index % 2 === 0 ? 0 : 2,
        borderColor: index % 2 === 0 ? "#fff" : "#9cacff"
      }

      const button = {
        mode: index % 2 === 0 ? "contained-tonal" : "contained"
      }

      const iconButton = {
        mode: index % 2 === 0 ? "contained-tonal" : "contained"
      }

      const iconColor = {
        color: index % 2 === 0 ? "#fff" : "#9cacff",
      }


  return (
    <View style={styles.screen}>
      {/* date container */}
      <View style={styles.dateContainer}>
        <Text style={styles.boldText}>15</Text>
        <Text style={styles.lightText}>Aug</Text>
      </View>
      {/* main record container */}
      <View style={[styles.recordContainer, styling]}>
        <View>
          <Text style={styles.boldText}>Record one</Text>
          {/* button container */}
          <IconButton
            mode={iconButton.mode}
            icon='note-edit'
            iconColor={iconColor.color}
            size={20}
            onPress={handleRecordEdit}
          />
        </View>
        <View>
          <Text style={styles.lightText}>Thu</Text>
        </View>
      </View>
    </View>
  );
};

export default RecordContainer;


const styles = StyleSheet.create({
   screen: {
    padding: 16,
    margin: 10,
    flexDirection: 'row',
    columnGap: 10,
   },
   recordContainer: {
    borderRadius: 12,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
   },
   dateContainer: {
     justifyContent: 'center',
     rowGap: 6,
   },
   boldText: {
    fontSize: 16,
    fontWeight: "700",
   },
   lightText: {
    color: GlobalStyles.colors.gray600
   }
})
