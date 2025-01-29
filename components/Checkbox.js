import { View, Text, StyleSheet } from 'react-native'
import { Checkbox } from 'react-native-paper';
import React, {useState} from 'react'

const CheckboxComponent = ({title, data, onUpdateValue}) => {

    const [selectedValue, setSelectedValue] = useState("");

    function handleCheckboxButton({ item, index }) {
      return (
        <>
          <Checkbox.Group
            onValueChange={(newValue) => {
              setSelectedValue(newValue);
              onUpdateValue(newValue);
            }}>
            <Checkbox.Item
              label={item.label}
              value={item.value}
            //   status={selectedValue === item.value ? "checked" : "unchecked"}
            />
          </Checkbox.Group>
        </>
      );
    }
    return (
      <>
        <Text style={styles.radioText}>{title}</Text>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.label}
            renderItem={handleCheckboxButton}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </>
    );
}

export default CheckboxComponent

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  radioText: {
    marginTop: 10,
  }
});