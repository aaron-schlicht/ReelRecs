import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { MovieContext } from '../../MovieContext';
import { Ionicons } from '@expo/vector-icons';
import { Movie, Quotes, Quote } from '../../constants';
import * as Haptics from 'expo-haptics';
import { getSearchResults } from '../../Api';
import { styles, ImageButton, StyledTextInput, Logo, LogoLarge } from './SearchFunction.styled';

export default function SearchFunction() {
	const { selectedMovie, removeSelectedMovie, updateSelectedMovie } = useContext(MovieContext);
	const [ movies, setMovies ] = useState<Movie[]>([]);
	const [ query, setQuery ] = useState('');
	const [ isFocused, setIsFocused ] = useState(false);
	const [ quoteIndex, setQuoteIndex ] = useState(0);

	useEffect(() => {
		setQuoteIndex(getQuoteIndex());
	}, []);

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

	const onPress = (movie: Movie) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (!!selectedMovie && selectedMovie.id === movie.id) {
			removeSelectedMovie(movie);
		} else {
			updateSelectedMovie(movie);
		}
	};

	const handleCancel = () => {
		setQuery('');
		setMovies([]);
		if (!!selectedMovie) {
			removeSelectedMovie(selectedMovie);
		}
		setIsFocused(false);
	};

	const getQuoteIndex = () => {
		return Math.floor(Math.random() * 100);
	};

	if (isFocused)
		return (
			<View style={styles.container}>
				<Logo />
				<View style={styles.searchBarContent}>
					<View style={styles.inputContainer}>
						<Ionicons name="search" color="#ccc" size={15} />
						<StyledTextInput query={query} handleChange={handleChange} handleSearch={handleSearch} />
						{query.length > 0 ? (
							<TouchableOpacity
								onPress={() => {
									setQuery('');
									if (!!selectedMovie) {
										removeSelectedMovie(selectedMovie);
									}
								}}
							>
								<Ionicons name="close-circle" color="#ccc" size={18} />
							</TouchableOpacity>
						) : null}
					</View>
					<TouchableOpacity style={styles.closeButton} onPress={() => handleCancel()}>
						<Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Cancel</Text>
					</TouchableOpacity>
				</View>
				<ScrollView
					horizontal
					contentContainerStyle={styles.searchResultContainer}
					alwaysBounceVertical={false}
				>
					{movies.length > 0 ? (
						movies.sort((a: Movie, b: Movie) => b.popularity - a.popularity).map((movie, index) => {
							if (!movie.poster_path) return null;
							const isSelected = !!selectedMovie && selectedMovie.id === movie.id;
							return (
								<View key={`result-${index}`}>
									{isSelected ? (
										<Ionicons
											position="absolute"
											style={styles.checkIcon}
											name="checkmark-circle"
											color="#ccc"
											size={25}
										/>
									) : null}
									<ImageButton movie={movie} onPress={onPress} isSelected={isSelected} />
								</View>
							);
						})
					) : null}
				</ScrollView>
			</View>
		);

	return (
		<View style={styles.unfocusedContainer}>
			<LogoLarge />
			<View style={{ marginTop: 50, width: '100%', alignItems: 'center' }}>
				<TouchableOpacity style={styles.searchButton} onPress={() => setIsFocused(true)}>
					<Ionicons name="search" color="#ccc" size={25} />
					<Text style={styles.searchButtonText}>Search for a movie...</Text>
				</TouchableOpacity>
			</View>
			<View style={{ width: '100%', marginTop: 50 }}>
				<Text
					style={{
						color: '#ccc',
						fontSize: 24,
						lineHeight: 24,
						fontWeight: '400',
						textAlign: 'center',
						padding: 15
					}}
				>
					"{Quotes[quoteIndex].quote}"
				</Text>
				<Text
					style={{
						color: '#ccc',
						fontSize: 18,
						fontWeight: '200',
						textAlign: 'center',
						paddingHorizontal: 15
					}}
				>
					{Quotes[quoteIndex].title}, {Quotes[quoteIndex].year}
				</Text>
			</View>
		</View>
	);
}
