import {
	View,
	TouchableOpacity,
	Text,
	ScrollView,
	ImageSourcePropType,
	Image,
	SafeAreaView,
	StatusBar
} from 'react-native';
import { useContext, useState, useRef } from 'react';
import { MovieContext } from './MovieContext';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import SortModal from './SortModal';
import { Providers, Movie, FullMovie } from './constants';
import MovieScreen from './MovieScreen';
import { getMovieInfo, getProviders } from './Api';

export default function SimilarMoviesScreen() {
	const { similarMovies } = useContext(MovieContext);
	const [ activeSort, setActiveSort ] = useState('');
	const [ movie, setMovie ] = useState<FullMovie | null>(null);
	const [ visible, setVisible ] = useState(false);
	const [ movieVisible, setMovieVisible ] = useState(false);

	function compareFn(a: Movie, b: Movie) {
		switch (activeSort) {
			case 'POP_DESC':
				return b.popularity - a.popularity;
			case 'POP_ASC':
				return a.popularity - b.popularity;
			case 'RATE_DESC':
				return b.vote_average - a.vote_average;
			case 'RATE_ASC':
				return a.vote_average - b.vote_average;
			case 'RELEASE_DESC':
				return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
			case 'RELEASE_ASC':
				return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
			default:
				return b.popularity - a.popularity;
		}
	}

	const handlePress = async (id: number) => {
		const m = await getMovieInfo(id);

		if (m) {
			const matchingProviders = await getProviders(m.id);
			if (matchingProviders) {
				setMovie({ serviceIds: matchingProviders, ...m });
			} else {
				setMovie(m);
			}
		}
		setMovieVisible(!movieVisible);
	};

	const onClose = () => {
		setMovieVisible(false);
		setMovie(null);
	};

	const navigation = useNavigation();
	return (
		<View style={{ backgroundColor: 'black' }}>
			<StatusBar barStyle="light-content" />
			<SafeAreaView>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-start',
						height: 40,
						backgroundColor: 'black',
						paddingHorizontal: 20,
						justifyContent: 'space-between'
					}}
				>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Ionicons name="caret-back" color="white" size={20} />
							<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, paddingLeft: 1 }}>
								New Search
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setVisible(true)}>
						<Ionicons name="swap-horizontal" color="white" size={30} />
					</TouchableOpacity>
				</View>
				<ScrollView
					style={{
						marginTop: 0,
						paddingHorizontal: 15,
						backgroundColor: '#1f2224',
						paddingTop: 10,
						height: '100%'
					}}
				>
					{similarMovies.sort((a, b) => compareFn(a, b)).slice(0, 40).map((movie, index) => {
						const path = 'https://image.tmdb.org/t/p/original/' + movie.poster_path;
						return (
							<TouchableOpacity key={`similar-movie-${index}`} onPress={() => handlePress(movie.id)}>
								<View
									style={{
										marginVertical: 5,
										flexDirection: 'row',
										width: '100%',
										paddingBottom: 10,
										borderBottomWidth: 2,
										borderBottomColor: '#ccc'
									}}
								>
									<Image
										style={{
											width: 80,
											height: 120,
											borderRadius: 5,
											borderWidth: 2,
											borderColor: '#ccc'
										}}
										source={{ uri: path }}
									/>
									<View style={{ width: 250, marginLeft: 10, height: 110, justifyContent: 'center' }}>
										<Text
											style={{
												color: 'white',
												fontWeight: 'bold',
												fontSize: 20
											}}
											numberOfLines={2}
										>
											{movie.title}
										</Text>
										<View style={{ flexDirection: 'row', paddingTop: 10 }}>
											{movie.serviceIds && movie.serviceIds.length > 0 ? (
												movie.serviceIds.map((id) => {
													const provider = Providers.find(
														(service) => service.provider_id == id
													);
													if (provider) {
														return (
															<Image
																key={`provider-${id}`}
																source={provider.logo_url as ImageSourcePropType}
																style={{
																	width: 55,
																	height: 55,
																	borderRadius: 5,
																	marginRight: 10
																}}
															/>
														);
													}
												})
											) : (
												<View>
													<Text style={{ color: 'white', fontWeight: 'bold' }}>
														{new Date(movie.release_date).getFullYear()}
													</Text>
												</View>
											)}
										</View>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}
					<View style={{ height: 100 }} />
				</ScrollView>
				<MovieScreen visible={movieVisible} onClose={onClose} movie={movie} />
				<SortModal visible={visible} setVisible={setVisible} setActiveSort={setActiveSort} />
			</SafeAreaView>
		</View>
	);
}
