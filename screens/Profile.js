// What we will have in this component:
// 1. A profile picture
// 2. A title of the screen
// 3. A logout button
// 4. A button to edit the profile
// 5. A User name

import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../Constants/Globalcolors";

import { AuthContext } from "../store/store";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ProfilePic from "../components/ProfilePic";
import UserName from "../components/UserName";
import ProfileIconUI from "../UI/ProfileIcon";
import ProfileUIDetails from "../UI/ProfileUIDetails";


const Profile = () => {
  const authctx = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // fetching user name from storage
  useEffect(() => {
    async function handleToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setUserData(JSON.parse(token));
      }
    }

    handleToken();
  }, [isFocused]);

  function editHandler() {
    navigation.navigate("Edit Profile", {
      name: name,
      phone: phone,
      region: region,
    });
  }

  function signoutHandler() {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      {
        text: "Confirm",
        onPress: () => {
          authctx.logout();
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.screenChild}>
        <ProfilePic />
        <UserName name={userData.name} />
      </View>
      {/* edit profile */}
      <View style={styles.screen2}>
        {/* support */}
        <Text style={styles.supporttitle}>Support</Text>
        {/* email support */}
        <ProfileUIDetails
          title='Email us at'
          details='johnmbugua23code@gmail.com'
          iconName='mail'
          color='#819c79'
        />
        {/* call support */}
        <ProfileUIDetails
          title='Call Us'
          details='+254728781720'
          iconName='call'
          color='#819c79'
        />

        {/* signout */}
        <ProfileIconUI
          isSignOut={true}
          name='log-out'
          size={24}
          color='#819c79'
          onPress={signoutHandler}
          text='Sign Out'
          bg={GlobalStyles.colors.gray200}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  screenChild: {
    alignItems: "center",
    paddingVertical: 25,
  },
  screen2: {
    padding: 10,
    height: "100%",
    borderTopWidth: 1,
    borderColor: GlobalStyles.colors.gray300,
  },
  supporttitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray200,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});
