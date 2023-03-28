import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useContext, useState } from 'react';
import { MovieContext } from './MovieContext';
import { Movie } from './constants';
import { useNavigation } from '@react-navigation/core';
import { getMovieRecommendations, showMovieIfInProvider } from './Api';
import * as Haptics from 'expo-haptics';

export default function SimilarMoviesFunction() {
	const { selectedMovies, updateSimilarMovies, selectedServices, onNewSearch } = useContext(MovieContext);
	const [ loading, setLoading ] = useState(false);
	const navigation = useNavigation();

	const getSimilarMovies = async () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (selectedMovies.length > 0) {
			setLoading(true);
			const movieIds = selectedMovies.map((movie) => movie.id);
			const providerIds = selectedServices.map((service) => service.provider_id);
			const res = await getMovieRecommendations(movieIds);
			const recommendedMovies = res.filter((movie) => !movieIds.includes(movie.id));
			if (providerIds.length > 0) {
				let similarMovies: Movie[] = [];
				for (let i = 0; i < recommendedMovies.length; i++) {
					const { show, ids } = await showMovieIfInProvider(recommendedMovies[i].id, providerIds);
					if (show) {
						similarMovies.push({ serviceIds: ids, ...recommendedMovies[i] });
					}
				}
				updateSimilarMovies(similarMovies);
			} else {
				updateSimilarMovies(recommendedMovies);
			}

			navigation.navigate('Similar Movies');
			setLoading(false);
			onNewSearch();
		}
	};

	return (
		<View>
			<TouchableOpacity
				style={{
					borderWidth: 2,
					borderColor: '#ccc',
					backgroundColor: '#6e7275',
					width: 280,
					height: 60,
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 5,
					marginTop: 20,
					marginBottom: 30
				}}
				onPress={() => getSimilarMovies()}
			>
				{loading ? (
					<ActivityIndicator color="#ccc" />
				) : (
					<Text style={{ color: '#ccc', textTransform: 'uppercase', fontWeight: '500', letterSpacing: 2 }}>
						Find Recommended Movies
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}
