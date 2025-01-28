import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";

const RadioComponent = ({ value, label, data }) => {
  const [checked, setChecked] = useState("");

  function handleRadioButton({ item, index }) {
    return (
      <>
        <RadioButton.Item label={item.option_text} value={item.option_text} />
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setChecked(newValue)}
        value={checked}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.option_rank}
          renderItem={handleRadioButton}
          contentContainerStyle={styles.flatListContainer}
        />
      </RadioButton.Group>
    </View>
  );
};

export default RadioComponent;
