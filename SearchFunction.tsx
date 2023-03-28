import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Modal } from 'react-native';
import { MovieContext } from './MovieContext';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from './constants';
import SearchModal from './SearchModal';
import * as Haptics from 'expo-haptics';

export default function SearchFunction() {
	const [ isVisible, setIsVisible ] = useState(false);

	const { selectedMovies, removeSelectedMovie } = useContext(MovieContext);

	const handleRemove = (movie: Movie) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		removeSelectedMovie(movie);
	};

	const handlePress = () => {
		setIsVisible(!isVisible);
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 10
			}}
		>
			{selectedMovies.length > 0 ? (
				selectedMovies.map((movie, index) => {
					const path = 'https://image.tmdb.org/t/p/original/' + movie.poster_path;
					return (
						<TouchableOpacity onPress={() => handleRemove(movie)} key={`movie-${index}`}>
							<View style={{ margin: 10, alignItems: 'center' }}>
								<Ionicons
									position="absolute"
									style={{
										right: -10,
										top: -13,
										zIndex: 99
									}}
									name="close-circle"
									color="#ccc"
									size={20}
								/>
								<Image
									style={{
										width: 90,
										height: 135,
										borderRadius: 5,
										borderWidth: 2,
										borderColor: '#ccc'
									}}
									source={{ uri: path }}
								/>
							</View>
						</TouchableOpacity>
					);
				})
			) : null}

			<View style={{ alignItems: 'center' }}>
				{selectedMovies.length < 3 ? (
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							borderColor: '#ccc',
							borderWidth: 2,
							backgroundColor: '#6e7275',
							width: 90,
							height: 135,
							borderRadius: 5,
							marginHorizontal: 10,
							marginVertical: 20
						}}
						onPress={() => handlePress()}
					>
						<Ionicons name="ios-add" color="#ccc" size={35} />
					</TouchableOpacity>
				) : null}
				<SearchModal isVisible={isVisible} onClose={handlePress} />
			</View>
		</View>
	);
}
