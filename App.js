import { QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { GlobalStyles } from "./Constants/Globalcolors";
import { AuthContextProvider } from "./store/store";
import { AuthContext } from "./store/store";

// screens and components import
import Login from "./screens/Login";
import CocaColaTitle from "./UI/CokeHead";
import Home from "./screens/Home";
import Report from "./screens/Report";
import IconButton from "./UI/Icon";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import BackButtonIcon from "./components/BackButtonIcon";
import TabBarIcon from "./components/TabBarIcon";
import FormScreen from "./screens/FormScreen";
import Records from "./screens/Records";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


function AuthStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "left",
        }}>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}


function AuthReportStack (){
    return (
      <>
       <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}>
         <Stack.Screen
            name="Home Main"
            component={AuthenticatedStack}
            options={{
              contentStyle: {
                backgroundColor: "#000000"
              },
              headerTitle: "Home",
              headerShown: false,
            }}
          />

        <Stack.Screen
            name="Form Container"
            component={FormScreen}
            options={{
              headerTintColor: "#fff",
              headerStyle: {
               backgroundColor: "#000000"
              },
              contentStyle: {
                backgroundColor: "#000000"
              }
            }}
          />
        <Stack.Screen
            name="Report"
            component={Report}
            options={{
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#000000"
              }
            }}
          />

        <Stack.Screen
            name="Records"
            component={Records}
          />
      </Stack.Navigator>
      </>
    )
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        animation: 'shift'
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#000000"
          },
          headerStyle: {
            backgroundColor: "#000000"
          },
          tabBarIcon: ({ color, size }) => {
            return <TabBarIcon name="home" color={color} size={size} />;
          }
        }}
      />

      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarStyle: {
            backgroundColor: "#000000"
          },
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000000"
          },
          tabBarIcon: ({ color, size }) => {
            return <TabBarIcon name="person" color={color} size={size} />;
          }
        }}
      />


    </Tab.Navigator>
  );
}

function Navigation() {
  const authctx = useContext(AuthContext);
  console.log("screen", authctx.isAuthenticate);
  return (
    <NavigationContainer>
      {authctx.isAuthenticate ? <AuthReportStack/> : <AuthStack />}

    </NavigationContainer>
  );
}

function TokenHolder() {
  const authctx = useContext(AuthContext);
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    async function fetchingToken() {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token) {
        authctx.authenticate(token);
      }
      setIsAppReady(true);
    }

    fetchingToken();
  }, []);



  if (isAppReady) {
    SplashScreen.hide();
  }


  if(!isAppReady){
    return null
  }


  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <AuthContextProvider>
        <TokenHolder />
      </AuthContextProvider>
      <Toast/>
    </>
  );
}
