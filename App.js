import { QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalStyles } from "./Constants/Globalcolors";
import { AuthContextProvider } from "./store/store";
import { AuthContext } from "./store/store";
import { queryClient } from "./http/api";

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
import Dashboard from "./screens/Dashboard";
import ProjectContextProvider from "./store/projectContext";
import RecordEdit from "./screens/RecordEdit";

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

function AuthReportStack() {



  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}>
        <Stack.Screen
          name='Home Main'
          component={AuthenticatedStack}
          options={{
            contentStyle: {
              backgroundColor: "#000000",
            },
            headerTitle: "Dashboard",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='Form Container'
          component={FormScreen}
          options={{
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#000000",
            },
            contentStyle: {
              backgroundColor: "#000000",
            },
          }}
        />

        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerTitle: "Projects",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#000000",
            },
          }}
        />

        <Stack.Screen
          name='Report'
          component={Report}
          options={{
            contentStyle: {
              backgroundColor: "#f2f2f2",
            },
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#000000",
            },
          }}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.gray200,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              color: GlobalStyles.colors.gray200,
            },
          }}
          name='Records'
          component={Records}
        />

        <Stack.Screen
          name='Record Edit'
          component={RecordEdit}
          options={{
            contentStyle: { backgroundColor: "#fff" , zIndex: -2},
            presentation: "modal",
            headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
            headerBackButtonDisplayMode: "minimal",
            headerShadowVisible: false,
            headerLeft: ({ headerTintColor }) => {
              return <BackButtonIcon tintColor={headerTintColor} />;
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        animation: "shift",
      }}>
      <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          headerTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#000000",
          },
          headerStyle: {
            backgroundColor: "#000000",
          },
          tabBarIcon: ({ color, size }) => {
            return <TabBarIcon name='home' color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000000",
          },
          tabBarIcon: ({ color, size }) => {
            return <TabBarIcon name='person' color={color} size={size} />;
          },
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
      {authctx.isAuthenticate ? <AuthReportStack /> : <AuthStack />}
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

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView>
        <NotifierWrapper>
          <Navigation />
        </NotifierWrapper>
      </GestureHandlerRootView>
    </>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <AuthContextProvider>
        <ProjectContextProvider>
          <QueryClientProvider client={queryClient}>
            <TokenHolder />
          </QueryClientProvider>
        </ProjectContextProvider>
      </AuthContextProvider>

      <Toast />
    </>
  );
}
