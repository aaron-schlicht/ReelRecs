export interface Movie {
	id: number;
	title: string;
	overview?: string;
	poster_path: string;
	popularity: number;
	vote_average: number;
	release_date: string;
	serviceIds?: number[];
}

export interface FullMovie {
	id: number;
	title: string;
	overview?: string;
	poster_path: string;
	popularity: number;
	vote_average: number;
	release_date: string;
	backdrop_path: string;
	revenue: number;
	runtime: number;
	tagline?: string;
	serviceIds?: number[];
}

export interface WatchProvider {
	provider_id: number;
	name: string;
	logo_url: string;
}

export const Providers: WatchProvider[] = [
	{ provider_id: 8, name: 'Netflix', logo_url: require('./assets/netflix.png') },
	{ provider_id: 9, name: 'Prime Video', logo_url: require('./assets/prime_video.png') },
	{ provider_id: 337, name: 'Disney Plus', logo_url: require('./assets/disney_plus.jpeg') },
	{ provider_id: 384, name: 'HBO Max', logo_url: require('./assets/hbo_max.png') },
	{ provider_id: 15, name: 'Hulu', logo_url: require('./assets/hulu.jpeg') },
	{ provider_id: 387, name: 'Peacock', logo_url: require('./assets/peacock.png') }
];
