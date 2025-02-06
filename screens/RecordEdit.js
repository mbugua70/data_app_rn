import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AuthContentTwo from '../components/AuthContentTwo'

const RecordEdit = ({route}) => {
    const {formID, formTitle} = route.params;

    console.log(formID, "record id")
    console
  return (
    <View style={styles.screen}>
       <AuthContentTwo formID={formID} formTitle={formTitle} />
    </View>
  )
}

export default RecordEdit

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
})