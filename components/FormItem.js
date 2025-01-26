import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { Button } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";

const FormItem = ({index}) => {

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



  return (
    <View style={[styles.screen, {...styling}]}>
      <View>
        <Text style={styles.title}>Form One</Text>
      </View>
      <View style={styles.buttoncontainer}>
        <View>
          <Button
            buttonColor={index % 2 === 0 ? "" : "#9cacff"}
            labelStyle={{fontSize: 14}}
            style={styles.button}
            mode={button.mode}
            onPress={() => console.log("Pressed")}>
            Records
          </Button>
        </View>
        <View>
          <IconButton
            // containerColor={index % 2 === 0 ? "" : "#9cacff"}
            mode={iconButton.mode}
            icon='square-edit-outline'
            iconColor="#000000"
            size={32}
            onPress={() => console.log("Pressed")}
          />
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
        paddingVertical: 14,
        marginVertical: 10,
        rowGap: 6,
        borderRadius: 18,
    },

    title: {
        fontSize: 18,
    },

    buttoncontainer: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    button: {
        padding: -4,
      },

    icontAvator: {
        color: "#9cacff"
    }

})