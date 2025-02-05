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
import { Notifier, NotifierComponents } from "react-native-notifier";

import InputTwo from "./InputTwo";
import FlatButton from "../UI/FlatButton";
import DropdownComponent from "./Dropdown";
import LocationPicker from "./LocationPicker";
import { ProjectContext } from "../store/projectContext";
import RadioComponent from "./RadioComponent";
import Checkbox from "./Checkbox";
import CheckboxComponent from "./Checkbox";

const FormContainerTwo = ({
  formTitle,
  isLogin,
  onSubmit,
  credentialsInvalid,
  isSubmiting,
  resetForm,
  formID,
}) => {
  const [formState, setFormState] = useState({});
  const [location, setLocation] = useState("");
  const { formInputData, formsSelectData } = useContext(ProjectContext);
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState({});

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

  // const {
  //   name: nameIsValid,
  //   phone: phoneIsInvalid,
  //   age: ageIsInvalid,
  //   frequency: frequencyIsInValid,
  //   variant: variantIsInValid,
  //   sku: skuIsInValid,
  //   pricing: pricingIsInValid,
  //   feedback: feedbackIsInvalid,
  //   purchase: purchaseIsInValid,
  // } = credentialsInvalid;

  useEffect(() => {
    formInputData.forEach((input) => {
      if (formID === input.form_id) {
        setInputs(input.inputs);
      }
    });
  }, [formInputData, formID]);

  function handleInputsForms({ item, index }) {
    const isInput = item.field_type === "input";
    const isCheckbox = item.field_type === "checkbox";
    const isDropdown = item.field_type === "dropdown";
    const isRadio = item.field_type === "radio";
    const isRecord = item.field_type === "auto";

    const dataView = item.field_input_options.map((item) => ({
      label: item["0"],
      value: item.option_text,
    }));

    function updateInputValueHandler(field_id, enteredValue) {
      // setFormState((prevState) => ({
      //   ...prevState,
      //   [field_id]: enteredValue, // Update only the specific field
      // }));

      setFormState((prevState) => ({
        ...prevState,
        [field_id]:
          typeof enteredValue === "object"
            ? { ...prevState[field_id], ...enteredValue } // Merge objects properly
            : enteredValue, // Otherwise, just update
      }));
    }

    return (
      <>
        {isRecord && (
          <InputTwo
            formNumber={item.input_rank}
            label={item.input_title}
            onUpdateValue={(value) =>
              updateInputValueHandler(item.field_id, value)
            }
            value={formState[item.field_id]}
            isInvalid={errors[item.field_id]}
            placeholder='Enter date'
            onSubmitEditing={() => inputRef2.current?.focus()}
            blurOnSubmit={false}
            returnKeyType='next'
          />
        )}

        {isInput && (
          <InputTwo
            formNumber={item.input_rank}
            label={item.input_title}
            onUpdateValue={(value) =>
              updateInputValueHandler(item.field_id, value)
            }
            value={formState[item.field_id]}
            isInvalid={errors[item.field_id]}
            placeholder='Enter value'
            onSubmitEditing={() => inputRef2.current?.focus()}
            blurOnSubmit={false}
            returnKeyType='next'
          />
        )}

        {isDropdown && (
          <DropdownComponent
            isInvalid={errors[item.field_id]}
            formNumber={item.input_rank}
            label={item.input_title}
            data={dataView}
            value={formState[item.field_id]}
            onUpdateValue={(value) =>
              updateInputValueHandler(item.field_id, value)
            }
            ref={inputRef7}
          />
        )}

        {isRadio && (
          <RadioComponent
            formNumber={item.input_rank}
            isInvalid={errors[item.field_id]}
            title={item.input_title}
            data={dataView}
            valueEntered={formState[item.field_id]}
            onUpdateValue={(value) =>
              updateInputValueHandler(item.field_id, value)
            }
          />
        )}

        {isCheckbox && (
          <CheckboxComponent
            formNumber={item.input_rank}
            isInvalid={errors[item.field_id]}
            title={item.input_title}
            data={dataView}
            valueEntered={formState[item.field_id]}
            onUpdateValue={(value) =>
              updateInputValueHandler(item.field_id, value)
            }
          />
        )}
      </>
    );
  }

  function takeLocationHandler(pickedlocation) {
    setLocation(pickedlocation);
  }

  function validateForm() {
    let errors = {};
    let isValid = true;

    inputs.forEach((item) => {
      const value = formState[item.field_id];

      if (!value || (Array.isArray(value) && value.length === 0)) {
        errors[item.field_id] = `${item.input_title} is required`;
        isValid = false;
        Notifier.showNotification({
          title: "Invalid inputs",
          description: "Please fill in all the required inputs",
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: "error",
          },
        });
      }
    });

    setErrors(errors); // Store errors to display feedback
    return isValid;
  }

  function submitHandler() {
    if (validateForm()) {
      onSubmit({...formState, form_id: formID});
    }
  }

  useEffect(() => {}, [resetForm]);

  return (
    <>
      <View style={styles.screen}>
        <FlatList
          // scrollEnabled={}
          data={inputs}
          keyExtractor={(item) => item.field_id}
          renderItem={handleInputsForms}
          contentContainerStyle={styles.flatListContainer}
          ListHeaderComponent={() => (
            <Text style={styles.formTitle}>{formTitle}</Text>
          )}
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
    </>
  );
};

export default FormContainerTwo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
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
