import {
	Modal,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Image,
	Text,
	StyleSheet,
	Keyboard,
	SafeAreaView,
	StatusBar,
	TouchableHighlight
} from 'react-native';
import { useState, useContext } from 'react';
import { MovieContext } from './MovieContext';
import { Ionicons } from '@expo/vector-icons';
import { Movie, FullMovie } from './constants';
import { getSearchResults, getMovieInfo, getProviders } from './Api';
import MovieScreen from './MovieScreen';
import * as Haptics from 'expo-haptics';

const SearchModal: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
	const [ movies, setMovies ] = useState<Movie[]>([]);
	const { updateSelectedMovies } = useContext(MovieContext);
	const [ movieVisible, setMovieVisible ] = useState(false);
	const [ selectedMovie, setSelectedMovie ] = useState<Movie | null>(null);
	const [ fullMovie, setFullMovie ] = useState<FullMovie | null>(null);
	const [ query, setQuery ] = useState('');

	const handleSearch = async () => {
		Keyboard.dismiss();
		if (query.length > 0) {
			const parsedQuery = () => query.replace(' ', '+');
			const results = await getSearchResults(parsedQuery());
			if (results) {
				setMovies(results);
			}
		}
	};

	const handleChange = async (text: string) => {
		setQuery(text);
		if (text.length > 2) {
			const parsedQuery = () => query.replace(' ', '+');
			const results = await getSearchResults(parsedQuery());
			if (results) {
				setMovies(results);
			}
		}
	};

	const onSelectMovie = (movie: Movie) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		updateSelectedMovies(movie);
		onClose();
		setSelectedMovie(null);
		setMovies([]);
		setQuery('');
	};

	const onMovieScreenClose = () => {
		setMovieVisible(false);
		setFullMovie(null);
	};

	const onPressInfo = async (id: number) => {
		const m = await getMovieInfo(id);

		if (m) {
			const matchingProviders = await getProviders(m.id);
			if (matchingProviders) {
				setFullMovie({ serviceIds: matchingProviders, ...m });
			} else {
				setFullMovie(m);
			}
		}
		setMovieVisible(!movieVisible);
	};

	const onPress = (movie: Movie) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (!!selectedMovie && selectedMovie.id === movie.id) {
			setSelectedMovie(null);
		} else {
			setSelectedMovie(movie);
		}
	};

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					marginVertical: 15,
					justifyContent: 'center',
					gap: 10
				}}
			>
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						borderRadius: 5,
						borderWidth: 1,
						borderColor: '#ccc',
						height: 40,
						width: 270,
						padding: 8
					}}
				>
					<Ionicons name="search" color="#ccc" size={15} />
					<TextInput
						keyboardAppearance="dark"
						autoFocus
						autoCapitalize="sentences"
						autoCorrect={false}
						placeholderTextColor="white"
						style={styles.input}
						onChangeText={(text) => handleChange(text)}
						value={query}
						returnKeyType="search"
						onSubmitEditing={() => handleSearch()}
						placeholder="Search movies..."
					/>
					{query.length > 0 ? (
						<TouchableOpacity onPress={() => setQuery('')}>
							<Ionicons name="close-circle" color="#ccc" size={18} />
						</TouchableOpacity>
					) : null}
				</View>
				<TouchableOpacity
					style={{
						height: 40,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					onPress={() => onClose()}
				>
					<Text style={{ color: 'white' }}>Cancel</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					alignItems: 'center',
					backgroundColor: '#1f2224',
					height: '100%'
				}}
			>
				{movies.length > 0 ? (
					<ScrollView
						contentContainerStyle={{
							alignItems: 'center',
							marginTop: 10,
							marginHorizontal: 0,
							width: '100%'
							//justifyContent: 'center',
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								paddingHorizontal: 15,
								justifyContent: 'center', //maybe center
								marginBottom: 150
							}}
						>
							{movies.map((movie, index) => {
								if (!movie.poster_path) return null;
								const isSelected = !!selectedMovie && selectedMovie.id === movie.id;
								return (
									<View key={`result-${index}`}>
										{isSelected ? (
											<Ionicons
												position="absolute"
												style={{
													right: -2,
													top: -11,
													zIndex: 99
												}}
												name="checkmark-circle"
												color="#ccc"
												size={25}
											/>
										) : null}
										<ImageButton movie={movie} onPress={onPress} isSelected={isSelected} />
									</View>
								);
							})}
						</View>
					</ScrollView>
				) : (
					<Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 30 }} />
				)}
			</View>
			{!!selectedMovie ? (
				<View
					style={{
						flexDirection: 'row',
						display: 'flex',
						flex: 1,
						position: 'absolute',
						bottom: 120,
						width: '100%',
						justifyContent: 'center',
						zIndex: 99,
						gap: 20
					}}
				>
					<TouchableHighlight
						underlayColor="#6e7275"
						style={{
							backgroundColor: '#ccc',
							padding: 10,
							borderRadius: 5,
							width: 120,
							alignItems: 'center',
							shadowOffset: { width: 0, height: 6 },
							shadowColor: 'black',
							shadowRadius: 10,
							shadowOpacity: 0.6,
							height: 50,
							justifyContent: 'center'
						}}
						onPress={() => onSelectMovie(selectedMovie)}
					>
						<Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, color: '#1f2224' }}>
							Done
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor="#6e7275"
						style={{
							backgroundColor: '#ccc',
							padding: 10,
							borderRadius: 5,
							width: 120,
							alignItems: 'center',
							shadowOffset: { width: 0, height: 6 },
							shadowColor: 'black',
							shadowRadius: 10,
							shadowOpacity: 0.6,
							justifyContent: 'center'
						}}
						onPress={() => onPressInfo(selectedMovie.id)}
					>
						<Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, color: '#1f2224' }}>
							Info
						</Text>
					</TouchableHighlight>
				</View>
			) : null}
			<MovieScreen visible={movieVisible} onClose={onMovieScreenClose} movie={fullMovie} />
		</View>
	);
};

export default SearchModal;

const ImageButton: React.FC<{ movie: Movie; onPress: (movie: Movie) => void; isSelected: boolean }> = ({
	movie,
	onPress,
	isSelected
}) => {
	const [ error, setError ] = useState(false);
	const path = 'https://image.tmdb.org/t/p/original/' + movie.poster_path;
	return (
		<View
			style={{
				width: 100,
				margin: 5,
				height: 150,
				alignItems: 'center'
			}}
		>
			<TouchableOpacity
				style={{
					alignItems: 'center',
					borderRadius: 5,
					borderWidth: 2,
					borderColor: isSelected ? '#ccc' : '#6e7275',
					justifyContent: 'center',
					backgroundColor: '#6e7275'
				}}
				onPress={() => onPress(movie)}
			>
				{error ? (
					<Ionicons name="film" color="white" size={40} />
				) : (
					<Image
						style={{ width: 80, height: 120, borderRadius: 5 }}
						source={{ uri: path }}
						onError={() => setError(true)}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	movie: {
		marginBottom: 10
	},
	title: {
		fontSize: 12,
		fontWeight: 'bold',
		width: 90,
		flexWrap: 'wrap'
	},
	input: {
		paddingLeft: 5,
		width: 220,
		color: 'white'
	}
});
