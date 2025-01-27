import { View, Text, StatusBar, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import { ProjectContext } from "../store/projectContext";

import CategoryItem from "../components/CategoryItem";


const Home = ({ navigation }) => {
  const {projectsData} = useContext(ProjectContext)

  function handleCategoryItem({item}) {

    function handleNavigation() {
      navigation.navigate("Form Container", {
        formID: item.project_id
      });
    }

    return (
      <>
        <StatusBar hidden={true} />

        <View style={styles.screen}>
          <CategoryItem
            title={item.project_title}
            color="#fff"
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
      <FlatList
      key={"numColumns_1"}
      data={projectsData}
      keyExtractor={(item) => item.project_id}
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
