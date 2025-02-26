import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from 'react-native-paper';
import { Button } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../Constants/Globalcolors";

const FormItem = ({index, title, onNavigate, onNavigateRecord}) => {
    const navigation = useNavigation();


    const styling = {
        backgroundColor: index % 2 === 0 ? "#819c79" : "#fff",
        borderWidth: index % 2 === 0 ? 0 : 2,
        borderColor: index % 2 === 0 ? "#fff" : "#819c79"
      }

      const button = {
        mode: index % 2 === 0 ? "contained-tonal" : "contained"
      }

      const iconButton = {
        mode: index % 2 === 0 ? "contained-tonal" : "contained"
      }

      const titleStyling = {
        color: index % 2 === 0 ? GlobalStyles.colors.gray700 : GlobalStyles.colors.gray600
      }


  return (
    <View style={[styles.screen, {...styling}]}>
      <View style={styles.flexContainer}>
        <Text style={[styles.title, {...titleStyling}]}>{title}</Text>
        <View>
          <IconButton
            containerColor={index % 2 === 0 ? "#f5f5f5" : "#819c79"}
            mode={iconButton.mode}
            icon='plus'
            iconColor="#000000"
            size={20}
            onPress={onNavigate}
          />
        </View>
      </View>
      {/* records */}

        <View style={styles.flexContainerTwo}>
           <Text style={styles.overalRecord}>0</Text>
           <Text style={styles.overall}>Overall</Text>
        </View>

      <View style={styles.buttoncontainer}>
        <View>
          <Button
            buttonColor={index % 2 === 0 ? "" : "#819c79"}
            labelStyle={{fontSize: 10, alignSelf: "center", lineHeight: -15}}
            style={styles.button}
            mode={button.mode}
            icon={() => {
              return (
                <Avatar.Icon size={24} icon="eye-circle" style={styles.iconAvator} color="#819c79" />
              )
            }}
            onPress={onNavigateRecord}>
            Records
          </Button>
        </View>

      </View>
    </View>
  );
};

export default FormItem;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginHorizontal: 8,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginVertical: 10,
        rowGap: 6,
        borderRadius: 18,
        height: 150,
    },

    title: {
         width: "70%",
        fontSize: 12,
    },

    button: {
         alignItems: "center",
         width: 100,
         height: 32,
      },

    iconAvator: {
       backgroundColor: "#fff"
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
      fontWeight: "400"
    }

})