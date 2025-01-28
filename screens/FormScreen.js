import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FormItem from "../components/FormItem";



import { ProjectContext } from "../store/projectContext";

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

    function handleNavigation() {
      navigation.navigate("Form Container", {
        formID: item.form_id,
      });
    }

    return (
      <>

        <View style={styles.screen}>
          <FormItem
          index = {index}
          title={item.form_title}
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
          data={forms}
          keyExtractor={(item) => item.form_id}
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
