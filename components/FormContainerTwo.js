import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef, useContext } from "react";
import { RadioButton } from 'react-native-paper';

import InputTwo from "./InputTwo";
import FlatButton from "../UI/FlatButton";
import DropdownComponent from "./Dropdown";
import LocationPicker from "./LocationPicker";
import { ProjectContext } from "../store/projectContext";
import RadioComponent from "./RadioComponent";

const data = {
  ageData: [
    { label: "18-24 years", value: "18-24" },
    { label: "25-34 years", value: "25-34" },
    { label: "35-44 years", value: "35-44" },
    { label: "45-54 years", value: "45-54" },
    { label: "55-64 years", value: "55-64" },
    { label: "65+ years", value: "65+" },
  ],
  sodaData: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ],
  frequency: [
    { label: "Weekly", value: "Weekly" },
    { label: "Daily", value: "Daily" },
    { label: "Yearly", value: "Yearly" },
  ],
  sku: [
    { label: "300ml", value: "300ml" },
    { label: "500ml", value: "500ml" },
    { label: "1L", value: "1L" },
  ],
};

const FormContainerTwo = ({
  isLogin,
  onSubmit,
  credentialsInvalid,
  isSubmiting,
  resetForm,
  formID,
}) => {
  const [checked, setChecked] = React.useState('first');
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPurchase, setEnteredPurchase] = useState("");
  const [enteredVariant, setEnteredVariant] = useState("");
  const [enteredPricing, setEnteredPricing] = useState("");
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredFrequency, setEnteredFrequency] = useState("");
  const [enteredSku, setEnteredSku] = useState("");
  const [location, setLocation] = useState("");
  const { formInputData, formsSelectData} = useContext(ProjectContext);
  const [inputs, setInputs] = useState("");
  const [mySelectValue, setMySelectValue] = useState({})

  // userRefs for input fields to be used in the form
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);
  const inputRef9 = useRef(null);
  const inputRef10 = useRef(null);
  const inputRef11 = useRef(null);
  const inputRef12 = useRef(null);

  const {
    name: nameIsValid,
    phone: phoneIsInvalid,
    age: ageIsInvalid,
    frequency: frequencyIsInValid,
    variant: variantIsInValid,
    sku: skuIsInValid,
    pricing: pricingIsInValid,
    feedback: feedbackIsInvalid,
    purchase: purchaseIsInValid,
  } = credentialsInvalid;

  useEffect(() => {
    formInputData.forEach((input) => {
      if (formID === input.form_id) {
        setInputs(input.inputs);
      }
    });
  }, [formInputData]);


  useEffect(() => {
    formInputData.forEach((input) => {
      if (formID === input.form_id) {
       const dataValue =  formsSelectData.map((selects) => ({
          label: selects['0'],
          value: selects.option_text
        }))
        setMySelectValue(dataValue)
      }

    });

  },[formsSelectData])


  function handleInputsForms({ item, index }) {
    const isInput = item.field_type === "input";
    const isCheckbox = item.field_type === "checkbox";
    const isDropdown = item.field_type === "dropdown";
    const isRadio = item.field_type === "radio"


    function updateInputValueHandler(inputType, enteredValue) {
      switch (inputType) {
        case "name":
          setEnteredName(enteredValue);
          break;
        case "phone":
          setEnteredPhone(enteredValue);
          break;
        case "purchase":
          setEnteredPurchase(enteredValue);
          break;
        case "variant":
          setEnteredVariant(enteredValue);
          break;
        case "pricing":
          setEnteredPricing(enteredValue);
          break;
        case "feedback":
          setEnteredFeedback(enteredValue);
          break;
        case "age":
          setEnteredAge(enteredValue);
          break;
        case "frequency":
          setEnteredFrequency(enteredValue);
          break;
        case "sku":
          setEnteredSku(enteredValue);
          break;
      }
    }

    return (
      <>
      {isInput &&  <InputTwo
          label={item.input_title}
          onUpdateValue={updateInputValueHandler.bind(this, item.input_title)}
          value={enteredName}
          isInvalid={nameIsValid}
          placeholder='Enter value'
          onSubmitEditing={() => inputRef2.current?.focus()}
          blurOnSubmit={false}
          returnKeyType='next'
        />}

        {isDropdown &&   <DropdownComponent
            isInvalid ={frequencyIsInValid}
            label={item.input_title}
            data={mySelectValue}
            value={enteredFrequency}
            onUpdateValue={updateInputValueHandler.bind(this, item.input_title)}
            ref={inputRef7}
          />}

          {isRadio && <RadioComponent isInvalid label={item.input_title} data={mySelectValue} value={checked}  onUpdateValue={updateInputValueHandler.bind(this, item.input_title)}  />}

      </>
    );
  }

  function takeLocationHandler(pickedlocation) {
    console.log("Picked location is", pickedlocation);
    setLocation(pickedlocation);
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      phone: enteredPhone,
      age: enteredAge,
      frequency: enteredFrequency,
      purchase: enteredPurchase,
      variant: enteredVariant,
      sku: enteredSku,
      pricing: enteredPricing,
      feedback: enteredFeedback,
      lat: location.lat,
      long: location.long,
    });
  }

  useEffect(() => {
    setEnteredAge("");
    setEnteredFeedback(""), setEnteredFrequency(""), setEnteredName("");
    setEnteredPhone("");
    setEnteredPricing("");
    setEnteredPurchase("");
    setEnteredSku("");
    setEnteredVariant("");
  }, [resetForm]);

  return (
    <>
      <View style={styles.screen}>
        <FlatList
          // scrollEnabled={}
          data={inputs}
          keyExtractor={(item) => item.field_id}
          renderItem={handleInputsForms}
          contentContainerStyle={styles.flatListContainer}
          ListFooterComponent={() => (
            <View style={styles.submitContainer}>
              {isSubmiting ? (
                <ActivityIndicator
                  animating={true}
                  color={MD2Colors.lightBlueA700}
                  size='small'
                />
              ) : (
                <FlatButton isSubmiting={isSubmiting} onPress={submitHandler}>
                  SUBMIT
                </FlatButton>
              )}
            </View>
          )}
        />
      </View>

      {/* location component */}
      {/* <LocationPicker
            onLocationHandler={takeLocationHandler}
            resetForm={resetForm}
          /> */}

      {/* button content */}
      {/* <View style={styles.submitContainer}>
            {isSubmiting ? (
              <ActivityIndicator
                animating={true}
                color={MD2Colors.lightBlueA700}
                size='small'
              />
            ) : (
              <FlatButton isSubmiting={isSubmiting} onPress={submitHandler}>
                SUBMIT
              </FlatButton>
            )}
          </View> */}
    </>
  );
};

export default FormContainerTwo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingBottom: 0,
    paddingTop: 20,
    flexGrow: 1,
  },

  submitContainer: {
    marginTop: 20,
    marginBottom: 0,
  },

  flatListContainer: {
    paddingTop: 20,
  },
});
