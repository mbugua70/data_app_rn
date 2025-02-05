import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RecordContainer from '../components/RecordContainer'
import { GlobalStyles } from '../Constants/Globalcolors'

const Records = ({route}) => {

  const {formID, formTitle} = route.params


  return (
    <View style={styles.screen}>
       {/* header title */}
       <Text style={styles.headerTitle}>Records</Text>
       {/* dashboard  showing the records*/}
       <RecordContainer formID={formID} formTitle={formTitle} />
    </View>
  )
}

export default Records

const styles = StyleSheet.create({
  screen: {
    backgroundColor: GlobalStyles.colors.gray200,
    flex: 1,
  },
  headerTitle: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight:'600'
  }
})