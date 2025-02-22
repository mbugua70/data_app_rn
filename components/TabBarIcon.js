import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants/Globalcolors";

const TabBarIcon = ({ color, size, name, focused }) => {
  return (
    <View
      style={{
        width: 46,
        flex: 1,
        backgroundColor: focused ? "#cee8c7" : "",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}>
      <Ionicons name={name} size={size} color={focused ? GlobalStyles.colors.gray800 : color}/>
    </View>
  );
};

export default TabBarIcon;
