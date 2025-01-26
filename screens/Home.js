import { View, Text, StatusBar, StyleSheet, FlatList } from "react-native";
import React from "react";
import { CATEGORIES } from "../data/dummy-data";

import CategoryItem from "../components/CategoryItem";
import OfflineComp from "../components/OfflineComp";
import Welcome from "../components/Welcome";

const Home = ({ navigation }) => {
  function handleCategoryItem(itemData) {
    function handleNavigation() {
      navigation.navigate("Form Container", {
        formID: itemData.item.id
      });
    }

    return (
      <>
        <StatusBar hidden={true} />

        <View style={styles.screen}>
          {/* <CategoryItem color="#49393a" title="REPORT" onNavigate={handleNavigation}/> */}
          {/* <CategoryItem color="#49393a" title="RECORD" onNavigate={handleNavigationRecord}/> */}
          <CategoryItem
            title={itemData.item.title}
            color={itemData.item.color}
            onNavigate={handleNavigation}
          />
        </View>
      </>
    );
  }

  function handleNavigationRecord() {
    navigation.navigate("Record");
  }

  return (
     <View style={styles.screenContainer}>
      <Welcome/>
      <FlatList
      key={"numColumns_1"}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={handleCategoryItem}
      numColumns={2}
    />
  </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#000000"
  },
  screen: {
   flex: 1,
  },
});
