import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import FormItem from "../components/FormItem";


import { CATEGORIES } from "../data/dummy-data";

const FormScreen = ({ navigation, route }) => {
  const { formID } = route.params;
  console.log(formID);

  function handleFormItem({item, index}) {

   console.log(item)

    function handleNavigation() {
      navigation.navigate("Form Container", {
        formID: itemData.item.id,
      });
    }

    return (
      <>

        <View style={styles.screen}>
          <FormItem
           index = {index}
          // title={itemData.item.title}
          // color={item.color}
          // onNavigate={handleNavigation}
          />
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.screenContainer}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={handleFormItem}
          contentContainerStyle= {styles.flatListContainer}
        />
      </View>
    </>
  );
};

export default FormScreen;


const styles = StyleSheet.create({
  screenContainer: {
     flex: 1,
  },
  screen: {

  },
  flatListContainer: {
    paddingVertical: 20,
  },

})
