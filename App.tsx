import React from "react";
import Home from "./Components/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SimilarMoviesScreen from "./Components/SimilarMovies";
//import mobileAds from "react-native-google-mobile-ads";

export type RootStackParamList = {
  Home: undefined;
  Recs: { recs: Movie[] };
  Movie: { id: number };
};
const Stack = createStackNavigator<RootStackParamList>();
import { Provider } from "react-redux";
import store from "./redux/store";
import RecsScreen from "./Components/MainFlow/RecsScreen";
import { Movie } from "./constants";
import MovieScreen from "./Components/MainFlow/MovieScreen";

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
          <Stack.Screen
            options={{ headerShown: false }}
            name="Recs"
            initialParams={{ recs: [] }}
            component={RecsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Movie"
            initialParams={{ id: 0 }}
            component={MovieScreen}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
