import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import { Colors } from '../../constants/styles';
import FormContainer from "./FormContainer";

function AuthContent({  onAuthenticate, password, name,  isAuthenticate, isUpdating }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    password: false,
  });

  function submitHandler(credentials) {
    let { name, password } = credentials;


    name = name.trim();
    password = password.trim();

    const nameIsValid = name.length > 2;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,12}$/
    const passwordIsValid = passwordRegex.test(password);


    if (!passwordIsValid || !nameIsValid) {
      Alert.alert("Invalid Input", "Please check your credentials.");
      setCredentialsInvalid({
        name: !nameIsValid,
        password: !passwordIsValid
      });

      return;
    }
    onAuthenticate({ name, password });
  }


  return (
    <View style={styles.authContent}>
      <FormContainer
        isAuthenticate={isAuthenticate}
        isUpdating={isUpdating}
        name={name}
        password={password}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({

  authContent: {
    flex: 1,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    // backgroundColor: Colors.primary800,
    // elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },

});
