import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native'


const TabBarIcon = ({color, size, name}) => {
  return (

     <Ionicons name={name} size={size} color={color} />

  )
}

export default TabBarIcon;
