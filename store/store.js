import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({
    submittedRecord: [],
    formDateRecord: "",
    token: "",
    authenticate: (token)=>{},
    isAuthenticate: false,
    logout: () =>{},
    locationHandler: (pickedLocation) => {},
    pickedLocations: "",
    indexItem: "",
    isLocation: false,
    indexHandler: (index) => {},
    handleFormDateRecord: (date) => {},
    submitHandlerRecord: (data) => {}
})


export function AuthContextProvider({children}){
    const [submitRecordState, setSubmitRecord] = useState([])
    const [authToken, setAuthToken] = useState()
    const [locationStore, setLocationStore] = useState({})
    const [indexItem, setIndexItem] = useState([])
    const [formDateRecord, setFormDateRecord] = useState("")



    function authenticate(token){
     setAuthToken(token);
     AsyncStorage.setItem("token", token)
    }

    function locationHandler(pickedLocation){
        setLocationStore((prev) => {
            return {
                ...prev,
                pickedLocation
            }
        })
    }

    function indexHandler (index) {
      setIndexItem((prev) => [...prev, index])
    }

    function submitHandler(details) {
        const newSubmission = {
            ...details,
            date: new Date().toISOString().split("T")[0], // Store date for tracking
          };

          setSubmitRecord((prev) => [...prev, newSubmission]);

    }


    function logout(){
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("formNumbers")
        AsyncStorage.removeItem("projectsData")
        AsyncStorage.removeItem("formsData")
        AsyncStorage.removeItem("formInputData")
        AsyncStorage.removeItem("formsSelectData")
        setIndexItem(null)
        setAuthToken(null);
    }

    function handleFormDateRecord (date) {
        setFormDateRecord(date)
    }


    const value = {
        token: authToken,
        isAuthenticate: !!authToken,
        authenticate: authenticate,
        logout: logout,
        isLocation: !!locationStore,
        locationHandler: locationHandler,
        pickedLocations: locationStore,
        indexItem: indexItem,
        indexHandler: indexHandler,
        handleFormDateRecord: handleFormDateRecord,
        formDateRecord: formDateRecord,
        submitHandlerRecord: submitHandler,
        submittedRecord: submitRecordState

    }


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}