import { createContext, useState } from 'react';
import { Movie, WatchProvider, FullMovie } from './constants';

interface MovieContextProps {
	selectedMovie: Movie | null;
	similarMovies: FullMovie[];
	selectedServices: WatchProvider[];
	updateSelectedMovie: (movie: Movie) => void;
	updateSimilarMovies: (movie: FullMovie[]) => void;
	updateSelectedServices: (provider: WatchProvider) => void;
	removeSelectedMovie: (movie: Movie) => void;
	onNewSearch: () => void;
}

export const MovieContext = createContext<MovieContextProps>({
	selectedMovie: null,
	similarMovies: [],
	selectedServices: [],
	updateSelectedMovie: () => {},
	updateSimilarMovies: () => {},
	updateSelectedServices: () => {},
	removeSelectedMovie: () => {},
	onNewSearch: () => {}
});

export interface MovieProviderProps {
	children: any;
}

const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
	const [ selectedMovie, setSelectedMovie ] = useState<Movie | null>(null);
	const [ similarMovies, setSimilarMovies ] = useState<FullMovie[]>([]);
	const [ selectedServices, setSelectedServices ] = useState<WatchProvider[]>([]);

	const updateSelectedMovie = (movie: Movie) => {
		setSelectedMovie(movie);
	};
	const updateSimilarMovies = (movies: FullMovie[]) => {
		setSimilarMovies(movies);
	};

	const updateSelectedServices = (provider: WatchProvider) => {
		if (!selectedServices.includes(provider)) {
			setSelectedServices([ ...selectedServices, provider ]);
		}
		if (selectedServices.includes(provider)) {
			const services = selectedServices.filter((p) => p.provider_id !== provider.provider_id);
			setSelectedServices(services);
		}
	};

	const removeSelectedMovie = (movie: Movie) => {
		setSelectedMovie(null);
	};

	const onNewSearch = () => {
		setSelectedMovie(null);
		setSelectedServices([]);
	};

	return (
		<MovieContext.Provider
			value={{
				selectedMovie,
				similarMovies,
				updateSelectedMovie,
				updateSimilarMovies,
				selectedServices,
				updateSelectedServices,
				removeSelectedMovie,
				onNewSearch
			}}
		>
			{children}
		</MovieContext.Provider>
	);
};

export default MovieProvider;
