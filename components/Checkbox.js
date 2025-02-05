import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Checkbox } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '../Constants/Globalcolors';

const CheckboxComponent = ({ title, data, onUpdateValue, formNumber, isSuccess, isError}) => {
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
        position='leading'
        labelStyle={{fontSize: 14}}
        uncheckedColor={GlobalStyles.colors.gray800}
        label={item.label}
        status={selectedValues[item.label] ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox(item)}
      />
    );
  }

  useEffect(() => {
    if(isSuccess && !isError){
      setSelectedValues({})
    }

  },[isSuccess, isError])

  return (
    <>
      <Text style={styles.radioText}>{formNumber}.{ title}</Text>
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
      color: GlobalStyles.colors.gray800,
      marginBottom: 4,
      marginTop: 8,
      fontSize: 14,
      paddingHorizontal: 8,
  },
});
