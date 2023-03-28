import React from 'react';
import MovieProvider from './MovieContext';
import Home from './Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SimilarMoviesScreen from './SimilarMoviesScreen';
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<MovieProvider>
				<Stack.Navigator>
					<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
					<Stack.Screen
						options={{ headerShown: false }}
						name="Similar Movies"
						component={SimilarMoviesScreen}
					/>
				</Stack.Navigator>
			</MovieProvider>
		</NavigationContainer>
	);
}
