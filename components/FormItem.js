import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { Button } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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


  return (
    <View style={[styles.screen, {...styling}]}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttoncontainer}>
        <View>
          <Button
            buttonColor={index % 2 === 0 ? "" : "#819c79"}
            labelStyle={{fontSize: 14}}
            style={styles.button}
            mode={button.mode}
            onPress={onNavigateRecord}>
            Records
          </Button>
        </View>
        <View>
          <IconButton
            containerColor={index % 2 === 0 ? "#f5f5f5" : "#819c79"}
            mode={iconButton.mode}
            icon='plus'
            iconColor="#000000"
            size={32}
            onPress={onNavigate}
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