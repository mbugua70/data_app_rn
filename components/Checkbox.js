import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Checkbox } from 'react-native-paper';
import React, { useState } from 'react';

const CheckboxComponent = ({ title, data, onUpdateValue }) => {
  const [selectedValues, setSelectedValues] = useState({}); // Store checked state per item

  function toggleCheckbox(item) {
    const newValues = {
      ...selectedValues,
      [item.label]: !selectedValues[item.label], // Toggle checked status
    };
    setSelectedValues(newValues);
    onUpdateValue(newValues); // Pass selected values to parent
  }

  function renderCheckbox({ item }) {
    return (
      <Checkbox.Item
        label={item.label}
        status={selectedValues[item.label] ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox(item)}
      />
    );
  }

  return (
    <>
      <Text style={styles.radioText}>{title}</Text>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.label}
          renderItem={renderCheckbox}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </>
  );
};

export default CheckboxComponent;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  radioText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
