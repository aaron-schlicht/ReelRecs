import axios from 'axios';
import { Movie, FullMovie, Providers } from './constants';

const API_KEY = 'f03e1c9e7d2633ef0b20ab2c36cddb39';

export const getSearchResults = async (query: string) => {
	try {
		const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
		return response.data.results as Movie[];
	} catch (error) {
		console.log(error);
	}
};

export const getMovieRecommendations = async (movieIds: number[]) => {
	const recommendedMovies: Movie[] = [];

	for (let i = 0; i < movieIds.length; i++) {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movieIds[
					i
				]}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
			);
			const recommended = response.data.results.map((movie: any) => ({
				id: movie.id,
				title: movie.title,
				overview: movie.overview,
				popularity: movie.popularity,
				vote_average: movie.vote_average,
				poster_path: movie.poster_path,
				release_date: movie.release_date
			}));
			recommendedMovies.push(
				...recommended.filter(
					(movie: Movie) => !recommendedMovies.some((recommendedMovie) => recommendedMovie.id === movie.id)
				)
			);
		} catch (error) {
			console.log(error);
		}
	}
	return recommendedMovies;
};

export const showMovieIfInProvider = async (movieId: number, providerIds: number[]) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`
		);
		const data = response.data;
		const watchProviders = [];
		let validProviderIds: number[] = [];
		if (data.results['US'] && data.results['US'].flatrate) {
			providerIds.forEach((id) => {
				const result = data.results['US'].flatrate.filter((provider: any) => provider.provider_id === id);
				if (result.length > 0 && !!result[0].provider_id) {
					watchProviders.push(result);
					validProviderIds.push(result[0].provider_id);
				}
			});
		}
		if (watchProviders.length > 0) {
			return { show: true, ids: validProviderIds };
		}
	} catch (error) {
		console.log(error);
	}
	return { show: false, ids: [] };
};

export const getMovieInfo = async (movieId: number) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
		);
		const data = response.data;
		if (data) {
			return data as FullMovie;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getProviders = async (movieId: number) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`
		);
		const data = response.data;
		const watchProvidersIds = Providers.map((provider) => provider.provider_id);
		let matchingIds: number[] = [];
		if (data.results['US'] && data.results['US'].flatrate) {
			watchProvidersIds.forEach((id) => {
				const result = data.results['US'].flatrate.find((provider: any) => provider.provider_id === id);
				if (result) {
					matchingIds.push(id);
				}
			});
		}
		return matchingIds;
	} catch (error) {
		console.log(error);
	}
};
