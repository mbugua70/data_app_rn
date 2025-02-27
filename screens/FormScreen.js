import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FormItem from "../components/FormItem";

import { ProjectContext } from "../store/projectContext";
import { getIndex } from "../util/getIndex";
import { AuthContext } from "../store/store";



const FormScreen = ({ navigation, route }) => {
  const {formsData} = useContext(ProjectContext)
  const { projectID } = route.params;
  const [forms, setForms] = useState("");



  useEffect(() => {
    formsData.forEach((project) => {
      if(projectID === project.project_id){
        setForms(project.forms)
      }
    })
  }, [formsData])


  function handleFormItem({item, index}) {

    const rowIndex = Math.floor(index / 2);
    const isEvenRow = rowIndex % 2 === 0;
    function handleNavigation() {
      navigation.navigate("Report", {
        formID: item.form_id,
        formTitle: item.form_title,
      });
    }

    function handleRecordNavigation(){
      navigation.navigate("Records", {
        formID: item.form_id,
        formTitle: item.form_title,
      });
     }

    return (
      <>

        <View style={styles.screen}>
          <FormItem
          isEvenRow={isEvenRow}
          index = {index}
          title={item.form_title}
          onNavigateRecord={handleRecordNavigation}
          onNavigate={handleNavigation}
          />
        </View>
      </>
    );
  }


  return (
    <>
      <View style={styles.screenContainer}>
        <FlatList
          key={"numColumns_1"}
          data={forms}
          keyExtractor={(item) => item.form_id}
          renderItem={handleFormItem}
          contentContainerStyle= {styles.flatListContainer}
          numColumns={2}
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
    width: "50%"
  },
  flatListContainer: {
    paddingVertical: 20,
  },

})
