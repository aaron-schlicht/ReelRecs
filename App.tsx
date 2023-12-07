import React from "react";
import Home from "./Components/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SimilarMoviesScreen from "./Components/SimilarMovies";
//import mobileAds from "react-native-google-mobile-ads";
const Stack = createStackNavigator();
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  //mobileAds().initialize();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
