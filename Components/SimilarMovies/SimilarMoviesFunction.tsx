import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useContext, useState } from 'react';
import { MovieContext } from '../../MovieContext';
import { useNavigation } from '@react-navigation/core';
import { getMovieRecommendations } from '../../Api';
import * as Haptics from 'expo-haptics';

export default function SimilarMoviesFunction() {
	const { selectedMovie, updateSimilarMovies, onNewSearch } = useContext(MovieContext);
	const [ loading, setLoading ] = useState(false);
	const navigation = useNavigation();

	const getSimilarMovies = async () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (!!selectedMovie) {
			setLoading(true);
			const res = await getMovieRecommendations(selectedMovie.id);
			updateSimilarMovies(res);
		}
		navigation.navigate('Similar Movies');
		setLoading(false);
		onNewSearch();
	};

	return (
		<View style={{ width: '100%', alignItems: 'center' }}>
			{!!selectedMovie ? (
				<TouchableOpacity
					style={{
						borderWidth: 2,
						borderColor: '#ccc',
						backgroundColor: '#ccc',
						padding: 10,
						width: '90%',
						height: 50,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 10,
						marginTop: 20,
						marginBottom: 70
					}}
					onPress={() => getSimilarMovies()}
				>
					{loading ? (
						<ActivityIndicator color="#1f2224" />
					) : (
						<Text
							style={{
								color: '#1f2224',
								textTransform: 'uppercase',
								fontWeight: '500',
								fontSize: 20,
								letterSpacing: 2
							}}
						>
							Recommendations
						</Text>
					)}
				</TouchableOpacity>
			) : null}
		</View>
	);
}
