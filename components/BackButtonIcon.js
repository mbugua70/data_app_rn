import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../Constants/Globalcolors";
import { useNavigation } from "@react-navigation/native";


const BackButtonIcon = ({ tintColor }) => {
  const navigation = useNavigation();
  function handleBackButton() {
    navigation.goBack();
  }
  return (
    <View style={styles.screen}>
      <Pressable onPress={handleBackButton} android_ripple={{color: "black"}} style={({pressed}) => [styles.buttonContainer, pressed && (Platform.OS === "ios" && styles.pressed )]} hitSlop={20} >
        <Ionicons name="close" size={24} color="#000000" />
      </Pressable>
    </View>
  );
};

export default BackButtonIcon;

const styles = StyleSheet.create({
  screen: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: GlobalStyles.colors.gray200,
  },

  buttonContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.25
  }

});
