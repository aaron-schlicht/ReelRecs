import { createContext, useState } from 'react';
import { Movie, WatchProvider } from './constants';

interface MovieContextProps {
	selectedMovies: Movie[];
	similarMovies: Movie[];
	selectedServices: WatchProvider[];
	updateSelectedMovies: (movie: Movie) => void;
	updateSimilarMovies: (movie: Movie[]) => void;
	updateSelectedServices: (provider: WatchProvider) => void;
	removeSelectedMovie: (movie: Movie) => void;
	onNewSearch: () => void;
}

export const MovieContext = createContext<MovieContextProps>({
	selectedMovies: [],
	similarMovies: [],
	selectedServices: [],
	updateSelectedMovies: () => {},
	updateSimilarMovies: () => {},
	updateSelectedServices: () => {},
	removeSelectedMovie: () => {},
	onNewSearch: () => {}
});

export interface MovieProviderProps {
	children: any;
}

const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
	const [ selectedMovies, setSelectedMovies ] = useState<Movie[]>([]);
	const [ similarMovies, setSimilarMovies ] = useState<Movie[]>([]);
	const [ selectedServices, setSelectedServices ] = useState<WatchProvider[]>([]);

	const updateSelectedMovies = (movie: Movie) => {
		setSelectedMovies([ ...selectedMovies, movie ]);
	};
	const updateSimilarMovies = (movies: Movie[]) => {
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
		setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
	};

	const onNewSearch = () => {
		setSelectedMovies([]);
		setSelectedServices([]);
	};

	return (
		<MovieContext.Provider
			value={{
				selectedMovies,
				similarMovies,
				updateSelectedMovies,
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
