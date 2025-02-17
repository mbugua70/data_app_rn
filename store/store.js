import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({
    token: "",
    authenticate: (token)=>{},
    isAuthenticate: false,
    logout: () =>{},
    locationHandler: (pickedLocation) => {},
    pickedLocations: "",
    isLocation: false
})


export function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState()
    const [locationStore, setLocationStore] = useState()



    function authenticate(token){
     setAuthToken(token);
     AsyncStorage.setItem("token", token)
    }

    function locationHandler(pickedLocation){
        setLocationStore(pickedLocation)
    }


    function logout(){
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("formNumbers")
        AsyncStorage.removeItem("projectsData")
        AsyncStorage.removeItem("formsData")
        AsyncStorage.removeItem("formInputData")
        AsyncStorage.removeItem("formsSelectData")
        setAuthToken(null);
    }


    const value = {
        token: authToken,
        isAuthenticate: !!authToken,
        authenticate: authenticate,
        logout: logout,
        isLocation: !!locationStore,
        locationHandler: locationHandler,
        pickedLocations: locationStore


    }


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}