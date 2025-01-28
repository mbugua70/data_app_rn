import { View, Text, FlatList, StyleSheet } from "react-native";
import { RadioButton } from 'react-native-paper';
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const RadioComponent = ({ valueEntered, title, data , onUpdateValue}) => {
  const [checked, setChecked] = useState("");
  const [radio, Radio] = useState("");


  function handleRadioButton({ item, index }) {
    return (
      <>
      <RadioButton.Group
        onValueChange={() => onUpdateValue(item.value)}>
        <RadioButton.Item label={item.label} value={valueEntered} />
        </RadioButton.Group>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{title}</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.label}
          renderItem={handleRadioButton}
          contentContainerStyle={styles.flatListContainer}
        />

    </View>
  );
};

export default RadioComponent;

const styles = StyleSheet.create({
   container: {
    margin: 20,
   }
})
