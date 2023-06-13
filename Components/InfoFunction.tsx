import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import MovieScreen from './MovieScreen';
import { FullMovie } from '../constants';
import { getMovieInfo } from '../Api';
import { MovieContext } from '../MovieContext';

export default function InfoFunction() {
	const { selectedMovie } = useContext(MovieContext);
	const [ movieVisible, setMovieVisible ] = useState(false);
	const [ fullMovie, setFullMovie ] = useState<FullMovie | null>(null);

	const onMovieScreenClose = () => {
		setMovieVisible(false);
		setFullMovie(null);
	};

	const onPressInfo = async (id: number) => {
		const m = await getMovieInfo(id);
		if (m) {
			setFullMovie(m);
		}
		setMovieVisible(!movieVisible);
	};

	return (
		<View style={{ width: '100%', alignItems: 'center' }}>
			{!!selectedMovie ? (
				<TouchableOpacity
					style={{
						borderRadius: 10,
						borderWidth: 2,
						borderColor: '#ccc',
						width: '90%',
						padding: 10,
						height: 50,
						justifyContent: 'center'
					}}
					onPress={() => onPressInfo(selectedMovie.id)}
				>
					<Text
						style={{
							color: 'white',
							textAlign: 'center',
							fontSize: 20,
							fontWeight: '500',
							letterSpacing: 2,
							textTransform: 'uppercase'
						}}
					>
						Movie Info
					</Text>
				</TouchableOpacity>
			) : null}

			<MovieScreen visible={movieVisible} onClose={onMovieScreenClose} movie={fullMovie} />
		</View>
	);
}
