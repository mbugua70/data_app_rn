import { View, Text, StyleSheet, StatusBar } from "react-native";

import React, { useContext } from "react";

//components
import CardCategoryUI from "../UI/CardCategoryUI";
import Welcome from "../components/Welcome";
import { ProjectContext } from "../store/projectContext";

const Dashboard = ({navigation}) => {
    const {projectsData} = useContext(ProjectContext)
    const images = {
        image1: require('../assets/image/backlog.png'),
        image2: require('../assets/image/mail.png'),
      };

      function handleDashboardNav() {
       navigation.navigate("Home")
      }

      const badgeNumber = projectsData.length;


  return (
    <>
     <StatusBar hidden={true} />
    {/* welcome component */}
      <View style={styles.screen}>
      <Welcome />
      <View style={styles.screenContainer}>
        <CardCategoryUI onNavigate={handleDashboardNav} title='Project' color='#cee8c7' imagename={images.image1} isProject={true} badge={badgeNumber} />
        <CardCategoryUI title='Message' color='#aaede9' imagename={images.image2} badge="0"/>
      </View>
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",

  },
  screenContainer: {
    flexDirection: "row",
  }
});
